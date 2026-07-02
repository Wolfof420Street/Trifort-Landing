import { db } from '@/db';
import { quotes } from '@/db/schema';
import { count, desc } from 'drizzle-orm';
import StatusButton from '@/components/admin/StatusButton';
import { toggleQuoteStatus } from '@/lib/actions/admin';
import EmptyState from '@/components/admin/EmptyState';
import { FileText } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminQuotesPage(props: { searchParams: Promise<{ page?: string }> }) {
  const searchParams = await props.searchParams;
  const page = parseInt(searchParams?.page || '1') || 1;
  const pageSize = 20;
  const offset = (page - 1) * pageSize;

  // Database-level count and pagination
  const [countResult] = await db.select({ value: count() }).from(quotes);
  const totalCount = countResult.value;
  const totalPages = Math.ceil(totalCount / pageSize);

  const paginatedQuotes = await db.query.quotes.findMany({
    orderBy: [desc(quotes.createdAt)],
    limit: pageSize,
    offset: offset,
  });

  return (
    <div>
      <style dangerouslySetInnerHTML={{__html: `
        .admin-table-row { transition: background 0.2s ease; cursor: default; }
        .admin-table-row:hover { background: rgba(30,61,43,0.02); }
        .admin-page-btn { transition: background 0.2s ease; }
        .admin-page-btn:hover { background: rgba(0,0,0,0.03); }
      `}} />

      {/* Page Header Area */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
        <div>
          <div style={{ 
            fontSize: '0.6rem', 
            letterSpacing: '3px', 
            textTransform: 'uppercase', 
            color: 'var(--gold, #c8701a)',
            fontWeight: 600,
            marginBottom: '8px'
          }}>
            Enquiries
          </div>
          <h1 style={{ 
            margin: 0, 
            color: 'var(--charcoal, #2a3a30)',
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '2.5rem',
            fontWeight: 600,
            lineHeight: 1
          }}>
            Quotes
          </h1>
        </div>
      </div>

      {/* Table Container */}
      <div style={{
        background: '#ffffff',
        borderRadius: '8px',
        border: '1px solid rgba(0,0,0,0.06)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        overflow: 'hidden'
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
            <thead>
              <tr style={{ 
                background: '#f8f9fa',
                borderBottom: '1px solid rgba(0,0,0,0.06)'
              }}>
                <th style={{ padding: '16px 24px', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'rgba(0,0,0,0.45)', fontWeight: 600 }}>Date</th>
                <th style={{ padding: '16px 24px', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'rgba(0,0,0,0.45)', fontWeight: 600 }}>Name / Contact</th>
                <th style={{ padding: '16px 24px', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'rgba(0,0,0,0.45)', fontWeight: 600 }}>Project Type</th>
                <th style={{ padding: '16px 24px', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'rgba(0,0,0,0.45)', fontWeight: 600 }}>Details</th>
                <th style={{ padding: '16px 24px', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'rgba(0,0,0,0.45)', fontWeight: 600, textAlign: 'right' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {paginatedQuotes.map((q, index) => {
                const isLast = index === paginatedQuotes.length - 1;
                
                return (
                  <tr key={q.id} className="admin-table-row" style={{ 
                    borderBottom: isLast ? 'none' : '1px solid rgba(0,0,0,0.04)'
                  }}>
                    <td style={{ padding: '16px 24px', height: '56px', fontSize: '0.875rem', color: '#475569', whiteSpace: 'nowrap' }}>
                      {new Date(q.createdAt!).toLocaleDateString()}
                    </td>
                    <td style={{ padding: '16px 24px' }}>
                      <div style={{ fontWeight: 600, color: 'var(--charcoal, #2a3a30)', fontSize: '0.9rem' }}>{q.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'rgba(0,0,0,0.5)' }}>{q.email}</div>
                      {q.phone && <div style={{ fontSize: '0.75rem', color: 'rgba(0,0,0,0.5)', marginTop: '2px' }}>{q.phone}</div>}
                    </td>
                    <td style={{ padding: '16px 24px', fontSize: '0.875rem', color: '#475569' }}>
                      {q.projectType}
                    </td>
                    <td style={{ 
                      padding: '16px 24px', 
                      fontSize: '0.875rem', 
                      color: '#475569',
                      maxWidth: '280px', 
                      overflow: 'hidden', 
                      textOverflow: 'ellipsis', 
                      whiteSpace: 'nowrap'
                    }} title={q.details || ''}>
                      {q.details}
                    </td>
                    <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                      <StatusButton 
                        id={q.id} 
                        currentStatus={q.status} 
                        nextStatus={q.status === 'new' ? 'reviewed' : (q.status === 'reviewed' ? 'contacted' : 'new')} 
                        action={toggleQuoteStatus} 
                      />
                    </td>
                  </tr>
                );
              })}
              
              {paginatedQuotes.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ padding: '48px 0', borderBottom: 'none' }}>
                    <EmptyState icon={FileText} title="No quotes yet" message="When clients request a quote, their details will appear here." />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Footer */}
        {totalCount > 0 && (
          <div style={{ 
            padding: '16px 24px', 
            borderTop: '1px solid rgba(0,0,0,0.06)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: '#ffffff'
          }}>
            <span style={{ fontSize: '0.8rem', color: 'rgba(0,0,0,0.5)' }}>
              Showing {Math.min((page - 1) * pageSize + 1, totalCount)} to {Math.min(page * pageSize, totalCount)} of {totalCount}
            </span>
            <div style={{ display: 'flex', gap: '8px' }}>
              {page > 1 ? (
                <Link href={`/admin/dashboard/quotes?page=${page - 1}`} className="admin-page-btn" style={{
                  padding: '6px 12px',
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  color: 'var(--charcoal, #2a3a30)',
                  textDecoration: 'none',
                  border: '1px solid rgba(0,0,0,0.1)',
                  borderRadius: '6px'
                }}>
                  Previous
                </Link>
              ) : (
                <span style={{
                  padding: '6px 12px',
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  color: 'rgba(0,0,0,0.3)',
                  border: '1px solid rgba(0,0,0,0.05)',
                  borderRadius: '6px',
                  cursor: 'not-allowed'
                }}>
                  Previous
                </span>
              )}
              
              {page < totalPages ? (
                <Link href={`/admin/dashboard/quotes?page=${page + 1}`} className="admin-page-btn" style={{
                  padding: '6px 12px',
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  color: 'var(--charcoal, #2a3a30)',
                  textDecoration: 'none',
                  border: '1px solid rgba(0,0,0,0.1)',
                  borderRadius: '6px'
                }}>
                  Next
                </Link>
              ) : (
                <span style={{
                  padding: '6px 12px',
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  color: 'rgba(0,0,0,0.3)',
                  border: '1px solid rgba(0,0,0,0.05)',
                  borderRadius: '6px',
                  cursor: 'not-allowed'
                }}>
                  Next
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
