import { db } from '@/db';
import { subcontractors } from '@/db/schema';
import { desc } from 'drizzle-orm';
import StatusButton from '@/components/admin/StatusButton';
import { toggleSubcontractorStatus } from '@/lib/actions/admin';
import EmptyState from '@/components/admin/EmptyState';
import { HardHat } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminSubcontractorsPage() {
  const allSubs = await db.query.subcontractors.findMany({
    orderBy: [desc(subcontractors.createdAt)],
  });

  return (
    <div>
      <h1 style={{ marginBottom: '20px', color: 'var(--charcoal)' }}>Subcontractors</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #eee' }}>
            <th style={{ padding: '10px' }}>Date</th>
            <th style={{ padding: '10px' }}>Company / Contact</th>
            <th style={{ padding: '10px' }}>Trade / Area</th>
            <th style={{ padding: '10px' }}>Experience</th>
            <th style={{ padding: '10px' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {allSubs.map((s) => (
            <tr key={s.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '10px', fontSize: '0.9rem' }}>
                {new Date(s.createdAt!).toLocaleDateString()}
              </td>
              <td style={{ padding: '10px' }}>
                <div style={{ fontWeight: 'bold' }}>{s.company}</div>
                <div>{s.contact}</div>
                <div style={{ fontSize: '0.8rem', color: '#666' }}>{s.email}</div>
                <div style={{ fontSize: '0.8rem', color: '#666' }}>{s.phone}</div>
              </td>
              <td style={{ padding: '10px' }}>
                <div>{s.trade}</div>
                <div style={{ fontSize: '0.8rem', color: '#666' }}>{s.serviceArea}</div>
              </td>
              <td style={{ padding: '10px', maxWidth: '200px' }}>{s.experience}</td>
              <td style={{ padding: '10px' }}>
                <StatusButton 
                  id={s.id} 
                  currentStatus={s.status} 
                  nextStatus={s.status === 'pending' ? 'approved' : 'pending'} 
                  action={toggleSubcontractorStatus} 
                />
              </td>
            </tr>
          ))}
          {allSubs.length === 0 && (
            <tr>
              <td colSpan={5} style={{ padding: 0 }}>
                <EmptyState icon={HardHat} title="No applications yet" message="Subcontractor applications will appear here when submitted." />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
