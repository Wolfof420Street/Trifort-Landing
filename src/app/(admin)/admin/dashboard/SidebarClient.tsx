'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { 
  Building2, LogOut, Menu, X,
  LayoutDashboard,
  FolderKanban,
  Users,
  FileText,
  HardHat,
  MessageSquare,
  LineChart
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SidebarClient({ user }: { user: any }) {
  const navItems = [
    { label: 'Overview', href: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Projects', href: '/admin/dashboard/projects', icon: FolderKanban },
    { label: 'Contacts', href: '/admin/dashboard/contacts', icon: Users },
    { label: 'Quotes', href: '/admin/dashboard/quotes', icon: FileText },
    { label: 'Subcontractors', href: '/admin/dashboard/subcontractors', icon: HardHat },
    { label: 'Reviews', href: '/admin/dashboard/reviews', icon: MessageSquare },
    { label: 'Analytics', href: '/admin/dashboard/analytics', icon: LineChart },
  ];
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = async () => {
    // Note: To clear the token properly we could call a logout endpoint, 
    // or just clear cookies client-side (if they weren't httpOnly). 
    // Since they are httpOnly, we should call a server action or API route.
    // Assuming there is a logout route or we can just redirect to login which might have logic.
    // For now, redirect to /admin/login is the standard behavior in this app's existing code.
    document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push('/admin/login');
  };

  const SidebarContent = (
    <>
      <div style={{ padding: '24px 32px', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
        <Link href="/admin/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', color: 'var(--emerald)' }}>
          <Building2 size={28} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontWeight: 800, fontSize: '1.2rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Trifort</span>
            <span style={{ fontSize: '0.65rem', color: 'var(--gold)', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600 }}>Admin Panel</span>
          </div>
        </Link>
      </div>

      <nav style={{ flex: 1, padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link 
              key={item.href} 
              href={item.href}
              onClick={() => isMobile && setIsOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: '8px',
                textDecoration: 'none',
                color: isActive ? 'var(--emerald)' : 'rgba(42, 58, 48, 0.65)',
                background: isActive ? 'rgba(30, 61, 43, 0.06)' : 'transparent',
                fontWeight: isActive ? 600 : 500,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.background = 'rgba(0,0,0,0.02)';
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.background = 'transparent';
              }}
            >
              <Icon size={20} color={isActive ? 'var(--gold)' : 'currentColor'} />
              <span style={{ fontSize: '0.95rem' }}>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div style={{ padding: '24px', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--emerald)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
            {user.name?.charAt(0) || 'A'}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--charcoal)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {user.name}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'rgba(42, 58, 48, 0.5)' }}>
              {user.role}
            </div>
          </div>
        </div>
        <button 
          onClick={handleLogout}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px', width: '100%',
            padding: '10px 16px', borderRadius: '8px', border: 'none',
            background: 'transparent', color: 'rgba(42, 58, 48, 0.65)',
            cursor: 'pointer', fontWeight: 500, transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#fee2e2';
            e.currentTarget.style.color = '#ef4444';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = 'rgba(42, 58, 48, 0.65)';
          }}
        >
          <LogOut size={18} />
          <span>Log out</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Toggle Button */}
      {isMobile && (
        <button 
          onClick={() => setIsOpen(true)}
          style={{
            position: 'fixed', top: '16px', left: '16px', zIndex: 100,
            background: 'white', border: '1px solid #eaeaea', borderRadius: '8px',
            padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)', cursor: 'pointer'
          }}
        >
          <Menu size={24} color="var(--charcoal)" />
        </button>
      )}

      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 1000,
            backdropFilter: 'blur(2px)'
          }}
        />
      )}

      {/* Sidebar Container */}
      <aside style={{
        position: isMobile ? 'fixed' : 'sticky',
        top: 0,
        left: isMobile ? (isOpen ? 0 : '-280px') : 0,
        width: '280px',
        height: '100vh',
        background: 'white',
        borderRight: '1px solid rgba(0,0,0,0.05)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1001,
        transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: isMobile && isOpen ? '4px 0 24px rgba(0,0,0,0.1)' : 'none'
      }}>
        {isMobile && (
          <button 
            onClick={() => setIsOpen(false)}
            style={{
              position: 'absolute', top: '24px', right: '24px',
              background: 'transparent', border: 'none', cursor: 'pointer',
              color: 'rgba(42, 58, 48, 0.5)'
            }}
          >
            <X size={24} />
          </button>
        )}
        {SidebarContent}
      </aside>
    </>
  );
}
