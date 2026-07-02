'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import type { TokenPayload } from '@/lib/auth';
import { 
  LogOut, Menu, X,
  LayoutDashboard,
  FolderKanban,
  Users,
  FileText,
  HardHat,
  MessageSquare,
  LineChart
} from 'lucide-react';

export default function SidebarClient({ user }: { user: TokenPayload & { email?: string } }) {
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
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (e) {
      console.error(e);
    }
    
    // Fallback: Clear locally as well just to be safe
    document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push('/admin/login');
  };

  const SidebarContent = (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ padding: '32px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <Image src="/logo.png" alt="Trifort Logo" width={48} height={48} style={{ objectFit: 'contain' }} />
        <span style={{ 
          fontFamily: "'Montserrat', sans-serif", 
          fontWeight: 600, 
          fontSize: '0.85rem', 
          letterSpacing: '1px', 
          color: 'white',
          textAlign: 'center'
        }}>
          TRIFORT BUILDERS
        </span>
      </div>

      <nav style={{ flex: 1, padding: '0 16px', display: 'flex', flexDirection: 'column', gap: '4px', overflowY: 'auto' }}>
        {navItems.map((item) => {
          const isActive = item.href === '/admin/dashboard' 
            ? pathname === item.href 
            : pathname.startsWith(item.href);
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
                padding: '10px 16px',
                borderRadius: '6px',
                textDecoration: 'none',
                color: isActive ? 'white' : 'rgba(255, 255, 255, 0.7)',
                background: isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                fontWeight: isActive ? 600 : 500,
                transition: 'all 0.2s ease',
                position: 'relative',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              {isActive && (
                <div style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', width: '3px', height: '20px', background: 'var(--gold)', borderRadius: '0 4px 4px 0' }} />
              )}
              <Icon size={18} color={isActive ? 'var(--gold)' : 'currentColor'} />
              <span style={{ fontSize: '0.875rem' }}>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div style={{ padding: '24px 16px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', padding: '0 8px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--gold)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.875rem' }}>
            {user.name?.charAt(0) || 'U'}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'white', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {user.name || 'Admin User'}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.5)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {user.email}
            </div>
          </div>
        </div>
        <button 
          onClick={handleLogout}
          style={{
            display: 'flex', alignItems: 'center', gap: '12px', width: '100%',
            padding: '10px 16px', borderRadius: '6px', border: 'none',
            background: 'transparent', color: 'rgba(255, 255, 255, 0.7)',
            cursor: 'pointer', fontWeight: 500, transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 0, 0, 0.1)';
            e.currentTarget.style.color = '#ff6b6b';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
          }}
        >
          <LogOut size={18} />
          <span style={{ fontSize: '0.875rem' }}>Log out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Toggle Button */}
      {isMobile && (
        <button 
          onClick={() => setIsOpen(true)}
          style={{
            position: 'fixed', top: '16px', left: '16px', zIndex: 40,
            background: 'white', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '8px',
            padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)', cursor: 'pointer'
          }}
        >
          <Menu size={20} color="var(--emerald)" />
        </button>
      )}

      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 50,
            backdropFilter: 'blur(2px)'
          }}
        />
      )}

      {/* Sidebar Container */}
      <aside style={{
        position: isMobile ? 'fixed' : 'sticky',
        top: 0,
        left: isMobile ? (isOpen ? 0 : '-240px') : 0,
        width: '240px',
        height: '100vh',
        background: 'var(--emerald)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 51,
        transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: isMobile && isOpen ? '4px 0 24px rgba(0,0,0,0.15)' : 'none'
      }}>
        {isMobile && (
          <button 
            onClick={() => setIsOpen(false)}
            style={{
              position: 'absolute', top: '16px', right: '-48px',
              background: 'white', border: 'none', cursor: 'pointer',
              color: 'var(--emerald)', width: '36px', height: '36px', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
          >
            <X size={20} />
          </button>
        )}
        {SidebarContent}
      </aside>
    </>
  );
}
