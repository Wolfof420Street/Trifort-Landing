'use client';
import Link from 'next/link';

export default function StatCard({ title, value, label, link, icon, color }: { title: string, value: number, label: string, link: string, icon: React.ReactNode, color: string }) {
  return (
    <Link href={link} style={{
      display: 'flex',
      flexDirection: 'column',
      padding: '24px',
      backgroundColor: '#fff',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
      textDecoration: 'none',
      color: 'inherit',
      borderLeft: `4px solid ${color}`,
      transition: 'transform 0.2s, box-shadow 0.2s'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.06)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.03)';
    }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <h3 style={{ margin: 0, fontSize: '0.85rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>{title}</h3>
        <div style={{ padding: '8px', background: `${color}15`, borderRadius: '8px', color: color }}>
          {icon}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
        <p style={{ margin: 0, fontSize: '2.5rem', fontWeight: 700, color: 'var(--charcoal)', lineHeight: 1 }}>{value}</p>
        <span style={{ fontSize: '0.85rem', color: '#6b7280', fontWeight: 500 }}>{label}</span>
      </div>
    </Link>
  );
}
