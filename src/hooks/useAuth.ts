import { useState, useEffect, useCallback } from 'react';

// SHA-256 hash of the password
// Default: "admin123" - CHANGE THIS to your own password hash!
// To generate a hash, run in browser console: 
// crypto.subtle.digest('SHA-256', new TextEncoder().encode('your-password')).then(h => console.log(Array.from(new Uint8Array(h)).map(b => b.toString(16).padStart(2, '0')).join('')))
const PASSWORD_HASH = '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9';

const AUTH_KEY = 'dashboard_authenticated';

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if already authenticated in this session
    const authenticated = sessionStorage.getItem(AUTH_KEY) === 'true';
    setIsAuthenticated(authenticated);
    setIsLoading(false);
  }, []);

  const login = useCallback(async (password: string): Promise<boolean> => {
    const hash = await hashPassword(password);
    
    if (hash === PASSWORD_HASH) {
      sessionStorage.setItem(AUTH_KEY, 'true');
      setIsAuthenticated(true);
      return true;
    }
    
    return false;
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
  }, []);

  return {
    isAuthenticated,
    isLoading,
    login,
    logout,
  };
}