import * as admin from 'firebase-admin';

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.applicationDefault(),
        databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`
    });
}

export { admin };
