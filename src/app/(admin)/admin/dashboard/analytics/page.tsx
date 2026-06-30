import { db } from "@/db";
import { analyticsEvents } from "@/db/schema";
import { count, desc, eq, and, sql } from "drizzle-orm";
import AnalyticsTrendChart from "./AnalyticsTrendChart";

export const dynamic = 'force-dynamic';

export default async function AnalyticsDashboard() {
  // 1. Total Visits
  const totalVisitsResult = await db.select({ count: count() }).from(analyticsEvents).where(eq(analyticsEvents.eventType, "pageview"));
  const totalVisits = Number(totalVisitsResult[0]?.count || 0);

  // 2. Contact Views
  const contactVisitsResult = await db.select({ count: count() }).from(analyticsEvents).where(
    and(eq(analyticsEvents.eventType, "pageview"), eq(analyticsEvents.path, "/contact"))
  );
  const contactViews = Number(contactVisitsResult[0]?.count || 0);

  // 3. Trend Data (Views by Date)
  const trendResult = await db.select({
    date: sql<string>`DATE(${analyticsEvents.createdAt})`,
    views: count()
  }).from(analyticsEvents)
    .where(eq(analyticsEvents.eventType, "pageview"))
    .groupBy(sql`DATE(${analyticsEvents.createdAt})`)
    .orderBy(sql`DATE(${analyticsEvents.createdAt}) ASC`)
    .limit(30);

  const trendData = trendResult.map(r => ({
    date: r.date,
    views: Number(r.views)
  }));

  // 4. Top Pages
  const topPagesResult = await db.select({
    path: analyticsEvents.path,
    views: count()
  }).from(analyticsEvents)
    .where(eq(analyticsEvents.eventType, "pageview"))
    .groupBy(analyticsEvents.path)
    .orderBy(desc(count()))
    .limit(10);

  const topPages: [string, number][] = topPagesResult.map(r => [r.path, Number(r.views)]);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ margin: '0 0 8px 0', color: 'var(--charcoal)', fontSize: '2rem', fontWeight: 700 }}>Analytics</h1>
        <p style={{ margin: 0, color: '#6b7280', fontSize: '0.95rem' }}>Track your website traffic and engagement over time.</p>
      </div>
      
      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        <div style={{ padding: '24px', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', borderLeft: '4px solid var(--emerald)' }}>
          <div style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#6b7280', fontWeight: 600, marginBottom: '8px' }}>Total Page Views</div>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--charcoal)', lineHeight: 1 }}>{totalVisits}</div>
        </div>
        
        <div style={{ padding: '24px', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', borderLeft: '4px solid var(--gold)' }}>
          <div style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#6b7280', fontWeight: 600, marginBottom: '8px' }}>Contact Page Views</div>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--charcoal)', lineHeight: 1 }}>{contactViews}</div>
        </div>
        
        <div style={{ padding: '24px', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', borderLeft: '4px solid #3b82f6' }}>
          <div style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#6b7280', fontWeight: 600, marginBottom: '8px' }}>Est. Conversion Rate</div>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--charcoal)', lineHeight: 1 }}>
            {totalVisits > 0 ? Math.round((contactViews / totalVisits) * 100) : 0}%
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
        {/* Trend Chart */}
        <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
          <h2 style={{ margin: '0 0 16px 0', fontSize: '1.2rem', color: 'var(--charcoal)', fontWeight: 600 }}>Traffic Over Time</h2>
          {trendData.length > 0 ? (
            <AnalyticsTrendChart data={trendData} />
          ) : (
            <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280' }}>
              No traffic data yet.
            </div>
          )}
        </div>

        {/* Top Pages Table */}
        <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
          <h2 style={{ margin: '0 0 16px 0', fontSize: '1.2rem', color: 'var(--charcoal)', fontWeight: 600 }}>Top Pages</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #eee' }}>
                <th style={{ padding: '12px 16px', color: '#6b7280', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Path</th>
                <th style={{ padding: '12px 16px', color: '#6b7280', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, textAlign: 'right' }}>Views</th>
              </tr>
            </thead>
            <tbody>
              {topPages.map(([path, views], i) => (
                <tr key={i} style={{ borderBottom: '1px solid #f9fafb' }}>
                  <td style={{ padding: '16px', color: 'var(--charcoal)' }}>{path}</td>
                  <td style={{ padding: '16px', color: 'var(--charcoal)', fontWeight: 600, textAlign: 'right' }}>{views}</td>
                </tr>
              ))}
              {topPages.length === 0 && (
                <tr>
                  <td colSpan={2} style={{ padding: '32px', textAlign: 'center', color: '#6b7280' }}>No data available yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
