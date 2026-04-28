# Security Specification - MIAMI DESK

## Data Invariants
1. `listings`: Must have valid email, name, country, and property details.
2. `buyer_requests`: Must have valid budget and zones list.
3. `referrals`: Must have agency name.
4. `calls`: Must have transcript and agentId.
5. All writes must include a server-generated timestamp.

## The Dirty Dozen (Vulnerability Test Payloads)
1. **Shadow Field Attack**: Adding `isVerified: true` to a listing create.
2. **Identity Spoofing**: Attempting to set `ownerId` to another user's UID.
3. **Large Payload Attack**: Sending a 2MB string for the `name` field.
4. **Invalid ID Injection**: Using `../../system/info` as a document ID.
5. **Timeline Bypass**: Setting an impossible date for `timestamp`.
6. **Anonymous Listing**: Submitting a listing without an email.
7. **Type Poisoning**: Sending an integer for a field that should be a string (e.g. `country`).
8. **Orphaned Writes**: Writing to a subcollection without a parent (not applicable here as we use top-level collections).
9. **Email Spoofing**: Submitting as an admin email without verification.
10. **State Skipping**: Manually setting a status like "APPROVED" if it were a field.
11. **PII Blanket Read**: Attempting to list the `listings` collection as a guest.
12. **Recursive Cost Attack**: Bombarding with invalid IDs.

## Test Runner (Logic)
The `firestore.rules` must block all the above.
- `allow create`: If valid schema and authenticated (public submissions allowed for certain forms but must be validated).
- `allow list/get`: Only for authenticated admins. Public users cannot read submissions.
- `allow update/delete`: Only for authenticated admins.
