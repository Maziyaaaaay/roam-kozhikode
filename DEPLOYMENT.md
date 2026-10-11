# ROAM deployment

Live app: https://roam-kozhikode.vercel.app
Source repository (public, MIT License): https://github.com/Maziyaaaaay/roam-kozhikode
Vercel project: https://vercel.com/maziyaaaaays-projects/roam-kozhikode

The GitHub main branch is connected to Vercel. New pushes build the Vite app and publish the production site. The app root is the repository root; build command is npm run build and output is dist.

The Google Maps browser key is configured as VITE_GOOGLE_MAPS_KEY in the Vercel production environment. It is a public browser configuration value and should have Google API and website restrictions. ElevenLabs credentials stay local; only generated recordings are published.

## iPhone outdoor test

1. Open the live app in Safari and choose a route.
2. Start the walk, select Enable Live GPS, and choose Walk Here if testing away from the Kozhikode route.
3. Allow location access and Precise Location. Keep Safari in the foreground.
4. Outdoors, wait for an accepted GPS fix. Walk 10–15 metres forward, return along the same line, and move sideways. Walk Here uses your first accepted walking direction as the forward axis of the authored world.
5. Stop and check that the avatar becomes idle. Pause and resume to check tracking restarts.
6. Choose Track the Kozhikode Route only when walking on the actual selected corridor. Walk Here is a physical-input preview and does not verify a landmark visit.

Hosted smoke check: HTTPS, location permission header, narration manifest, updated Malayalam introduction and Google walking directions loaded successfully. All 40 local tests and the production build pass. Actual outdoor iPhone accuracy has not been measured by the agent.

## Nearby player connection

Supabase public URL and publishable key are configured for Production. Email confirmation is disabled with owner approval for this temporary demo. The multiplayer tables are present and anonymous nearby RPC calls are denied. Use the Players panel to create two accounts, then enable nearby visibility on both phones outdoors. Two-player GPS and message exchange still require verification. See `docs/NEARBY-SETUP.md`.

Automatic Git deployments can be blocked if the commit author is not linked to the Vercel project. This release uses the authenticated Vercel CLI from a clean release folder without modifying Git identity.
