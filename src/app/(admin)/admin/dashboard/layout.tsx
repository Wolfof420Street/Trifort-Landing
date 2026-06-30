import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import SidebarClient from './SidebarClient'; // We will create a small Client Component to handle current path active states

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
      fontFamily: 'var(--font-sans, system-ui, sans-serif)',
      color: 'var(--charcoal, #2a3a30)'
    }}>
      <SidebarClient user={user} />

      {/* Main Content Area */}
      <main style={{ 
        flex: 1, 
        padding: '32px 48px', 
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {children}
      </main>
    </div>
  );
}
