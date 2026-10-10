# Player accounts and nearby chat

This implementation needs a configured Supabase project. It does not substitute NPCs or sample profiles for real connected players. Without configuration the centered login screen explains the setup requirement; exploration requires a connected account.

## Connect the service

1. Open https://supabase.com/dashboard and create a project. Store its database password privately.
2. Open the project's SQL Editor. Paste and run the complete `supabase/multiplayer.sql` file once. It creates presence, invitations and messages with row-level access rules and proximity checks.
3. Find the Project URL and publishable key in the project's Connect dialog / API settings. Never use the service-role or secret key in the browser.
4. In `.env.narration.local`, add:

```dotenv
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=YOUR_PUBLISHABLE_KEY
```

5. In Authentication settings, enable email/password signup. Set Site URL to `https://roam-kozhikode.vercel.app`. For production, keep email confirmation on and configure custom SMTP. For this temporary demo, the owner approved turning confirmation off to avoid the email quota.
6. Restart the local development server. Vite loads environment values at startup/build.
7. Add both values in Vercel → ROAM project → Settings → Environment Variables → Production, then redeploy. These are public browser configuration values; backend row-level policies provide protection.

## Test with two real players

1. Open the HTTPS deployment on two phones. Create two separate accounts. Confirmation emails are disabled for the owner-approved temporary demo.
2. Sign in on the centered entry screen. Give each account a short display name; successful login opens Take the Scenic Route.
3. Both enable “Visible to players within 80 m,” allow location, and keep the page open outdoors. GPS accuracy must be 45 m or better; stale fixes are rejected.
4. Within roughly 5 seconds of a valid fix, each appears in the other's nearby list. In the authored 3D world, a named avatar represents the approximate relative position. This is not a verified street-level position; offsets are rounded to 5 m and visually scaled to fit the scene.
5. Invite the other player. They must Accept before messages can be sent. Test Decline, End chat, and moving beyond 80 m. The server refuses messages when either player is not discoverable nearby.
6. Disable nearby visibility or sign out. Presence is deleted; disconnected clients stop appearing after 30 seconds. Backgrounding the page clears visibility. Location collection for nearby players is separate from route-tracking controls.

## Implemented boundaries

Email/password accounts, opt-in location presence, nearby discovery, named 3D avatars, invitation acceptance/decline, private text chat, end chat, and sign out are implemented. Microphone voice calls, account-synced scores, blocking/moderation tooling and production abuse controls are not implemented. This is a two-player demo feature, not a public social-platform launch.

No microphone is requested. Presence uses foreground GPS and a 5-second update interval; chat refreshes every 2 seconds. Raw coordinates are readable only by their owner; the proximity RPC returns names, distance and rounded relative offsets. Database operators can access stored information. Stale presence is excluded, but rows from disconnected devices may remain until removed. Chat messages persist in the project until deleted by its operator.

Backend SQL and two-device behavior require validation against your configured project before claiming multiplayer works in a demo. Build checks cannot prove this.

Signed-in accounts use separate browser-local quest progress keys. Progress is not synced between devices; logging out stops the walk and returns to the login screen.

## Signup email quota

Supabase's built-in email service has a small project-wide quota and restricted recipients. A public publishable key cannot modify authentication settings. Configure a custom SMTP provider in Supabase Authentication settings to keep email verification and support more signups. The client now distinguishes this email-service limit from invalid credentials, preserves entered details, and prevents duplicate signup submission with a short request cooldown. That cooldown does not reset the provider quota.

For a temporary hackathon demo, the project owner may explicitly choose to disable Confirm Email under Authentication → Sign In / Providers → Email. This allows new email/password accounts without verifying address ownership. It is a security tradeoff requiring the owner's choice, and is not applied automatically by ROAM. Existing unconfirmed accounts may still need resolution in Supabase. Re-enable verification and configure SMTP before a public launch.

Current demo setting: Confirm Email is disabled with owner approval. The authentication settings endpoint verified that confirmation is no longer required. Re-enable it with custom SMTP before public release.
