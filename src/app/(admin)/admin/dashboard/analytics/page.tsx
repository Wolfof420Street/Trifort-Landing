import { db } from "@/db";
import { analyticsEvents } from "@/db/schema";
import { count, desc, eq, and, sql } from "drizzle-orm";
import AnalyticsTrendChart from "./AnalyticsTrendChart";
import StatCard from "../StatCard";
import { Eye, MousePointer, TrendingUp } from "lucide-react";

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
  
  const conversionRate = totalVisits > 0 ? Math.round((contactViews / totalVisits) * 100) : 0;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
      <style dangerouslySetInnerHTML={{__html: `
        .admin-table-row { transition: background 0.2s ease; cursor: default; }
        .admin-table-row:hover { background: rgba(30,61,43,0.02); }
      `}} />

      <div style={{ marginBottom: '32px' }}>
        <div style={{ 
          fontSize: '0.6rem', 
          letterSpacing: '3px', 
          textTransform: 'uppercase', 
          color: 'var(--gold, #c8701a)',
          fontWeight: 600,
          marginBottom: '8px'
        }}>
          Traffic & Insights
        </div>
        <h1 style={{ 
          margin: 0, 
          color: 'var(--charcoal, #2a3a30)',
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '2.5rem',
          fontWeight: 600,
          lineHeight: 1
        }}>
          Analytics
        </h1>
      </div>
      
      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        <StatCard
          title="Total Page Views"
          value={totalVisits}
          label="all time"
          link="/admin/dashboard/analytics"
          icon={<Eye size={20} />}
          color="var(--emerald)"
        />
        
        <StatCard
          title="Contact Page Views"
          value={contactViews}
          label="all time"
          link="/admin/dashboard/analytics"
          icon={<MousePointer size={20} />}
          color="var(--gold)"
        />
        
        {/* Conversion Rate Card inline because it needs the % suffix */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '24px',
          backgroundColor: '#fff',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
          borderLeft: '4px solid #3b82f6',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '0.65rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 600 }}>Est. Conversion Rate</h3>
            <div style={{ padding: '8px', background: '#3b82f615', borderRadius: '8px', color: '#3b82f6' }}>
              <TrendingUp size={20} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <p style={{ margin: 0, fontSize: '3rem', fontWeight: 300, fontFamily: "'Cormorant Garamond', serif", color: 'var(--charcoal)', lineHeight: 1 }}>{conversionRate}%</p>
            <span style={{ fontSize: '0.85rem', color: '#6b7280', fontWeight: 500 }}>all time</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
        {/* Trend Chart */}
        <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
          <h2 style={{ 
            margin: '0 0 20px 0', 
            fontSize: '1.4rem', 
            color: 'var(--charcoal)', 
            fontWeight: 400,
            fontFamily: "'Cormorant Garamond', serif",
            borderBottom: '1px solid rgba(200,112,26,0.2)',
            paddingBottom: '12px'
          }}>Traffic Over Time</h2>
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
          <h2 style={{ 
            margin: '0 0 20px 0', 
            fontSize: '1.4rem', 
            color: 'var(--charcoal)', 
            fontWeight: 400,
            fontFamily: "'Cormorant Garamond', serif",
            borderBottom: '1px solid rgba(200,112,26,0.2)',
            paddingBottom: '12px'
          }}>Top Pages</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#f8f9fa', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                  <th style={{ padding: '16px 24px', color: 'rgba(0,0,0,0.45)', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 600 }}>Path</th>
                  <th style={{ padding: '16px 24px', color: 'rgba(0,0,0,0.45)', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 600, textAlign: 'right' }}>Views</th>
                </tr>
              </thead>
              <tbody>
                {topPages.map(([path, views], i) => {
                  const isLast = i === topPages.length - 1;
                  return (
                    <tr key={i} className="admin-table-row" style={{ borderBottom: isLast ? 'none' : '1px solid rgba(0,0,0,0.04)' }}>
                      <td style={{ padding: '16px 24px', color: 'var(--charcoal)', fontSize: '0.875rem' }}>{path}</td>
                      <td style={{ padding: '16px 24px', color: 'var(--charcoal)', fontSize: '0.875rem', fontWeight: 600, textAlign: 'right' }}>{views}</td>
                    </tr>
                  );
                })}
                {topPages.length === 0 && (
                  <tr>
                    <td colSpan={2} style={{ padding: '48px 0', textAlign: 'center', color: '#6b7280', borderBottom: 'none' }}>No data available yet</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
