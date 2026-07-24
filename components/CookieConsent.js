'use client';

import { useEffect, useState } from 'react';
import styles from './CookieConsent.module.css';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const CONSENT_KEY = 'ga-consent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;

    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored !== 'granted' && stored !== 'denied') {
      setVisible(true);
    }
  }, []);

  function updateConsent(state) {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        ad_storage: state,
        ad_user_data: state,
        ad_personalization: state,
        analytics_storage: state,
      });
    }
  }

  function accept() {
    localStorage.setItem(CONSENT_KEY, 'granted');
    updateConsent('granted');
    setVisible(false);
  }

  function reject() {
    localStorage.setItem(CONSENT_KEY, 'denied');
    updateConsent('denied');
    setVisible(false);
  }

  if (!GA_MEASUREMENT_ID || !visible) return null;

  return (
    <div className={styles.banner} role="dialog" aria-live="polite" aria-label="Cookie consent">
      <p className={styles.text}>
        This site uses cookies to measure traffic with Google Analytics. Analytics
        cookies are only set if you accept.
      </p>
      <div className={styles.actions}>
        <button type="button" className={styles.reject} onClick={reject}>
          Reject
        </button>
        <button type="button" className={styles.accept} onClick={accept}>
          Accept
        </button>
      </div>
    </div>
  );
}
