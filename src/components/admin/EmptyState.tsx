import { LucideIcon } from 'lucide-react';

export default function EmptyState({ icon: Icon, title, message }: { icon: LucideIcon, title: string, message: string }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '64px 20px',
      textAlign: 'center',
      animation: 'fadeIn 0.5s ease-out'
    }}>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
      <div style={{
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        backgroundColor: 'rgba(30, 61, 43, 0.05)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '16px',
        color: 'var(--emerald)'
      }}>
        <Icon size={32} />
      </div>
      <h3 style={{ margin: '0 0 8px 0', color: 'var(--charcoal)', fontSize: '1.2rem', fontWeight: 600 }}>
        {title}
      </h3>
      <p style={{ margin: 0, color: '#6b7280', maxWidth: '350px', lineHeight: 1.5 }}>
        {message}
      </p>
    </div>
  );
}
