'use client';

import { usePathname } from 'next/navigation';

export default function TopBar() {
  const pathname = usePathname();
  
  const getPageTitle = () => {
    if (pathname === '/admin/dashboard') return 'Overview';
    const segments = pathname.split('/');
    const last = segments[segments.length - 1];
    if (!last) return 'Dashboard';
    return last.charAt(0).toUpperCase() + last.slice(1);
  };

  return (
    <header style={{
      height: '80px',
      background: 'transparent',
      display: 'flex',
      alignItems: 'center',
      padding: '0 48px',
      justifyContent: 'space-between',
      flexShrink: 0
    }}>
      <h1 style={{ 
        fontFamily: "'Cormorant Garamond', serif", 
        fontSize: '2rem', 
        fontWeight: 600,
        color: 'var(--charcoal, #2a3a30)',
        margin: 0
      }}>
        {getPageTitle()}
      </h1>
    </header>
  );
}
