import { db } from '@/db';
import { projects } from '@/db/schema';
import { count, desc } from 'drizzle-orm';
import Link from 'next/link';
import EmptyState from '@/components/admin/EmptyState';
import { FolderKanban, Pencil } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminProjectsPage(props: { searchParams: Promise<{ page?: string }> }) {
  const searchParams = await props.searchParams;
  const page = parseInt(searchParams?.page || '1') || 1;
  const pageSize = 20;
  const offset = (page - 1) * pageSize;
  
  // Database-level count and pagination
  const [countResult] = await db.select({ value: count() }).from(projects);
  const totalCount = countResult.value;
  const totalPages = Math.ceil(totalCount / pageSize);

  const paginatedProjects = await db.query.projects.findMany({
    orderBy: [desc(projects.createdAt)],
    limit: pageSize,
    offset: offset,
  });

  return (
    <div>
      <style dangerouslySetInnerHTML={{__html: `
        .admin-table-row { transition: background 0.2s ease; cursor: default; }
        .admin-table-row:hover { background: rgba(30,61,43,0.02); }
        .admin-action-btn { transition: background 0.2s ease; }
        .admin-action-btn:hover { background: rgba(0,0,0,0.06); }
        .admin-primary-btn { transition: all 0.2s ease; }
        .admin-primary-btn:hover { box-shadow: 0 6px 16px rgba(200,112,26,0.25); transform: translateY(-1px); }
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
            Portfolio
          </div>
          <h1 style={{ 
            margin: 0, 
            color: 'var(--charcoal, #2a3a30)',
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '2.5rem',
            fontWeight: 600,
            lineHeight: 1
          }}>
            Projects
          </h1>
        </div>
        <Link href="/admin/dashboard/projects/new" className="admin-primary-btn" style={{
          padding: '12px 24px',
          background: 'var(--gold, #c8701a)',
          color: 'white',
          textDecoration: 'none',
          fontWeight: 600,
          fontSize: '0.875rem',
          borderRadius: '6px',
          boxShadow: '0 4px 12px rgba(200,112,26,0.15)'
        }}>
          New Project
        </Link>
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
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
            <thead>
              <tr style={{ 
                background: '#f8f9fa',
                borderBottom: '1px solid rgba(0,0,0,0.06)'
              }}>
                <th style={{ padding: '16px 24px', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'rgba(0,0,0,0.45)', fontWeight: 600 }}>Title / Slug</th>
                <th style={{ padding: '16px 24px', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'rgba(0,0,0,0.45)', fontWeight: 600 }}>Category</th>
                <th style={{ padding: '16px 24px', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'rgba(0,0,0,0.45)', fontWeight: 600 }}>Status</th>
                <th style={{ padding: '16px 24px', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'rgba(0,0,0,0.45)', fontWeight: 600, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProjects.map((p, index) => {
                const isLast = index === paginatedProjects.length - 1;
                
                // Status Badge Logic
                let badgeBg = '#f1f5f9';
                let badgeColor = '#475569';
                if (p.status?.toLowerCase() === 'completed') {
                  badgeBg = 'var(--gold, #c8701a)';
                  badgeColor = '#ffffff';
                } else if (p.status?.toLowerCase() === 'ongoing') {
                  badgeBg = 'var(--emerald, #1e3d2b)';
                  badgeColor = '#ffffff';
                }

                return (
                  <tr key={p.id} className="admin-table-row" style={{ 
                    borderBottom: isLast ? 'none' : '1px solid rgba(0,0,0,0.04)'
                  }}>
                    <td style={{ padding: '16px 24px', height: '56px' }}>
                      <div style={{ fontWeight: 600, color: 'var(--charcoal, #2a3a30)', fontSize: '0.9rem' }}>{p.title}</div>
                      <div style={{ fontSize: '0.75rem', color: 'rgba(0,0,0,0.4)' }}>/{p.slug}</div>
                    </td>
                    <td style={{ padding: '16px 24px', fontSize: '0.875rem', color: '#475569' }}>
                      {p.category}
                    </td>
                    <td style={{ padding: '16px 24px' }}>
                      <span style={{
                        display: 'inline-block',
                        background: badgeBg,
                        color: badgeColor,
                        padding: '3px 10px',
                        borderRadius: '20px',
                        fontSize: '0.65rem',
                        fontWeight: 600,
                        letterSpacing: '1px',
                        textTransform: 'uppercase'
                      }}>
                        {p.status || 'Draft'}
                      </span>
                    </td>
                    <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                      <Link 
                        href={`/admin/dashboard/projects/${p.id}`}
                        className="admin-action-btn"
                        style={{ 
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '32px',
                          height: '32px',
                          borderRadius: '6px',
                          color: 'var(--charcoal, #2a3a30)',
                          textDecoration: 'none'
                        }}
                        title="Edit Project"
                      >
                        <Pencil size={16} />
                      </Link>
                    </td>
                  </tr>
                );
              })}
              
              {paginatedProjects.length === 0 && (
                <tr>
                  <td colSpan={4} style={{ padding: '48px 0', borderBottom: 'none' }}>
                    <EmptyState icon={FolderKanban} title="No projects yet" message="Create your first project to showcase your portfolio." />
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
                <Link href={`/admin/dashboard/projects?page=${page - 1}`} className="admin-page-btn" style={{
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
                <Link href={`/admin/dashboard/projects?page=${page + 1}`} className="admin-page-btn" style={{
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
