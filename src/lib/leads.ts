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

export interface LeadPayload {
  type: 'home_valuation' | 'listing_intake' | 'buyer_mandate' | 'contact_general' | 'ai_desk_handoff' | 'agency_referral' | 'whatsapp_click';
  name: string;
  email: string;
  phone?: string;
  country?: string;
  language?: string;
  city?: string;
  propertyType?: string;
  priceTier?: string;
  timeline?: string;
  message?: string;
  details?: any;
}

export async function submitLead(payload: LeadPayload): Promise<{ ok: boolean }> {
  try {
    const enriched = {
      ...payload,
      sourcePage: typeof window !== 'undefined' ? window.location.pathname : '',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
      submittedAt: new Date().toISOString()
    };
    const res = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(enriched)
    });
    const json = await res.json();
    return { ok: json.ok === true };
  } catch (e) {
    console.error('Lead submission failed:', e);
    return { ok: false };
  }
}
