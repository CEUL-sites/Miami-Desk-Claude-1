import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

async function testConnection() {
  try {
    // Attempt to read a non-existent doc from a test collection to verify connectivity
    await getDocFromServer(doc(db, 'system', 'connection_test'));
    console.log("Firebase Connection: Active");
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration: Client is offline.");
    } else {
        console.log("Firebase initialized (connection check returned expected response)");
    }
  }
}

if (typeof window !== 'undefined') {
    testConnection();
}
