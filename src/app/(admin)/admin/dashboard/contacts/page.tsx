import { db } from '@/db';
import { contacts } from '@/db/schema';
import { desc } from 'drizzle-orm';
import StatusButton from '@/components/admin/StatusButton';
import { toggleContactStatus } from '@/lib/actions/admin';
import EmptyState from '@/components/admin/EmptyState';
import { Users } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminContactsPage() {
  const allContacts = await db.query.contacts.findMany({
    orderBy: [desc(contacts.createdAt)],
  });

  return (
    <div>
      <h1 style={{ marginBottom: '20px', color: 'var(--charcoal)' }}>Contacts</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #eee' }}>
            <th style={{ padding: '10px' }}>Date</th>
            <th style={{ padding: '10px' }}>Name / Email</th>
            <th style={{ padding: '10px' }}>Subject</th>
            <th style={{ padding: '10px' }}>Message</th>
            <th style={{ padding: '10px' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {allContacts.map((c) => (
            <tr key={c.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '10px', fontSize: '0.9rem' }}>
                {new Date(c.createdAt!).toLocaleDateString()}
              </td>
              <td style={{ padding: '10px' }}>
                <div>{c.name}</div>
                <div style={{ fontSize: '0.8rem', color: '#666' }}>{c.email}</div>
                <div style={{ fontSize: '0.8rem', color: '#666' }}>{c.phone}</div>
              </td>
              <td style={{ padding: '10px' }}>{c.subject}</td>
              <td style={{ padding: '10px', maxWidth: '300px' }}>{c.message}</td>
              <td style={{ padding: '10px' }}>
                <StatusButton 
                  id={c.id} 
                  currentStatus={c.status} 
                  nextStatus={c.status === 'new' ? 'replied' : 'new'} 
                  action={toggleContactStatus} 
                />
              </td>
            </tr>
          ))}
          {allContacts.length === 0 && (
            <tr>
              <td colSpan={5} style={{ padding: 0 }}>
                <EmptyState icon={Users} title="No contacts yet" message="When potential clients fill out the contact form, they will appear here." />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
