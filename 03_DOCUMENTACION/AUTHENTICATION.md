# AUTHENTICATION.md — PRD_SYSTEM AUTHENTICATION SPECIFICATION

## JWT + Refresh Tokens Architecture

1. **Access Token**:
   - Short-lived (15 min)
   - Passed via `Authorization: Bearer <token>`
   - Contains `userId`, `username`, `email`, `role`
2. **Refresh Token**:
   - Long-lived (7 days)
   - Stored in HTTP-only secure cookie and verified against `auth_sessions` table
3. **Password Security**:
   - Hashed using Argon2id or bcrypt (cost factor >= 12)
   - Never exposed in logs, responses, or client-side storage
4. **Session Control**:
   - Immediate session revocation via `POST /api/auth/logout` or admin termination.
