import { db } from '@/db';
import { projects } from '@/db/schema';
import { desc } from 'drizzle-orm';
import Link from 'next/link';
import EmptyState from '@/components/admin/EmptyState';
import { FolderKanban } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminProjectsPage() {
  const allProjects = await db.query.projects.findMany({
    orderBy: [desc(projects.createdAt)],
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ margin: 0, color: 'var(--charcoal)' }}>Projects</h1>
        <Link href="/admin/dashboard/projects/new" style={{
          padding: '10px 20px',
          background: 'var(--gold)',
          color: 'var(--charcoal)',
          textDecoration: 'none',
          fontWeight: 'bold',
          borderRadius: '4px'
        }}>
          + New Project
        </Link>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #eee' }}>
            <th style={{ padding: '10px' }}>Title / Slug</th>
            <th style={{ padding: '10px' }}>Category</th>
            <th style={{ padding: '10px' }}>Status</th>
            <th style={{ padding: '10px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allProjects.map((p) => (
            <tr key={p.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '10px' }}>
                <div><strong>{p.title}</strong></div>
                <div style={{ fontSize: '0.8rem', color: '#666' }}>/{p.slug}</div>
              </td>
              <td style={{ padding: '10px' }}>{p.category}</td>
              <td style={{ padding: '10px' }}>{p.status}</td>
              <td style={{ padding: '10px' }}>
                <Link href={`/admin/dashboard/projects/${p.id}`} style={{ color: 'var(--charcoal)' }}>Edit</Link>
              </td>
            </tr>
          ))}
          {allProjects.length === 0 && (
            <tr>
              <td colSpan={4} style={{ padding: 0 }}>
                <EmptyState icon={FolderKanban} title="No projects yet" message="Create your first project to showcase your portfolio." />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
