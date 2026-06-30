import { db } from '@/db';
import { quotes } from '@/db/schema';
import { desc } from 'drizzle-orm';
import StatusButton from '@/components/admin/StatusButton';
import { toggleQuoteStatus } from '@/lib/actions/admin';
import EmptyState from '@/components/admin/EmptyState';
import { FileText } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminQuotesPage() {
  const allQuotes = await db.query.quotes.findMany({
    orderBy: [desc(quotes.createdAt)],
  });

  return (
    <div>
      <h1 style={{ marginBottom: '20px', color: 'var(--charcoal)' }}>Quotes</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #eee' }}>
            <th style={{ padding: '10px' }}>Date</th>
            <th style={{ padding: '10px' }}>Name / Contact</th>
            <th style={{ padding: '10px' }}>Project Type</th>
            <th style={{ padding: '10px' }}>Details</th>
            <th style={{ padding: '10px' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {allQuotes.map((q) => (
            <tr key={q.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '10px', fontSize: '0.9rem' }}>
                {new Date(q.createdAt!).toLocaleDateString()}
              </td>
              <td style={{ padding: '10px' }}>
                <div>{q.name}</div>
                <div style={{ fontSize: '0.8rem', color: '#666' }}>{q.email}</div>
                <div style={{ fontSize: '0.8rem', color: '#666' }}>{q.phone}</div>
              </td>
              <td style={{ padding: '10px' }}>{q.projectType}</td>
              <td style={{ padding: '10px', maxWidth: '300px' }}>{q.details}</td>
              <td style={{ padding: '10px' }}>
                <StatusButton 
                  id={q.id} 
                  currentStatus={q.status} 
                  nextStatus={q.status === 'new' ? 'reviewed' : (q.status === 'reviewed' ? 'contacted' : 'new')} 
                  action={toggleQuoteStatus} 
                />
              </td>
            </tr>
          ))}
          {allQuotes.length === 0 && (
            <tr>
              <td colSpan={5} style={{ padding: 0 }}>
                <EmptyState icon={FileText} title="No quotes yet" message="When clients request a quote, their details will appear here." />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
