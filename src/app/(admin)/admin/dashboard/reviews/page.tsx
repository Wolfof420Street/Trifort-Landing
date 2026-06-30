import { db } from '@/db';
import { reviews } from '@/db/schema';
import { desc } from 'drizzle-orm';
import StatusButton from '@/components/admin/StatusButton';
import { toggleReviewStatus } from '@/lib/actions/admin';
import EmptyState from '@/components/admin/EmptyState';
import { MessageSquare } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminReviewsPage() {
  const allReviews = await db.query.reviews.findMany({
    orderBy: [desc(reviews.createdAt)],
  });

  return (
    <div>
      <h1 style={{ marginBottom: '20px', color: 'var(--charcoal)' }}>Reviews</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #eee' }}>
            <th style={{ padding: '10px' }}>Date</th>
            <th style={{ padding: '10px' }}>Reviewer</th>
            <th style={{ padding: '10px' }}>Rating / Project</th>
            <th style={{ padding: '10px' }}>Review</th>
            <th style={{ padding: '10px' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {allReviews.map((r) => (
            <tr key={r.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '10px', fontSize: '0.9rem' }}>
                {new Date(r.createdAt!).toLocaleDateString()}
              </td>
              <td style={{ padding: '10px' }}>
                <div>{r.name}</div>
                <div style={{ fontSize: '0.8rem', color: '#666' }}>{r.email}</div>
              </td>
              <td style={{ padding: '10px' }}>
                <div style={{ color: 'var(--gold)' }}>{'★'.repeat(r.rating) + '☆'.repeat(5 - r.rating)}</div>
                <div style={{ fontSize: '0.8rem', color: '#666' }}>{r.projectType}</div>
              </td>
              <td style={{ padding: '10px', maxWidth: '300px' }}>
                <strong>{r.title}</strong>
                <p style={{ margin: '5px 0 0 0', fontSize: '0.9rem' }}>{r.message}</p>
              </td>
              <td style={{ padding: '10px' }}>
                <StatusButton 
                  id={r.id} 
                  currentStatus={r.status} 
                  nextStatus={r.status === 'pending' ? 'published' : 'pending'} 
                  action={toggleReviewStatus} 
                />
              </td>
            </tr>
          ))}
          {allReviews.length === 0 && (
            <tr>
              <td colSpan={5} style={{ padding: 0 }}>
                <EmptyState icon={MessageSquare} title="No reviews yet" message="Customer reviews will appear here for moderation." />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
