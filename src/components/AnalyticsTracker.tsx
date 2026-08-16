'use client';

import { useEffect } from 'react';

export default function AnalyticsTracker() {
  useEffect(() => {
    fetch('/api/events', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ eventName: 'page_view', page: window.location.pathname }) }).catch(() => undefined);
  }, []);
  return null;
}
