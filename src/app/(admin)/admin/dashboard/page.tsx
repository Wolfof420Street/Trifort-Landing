import { db } from '@/db';
import { contacts, quotes, subcontractors, reviews, projects, analyticsEvents } from '@/db/schema';
import { count, eq } from 'drizzle-orm';
import DashboardCharts from './DashboardCharts';
import { 
  FolderKanban, 
  Users, 
  MessageSquare,
  TrendingUp
} from 'lucide-react';

export const dynamic = 'force-dynamic';

import StatCard from './StatCard';

export default async function AdminDashboard() {
  const [
    [{ count: totalProjects }],
    [{ count: newContacts }],
    [{ count: newQuotes }],
    [{ count: pendingSubs }],
    [{ count: pendingReviews }],
    [{ count: totalVisits }],
    projectStatusCounts
  ] = await Promise.all([
    db.select({ count: count() }).from(projects),
    db.select({ count: count() }).from(contacts).where(eq(contacts.status, 'new')),
    db.select({ count: count() }).from(quotes).where(eq(quotes.status, 'new')),
    db.select({ count: count() }).from(subcontractors).where(eq(subcontractors.status, 'pending')),
    db.select({ count: count() }).from(reviews).where(eq(reviews.status, 'pending')),
    db.select({ count: count() }).from(analyticsEvents).where(eq(analyticsEvents.eventType, 'pageview')),
    db.select({ status: projects.status, count: count() }).from(projects).groupBy(projects.status)
  ]);

  // Aggregate data for charts
  const statusCounts = projectStatusCounts.reduce((acc, row) => {
    acc[row.status] = Number(row.count);
    return acc;
  }, {} as Record<string, number>);

  const projectsByStatus = [
    { name: 'Ongoing', value: statusCounts['ongoing'] || 0 },
    { name: 'Completed', value: statusCounts['completed'] || 0 },
    { name: 'Upcoming', value: statusCounts['upcoming'] || 0 },
  ].filter(item => item.value > 0);

  const enquiriesByType = [
    { name: 'Contacts', value: Number(newContacts) },
    { name: 'Quotes', value: Number(newQuotes) },
    { name: 'Subcontractors', value: Number(pendingSubs) },
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
      <div style={{ marginBottom: '32px' }}>
        <div style={{ 
          fontSize: '0.6rem', 
          letterSpacing: '3px', 
          textTransform: 'uppercase', 
          color: 'var(--gold, #c8701a)',
          fontWeight: 600,
          marginBottom: '8px'
        }}>
          At a Glance
        </div>
        <h1 style={{ 
          margin: 0, 
          color: 'var(--charcoal, #2a3a30)',
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '2.5rem',
          fontWeight: 600,
          lineHeight: 1
        }}>
          Overview
        </h1>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
        <StatCard 
          title="Total Projects" 
          value={Number(totalProjects)} 
          label="all time"
          link="/admin/dashboard/projects" 
          icon={<FolderKanban size={20} />}
          color="var(--emerald)"
        />
        <StatCard 
          title="Enquiries" 
          value={Number(newContacts) + Number(newQuotes) + Number(pendingSubs)} 
          label="pending"
          link="/admin/dashboard/contacts" 
          icon={<Users size={20} />}
          color="var(--gold)"
        />
        <StatCard 
          title="Pending Reviews" 
          value={Number(pendingReviews)} 
          label="awaiting moderation"
          link="/admin/dashboard/reviews" 
          icon={<MessageSquare size={20} />}
          color="#f59e0b"
        />
        <StatCard 
          title="Site Visits" 
          value={Number(totalVisits)} 
          label="total pageviews"
          link="/admin/dashboard/analytics" 
          icon={<TrendingUp size={20} />}
          color="#3b82f6"
        />
      </div>

      <DashboardCharts 
        projectsByStatus={projectsByStatus.length ? projectsByStatus : [{ name: 'No Projects', value: 1 }]} 
        enquiriesByType={enquiriesByType} 
      />
    </div>
  );
}
