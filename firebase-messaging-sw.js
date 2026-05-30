// ════════════════════════════════════════════════════
//  firebase-messaging-sw.js
//  ⚠️  MUST be in the ROOT of your GitHub repo
//      (same folder as index.html)
// ════════════════════════════════════════════════════

importScripts('https://www.gstatic.com/firebasejs/11.6.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/11.6.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey:            "AIzaSyAW2iimA7WhA86WTWPpZDLD1axhmy7n_XY",
  authDomain:        "eldo-purchase-tracker.firebaseapp.com",
  projectId:         "eldo-purchase-tracker",
  storageBucket:     "eldo-purchase-tracker.firebasestorage.app",
  messagingSenderId: "1022915600336",
  appId:             "1:1022915600336:web:bc36fa1488d77c137523d5"
});

const messaging = firebase.messaging();

// ── Background push handler (app closed / minimised) ──
messaging.onBackgroundMessage(function(payload) {
  const notif   = payload.notification || {};
  const title   = notif.title || '📋 PurchaseTracker';
  const body    = notif.body  || 'A purchase order was updated.';

  return self.registration.showNotification(title, {
    body,
    icon:      '/icon-192.png',
    badge:     '/icon-72.png',
    tag:       'purchase-tracker',
    renotify:  true,
    actions:   [{ action: 'open', title: '📂 Open App' }]
  });
});

// ── Click → open / focus the app ──
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(list) {
      for (var i = 0; i < list.length; i++) {
        if ('focus' in list[i]) return list[i].focus();
      }
      if (clients.openWindow) return clients.openWindow('./');
    })
  );
});
