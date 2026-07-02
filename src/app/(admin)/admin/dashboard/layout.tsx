import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import SidebarClient from './SidebarClient';
import TopBar from './TopBar';

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user || user.role !== 'admin') {
    redirect('/admin/login');
  }

  return (
    <div style={{ 
      display: 'flex', 
      minHeight: '100vh', 
      background: 'var(--cream, #fcfaf7)',
      fontFamily: "'Montserrat', sans-serif",
      color: 'var(--charcoal, #2a3a30)'
    }}>
      <SidebarClient user={user} />

      {/* Main Content Wrapper */}
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        minWidth: 0 
      }}>
        <TopBar />
        
        <main style={{ 
          flex: 1, 
          padding: '0 48px 48px 48px', 
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {children}
        </main>
      </div>
    </div>
  );
}
