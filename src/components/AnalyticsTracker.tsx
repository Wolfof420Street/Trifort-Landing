"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function generateSafeUUID() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  // Fallback for environments where crypto.randomUUID is not available (e.g., insecure contexts like HTTP in Docker)
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function getSessionId() {
  if (typeof window === "undefined") return "server-session";
  let sessionId = sessionStorage.getItem("tf_session_id");
  if (!sessionId) {
    sessionId = generateSafeUUID();
    sessionStorage.setItem("tf_session_id", sessionId);
  }
  return sessionId;
}

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Fire and forget pageview event
    const sessionId = getSessionId();
    fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId,
        path: pathname,
        referrer: document.referrer || null,
        eventType: "pageview",
      }),
      keepalive: true,
    }).catch(console.error); // Ignore errors so it doesn't pollute the console too much
  }, [pathname]);

  return null;
}
