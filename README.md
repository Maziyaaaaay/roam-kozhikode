# ROAM · Kozhikode Weekend Quest Club

A React/Three.js demo that turns a walk into selectable local discovery quests. Choose one of three Kozhikode routes, hear a preloaded opening, walk with optional foreground GPS or use held demo controls, complete local discovery quests and collect points. The leaderboard and daily streak update immediately and persist on this device.

Live app: https://roam-kozhikode.vercel.app — every player signs in with an account and a player name before playing.

## Run the demo

Double-click `start-roam.command`, or run:

```sh
npm run build
npm run preview -- --port 4173
```

Open http://localhost:4173 in Chrome. For development, use `npm run dev`.

## Two-minute rehearsal

- 0–15 seconds: choose the railway route, point out the real Kozhikode start and Mananchira finish, and begin.
- 15–35 seconds: use held demo movement to pass through the narrated 3D street. Show the station facade, palm-lined city and the more detailed Blender cafe model.
- 35–65 seconds: reach the first SM Street quest stop, let the caption and voice land, then show two activity choices.
- 65–95 seconds: complete a short field observation and save it for points; show the avatar settle when movement stops.
- 95–120 seconds: advance to Mananchira, show the weekend board and journal. Clarify that the leaderboard is local demo data and live GPS follows the player on a real outdoor walk.

Hold W/up or the on-screen WALK control to move the demo. A/D and arrow keys steer; dragging rotates the view; Center View resets its manual angle. Demo controls move the authored corridor. The separate Live GPS mode follows the device location and is the mode to use for a real walk.

## What is functional

Thirty curated quests across three corridors (five coast stops and four stops on each city route), two or more alternatives at each stop, points only on completion, duplicate reward prevention per quest per India-local week, daily streak, local journal, optional notes/session photos, ranked local demo board, weekly rollover, playful voice cues, optional one-time mystery gag, mute/replay and reduced motion. Intro and reward recordings use the configured ElevenLabs voice and are bundled locally.

Competitors are explicitly labelled sample rivals. Your score is local demo data. Completion is self-reported, with an explicit simulation label in Demo Walk. A photo is optional and stays in session memory; no AI validation or merchant verification is claimed. Real shared competition requires identity, server-side award validation and a database before deployment.

## Accounts and nearby players

Sign-in is required. Create an account with a player name, email and password; the name appears above your explorer and to nearby players. Progress is saved per account on the device. In the players panel, turn on **Visible to players within 80 m** to see and message other signed-in players nearby. Accounts use Supabase (`VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`); see `docs/NEARBY-SETUP.md`. Two-phone nearby play still needs a field check.

## Badges

Twelve local achievements (`src/badges.js`) are derived from the journal and live GPS distance: First Steps, Quest Collector, Three Corridors, Heritage Hunter, Appetite Navigator, Civic Voice, On a Roll, Week Warrior, Thousand Club, Night Owl (India time), Real Footsteps and One Kilometre. Open **BADGES** in the header for progress; a toast announces each unlock. Badges never change points or the board.

## Location and world

Foreground GPS can drive the route progress, marker, camera and arrival checkpoints on a secure origin. The avatar gait responds to accurate, fresh fixes that indicate walking; it settles while the player is stopped. This is location-based movement, not eye tracking. On Mac, location may be estimated from nearby Wi-Fi; a phone outdoors usually provides a better GPS fix. The authored coordinates are approximate and individual vendors are not geofenced or verified. Demo controls work without GPS. Phone GPS requires HTTPS; an ordinary local-network HTTP address supports only the simulated journey. Live outdoor GPS has had an initial phone check; route-tracking accuracy in Kozhikode remains to be field-tested.

The rendered corridor is an authored Three.js reconstruction, not an Unreal Engine build or surveyed city replica. It uses articulated character joints, layered building facades, tropical vegetation, shadows, textured road surfaces, checkpoint props, and a Blender-exported cafe model. Choices reveal distinct 3D pier, pond, food-counter and other activity sets. The illustrated field map uses route context and checkpoint pictograms; it remains an approximate game map, not a navigation map. Three authored walks are available: Corporation Office to Kozhikode Beach, SM Street to Mananchira, and Railway Station to Mananchira via SM Street. With Maps configured, selections recalculate the provider walking route; without Maps, Demo Walk keeps the authored corridor and approximate geography. The opening is a narrated real-time 3D scene, not a rendered intro video.

## Voice configuration

Use `.env.narration.local` for `ELEVENLABS_API_KEY`, `ELEVENLABS_VOICE_ID` and `ELEVENLABS_MODEL_ID`. Never prefix the private key with VITE_. The script contacts ElevenLabs during generation; the browser uses local recordings and receives no key.

```sh
node scripts/elevenlabs-narration.mjs --preview
node scripts/elevenlabs-narration.mjs --all
npm test
npm run build
```

Matching recordings are reused. A restricted key can record without model-list permission. ElevenLabs supplies measured timings. The former story mode is retained as `src/StoryApp.jsx` for reference; the active application is `src/QuestApp.jsx`. The new railway route has fresh English and Malayalam intro recordings; its checkpoint cues and ending use the existing market recordings.

