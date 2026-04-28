import { db, auth } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export interface LeadData {
  type: 'listing' | 'buyer' | 'referral' | 'inquiry';
  name: string;
  email: string;
  phone?: string;
  agency?: string;
  country: string;
  language: string;
  message?: string;
  details: any;
  timestamp: string;
}

export async function submitLead(data: LeadData) {
  const collectionName = data.type === 'listing' ? 'listings' : 
                        data.type === 'buyer' ? 'buyer_requests' :
                        data.type === 'referral' ? 'referrals' : 'leads';

  try {
    const docRef = await addDoc(collection(db, collectionName), {
        ...data,
        timestamp: serverTimestamp()
    });
    console.log("Lead submitted successfully, ID:", docRef.id);
    return true;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, collectionName);
    return false;
  }
}
