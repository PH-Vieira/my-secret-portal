import { useState, useEffect, useCallback } from 'react';
import { projects, type Project } from '@/config/dashboard';

export type ServiceStatus = 'online' | 'offline' | 'checking';

interface ServiceStatusMap {
  [projectId: string]: ServiceStatus;
}

const CHECK_INTERVAL = 60000; // 60 seconds
const TIMEOUT = 5000; // 5 second timeout

export function useServiceStatus() {
  const [statuses, setStatuses] = useState<ServiceStatusMap>(() => {
    // Initialize all as checking
    const initial: ServiceStatusMap = {};
    projects.forEach((p) => {
      initial[p.id] = 'checking';
    });
    return initial;
  });

  const checkService = useCallback(async (project: Project): Promise<ServiceStatus> => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);

      // Using no-cors mode - we can't read the response, but if the fetch
      // completes without error, the server is responding
      await fetch(project.url, {
        method: 'HEAD',
        mode: 'no-cors',
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      return 'online';
    } catch {
      return 'offline';
    }
  }, []);

  const checkAllServices = useCallback(async () => {
    // Set all to checking first
    setStatuses((prev) => {
      const checking: ServiceStatusMap = {};
      Object.keys(prev).forEach((id) => {
        checking[id] = 'checking';
      });
      return checking;
    });

    // Check all services in parallel
    const results = await Promise.all(
      projects.map(async (project) => ({
        id: project.id,
        status: await checkService(project),
      }))
    );

    // Update statuses
    const newStatuses: ServiceStatusMap = {};
    results.forEach(({ id, status }) => {
      newStatuses[id] = status;
    });
    setStatuses(newStatuses);
  }, [checkService]);

  useEffect(() => {
    // Initial check
    checkAllServices();

    // Set up interval
    const interval = setInterval(checkAllServices, CHECK_INTERVAL);

    return () => clearInterval(interval);
  }, [checkAllServices]);

  return { statuses, refresh: checkAllServices };
}