## Optional Google Maps setup

The route sketch works without a key. When adding Google Maps, create a restricted browser key, enable Maps JavaScript API and Routes API (Places is not used by the current build), set exact website restrictions for the demo origin, set API restrictions and quotas, then add `VITE_GOOGLE_MAPS_KEY` to `.env.local`. Rebuild, check returned start/end points and walking directions before using them outdoors. A browser Maps key is public by design and requires restrictions.

## Source and integration limits

Place facts link to Kerala Tourism and the Kozhikode District guide. Food, heritage and creative tasks require no purchases. No verified hidden-spot catalogue, dated event feed, merchant check-in service or redeemable wallet is connected yet. These are future integrations; the demo does not invent real vendors, bookings or live competitors.

## Narration, humour and district sounds

The main-screen EN/ML control and settings menu let the player choose English or Malayalam for supported narrator clips. Original Malayalam quest-selection reactions now have matching recorded narration and captions. The setting is explicit; ROAM does not guess language from location. Original sarcastic lines play at checkpoint arrivals, twice during a walk, and after quest completion. Live GPS can also trigger one slow-walk or one running quip after sustained, accurate pace readings. Simulated fast-forward is excluded, stationary pauses are not roasted, and pace samples are not saved. The jokes tease the game situation and choices, not a player’s identity, safety or ability. Disabling playful teasing also stops the jokes. The five coast checkpoint lines and four city checkpoint lines have English and Malayalam recordings, captions and replay controls; pace lines also have captions.

Generated beach ambience plays on the coast route; the market and railway routes use the market soundscape. The player can preview the Thrissur percussion-inspired sound and Kannur coastal ambience in settings. Both previews are labelled as generated, are not tied to a route, and make no claim that a festival or other event is live. For a real Thrissur or Kannur route, connect a checked route and properly licensed or clearly labelled sound assets first. All audio is bundled for offline playback after the build. Narrator audio remains user-muteable; location ambience has a separate setting.

To regenerate audio after changing scripts, use `node scripts/elevenlabs-narration.mjs --all` and `node scripts/elevenlabs-soundscapes.mjs --all`. Generation requires the private local ElevenLabs key; generated files and manifests are served from the app, and the key is never sent to the browser. Sound generation is charged by ElevenLabs per generation. Re-run `npm run build` to update the production demo.

## Updated movement demo

Manual movement covers a corridor in roughly 30 seconds excluding quests; Auto Walk takes roughly 18 seconds. Both stop at checkpoints. Hold left/right for diagonal movement, or A/D for sideways movement alone. Drag the world or hold Q/E to look around. The avatar stops when controls are released. Pedestrians and traffic animate independently, except with reduced motion enabled.

All three routes have Malayalam narration and captions. Use the language button in the header to select Malayalam. On a quest card, Replay Narrator replays the selected response; the response stays visible below the task.

### Real movement test on your phone

1. Use the live app above, or serve the built dist folder from an HTTPS static host. The browser bundle contains the restricted public Google Maps key; never upload the project root or .env files. The built app is static and does not need a backend.
2. Open that HTTPS URL on your iPhone in Safari, keep the tab in the foreground, and start a route. A Mac localhost URL cannot be opened directly from your phone. A local-network HTTP URL is not sufficient for phone location access.
3. Select Enable Live GPS, then Walk Here to test at your current location. Allow location permission with Precise Location enabled. Outdoors, wait until the status changes from Waiting to Preview and reports a useful accuracy.
4. Allow **Motion & Orientation** access when asked. The status line shows STEP SENSOR ON once your steps are detected (GPS ONLY if motion access is blocked).
5. Walk in any direction. Distance walked always counts as forward progress, at 2× the real distance for quick demos (`WALK_HERE_BOOST` in `src/movement.js`); the distance to the next stop is shown in real metres. The explorer moves every frame: phone steps start and stop it within about a second, it glides at your measured pace, and GPS keeps the total honest. The chase camera keeps the explorer centred. This tests real physical movement in an authored scene and does not prove arrival at a Kozhikode landmark.
6. Pause Walk stops location tracking. Resume starts it again. It also restarts after a completed quest. A preview completion is labelled gps-preview in the journal.
7. If you are actually on the selected Kozhikode route, choose Track the Kozhikode Route instead. This uses accepted GPS fixes projected onto that route and reports when you are outside the corridor.

The built-in browser returned Location Unavailable during the desktop check. The GPS processing tests pass, but an outdoor iPhone walk has not been verified. Do that before presenting real location tracking as tested.

## Entry flow

ROAM opens with a centered sign-in / create-account screen. A signed-in Supabase account is required before Take the Scenic Route, district selection and the 3D world appear. Existing sessions are restored on reload. Signing out stops the walk and returns to login. Players is for nearby interactions after sign-in.

Temporary demo authentication: the owner approved disabling email confirmation to avoid the built-in confirmation-email quota. New accounts still require email and password, but address ownership is not verified. Restore confirmation with custom SMTP before public release.
