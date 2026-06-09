// ⚠️ ADMIN EMAILS - Update in .env.local or hardcode production emails ONLY
const ADMIN_EMAILS = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(',').map(e => e.trim()) || [];

/**
 * Client-side check (for UI display only)
 * ⚠️ ALWAYS verify permissions server-side
 */
export function isAdminUser(email: string | undefined): boolean {
  if (!email) return false;
  
  // Exact match only - no includes/contains patterns
  return ADMIN_EMAILS.includes(email.toLowerCase());
}

/**
 * Server-side validation (use in Cloud Functions)
 * Example Firestore Rules:
 * 
 * match /records/{recordId} {
 *   allow write: if isAdmin(request.auth.token.email);
 * }
 * 
 * function isAdmin(email) {
 *   return email in ['admin@spamlist.fr', 'mod@spamlist.fr'];
 * }
 */
export const ADMIN_OPERATIONS = {
  APPROVE_RECORD: 'approveRecord',
  REJECT_RECORD: 'rejectRecord',
  DELETE_LEVEL: 'deleteLevel',
  BAN_USER: 'banUser',
  UPDATE_TIER: 'updateTier',
} as const;
