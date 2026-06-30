import * as Sentry from '@sentry/nextjs';

export function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // this is your Sentry.init call from `sentry.server.config.ts`
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      tracesSampleRate: 1,
    });
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    // this is your Sentry.init call from `sentry.edge.config.ts`
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      tracesSampleRate: 1,
    });
  }
}

export const onRequestError = Sentry.captureRequestError;
