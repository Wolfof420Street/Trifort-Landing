'use client';

import { useTransition } from 'react';

export default function StatusButton({
  id,
  currentStatus,
  nextStatus,
  action,
}: {
  id: string;
  currentStatus: string;
  nextStatus: string;
  action: (id: string, status: any) => Promise<void>;
}) {
  const [isPending, startTransition] = useTransition();

  if (currentStatus === nextStatus) {
    return <span style={{ color: 'green', fontSize: '0.9rem' }}>{currentStatus}</span>;
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <span style={{ fontSize: '0.9rem', color: '#666' }}>{currentStatus}</span>
      <button
        disabled={isPending}
        onClick={() => startTransition(() => action(id, nextStatus))}
        style={{
          padding: '4px 8px',
          cursor: isPending ? 'not-allowed' : 'pointer',
          background: 'var(--charcoal)',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          fontSize: '0.8rem'
        }}
      >
        {isPending ? '...' : `Mark ${nextStatus}`}
      </button>
    </div>
  );
}
