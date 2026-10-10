# ROAM — Weekend Quest Club

**Product requirements and implementation record**  
**Version:** 2.4 · **Updated:** 11 October 2026
**Hackathon:** TinkerHub LAYOVER · Kozhikode  
**Status:** Working browser demo; local-only competition simulation

> This is the current source of truth. It replaces the earlier interactive-comic and lost-postcard requirements. ROAM is now a gamified local-discovery walk. Earlier story-mode details are intentionally removed so they cannot be mistaken for shipped behavior.

## 1. Product summary

ROAM turns a short city walk into optional local discovery quests. A traveler lands on a welcome page, chooses a district, selects a Kozhikode corridor and its displayed start and finish, then hears an introduction before moving through a navigable 3D street using held demo controls or foreground GPS. The avatar walks only while movement is active and settles when the controls are released. At checkpoints, the player chooses an observation or creative task, records a specific field note, and earns points. The coast route begins at Calicut Corporation Office and offers a reconstructed civic help-desk interior where the player classifies an observed issue and saves a practice report to the local journal. ROAM does not submit reports to the Corporation. The app tracks a local journal, daily streak and sample weekly leaderboard.

The main product value is the combination of place, movement, local discovery, and a cheeky game host. Quests change the immediate activity and 3D set piece; current corridors do not branch into separate geographic routes. Merchant rewards, a live event feed, and a real-money rewards product remain future work.

## 2. Hackathon judging fit

The supplied judging rubric scores the project out of 50:

| Criterion | Points | What ROAM should make visible |
|---|---:|---|
| What was built | 20 | A working walk loop: route selection, movement, checkpoints, quest completion, points, journal, streak and leaderboard. |
| Creativity and idea | 10 | A walk becomes a playful local discovery game with a distinct sarcastic narrator, contextual audio, and a navigable 3D scene. |
| Travel connection | 10 | Kozhikode places and their local details determine the quests, route context and sound. Travel is core to play, not a decorative theme. |
| Execution | 5 | Responsive controls, reliable demo movement, accurate labels, quick startup, and a complete two-minute walkthrough. |
| Demo and experience | 5 | Judges see the 3D world move, make a meaningful quest choice, collect points, hear the narrator, and see the board update. |

The implementation should prioritize visible working behavior over planned integrations. During the pitch, distinguish the authored demo corridor from surveyed navigation, sample rivals from real players, and self-reported proof from verified check-ins.

## 3. Users and primary use case

**Primary user:** a visitor or local who wants a more playful way to explore a walkable part of Kozhikode.

**Primary use case:** choose a supported Kozhikode walk, discover local activity options across five coast stops or four market stops, earn points by completing quests along the way, and see progress on a local weekend board.

**Secondary use case:** replay the other supported corridor or return another day to extend a streak. No push notifications, compulsory purchase, penalty for stopping, or pressure to keep walking is needed for the demo.

## 4. Product principles

1. **The place drives the game.** Every quest belongs to a named local place or corridor and should reward noticing something about it. Borrow the glanceable map hierarchy of location-based games—player position, route, collectible-style landmarks and progress—while keeping ROAM’s original art, names and icons.
2. **Choices are real activities.** Offer alternatives that change the activity, scene or local detail. A choice must not require spending money.
3. **Points reward completion.** Opening a card or merely visiting a place does not grant points. Demo evidence is labelled self-reported.
4. **Sarcasm is the host’s consistent gameplay voice.** When playful teasing is enabled, checkpoint arrivals, mid-walk banter and reward reactions use original cheeky lines rather than generic praise. The jokes may poke at a player’s game choice or overconfident “hero entry”; they must not attack identity, appearance, ability, disability, community, or personal circumstances. A player can turn teasing off.
5. **Wayfinding stays trustworthy.** Jokes never change a route, hide a turn, invent a hazard, claim theft is likely, or redirect someone to a fake physical task. Directions, location permission, privacy, accessibility and safety messages stay plain and accurate.
6. **Local language is a choice.** English is the default. Malayalam is explicitly selectable. Never infer a person’s language from GPS. Malayalam jokes should be reviewed for natural phrasing and local tone.
7. **Place audio is contextual and optional.** Sound should support the route, not pretend to report a live event or a verified on-site recording.
8. **The demo is honest.** Mark approximate geography, simulation, sample leaderboard entries, generated sounds and self-reported completion clearly.

## 5. Current demo scope

### Implemented

- React/Vite browser application with a navigable Three.js 3D street scene and local authored assets.
- Three supported Kozhikode corridors with curated endpoints, an illustrated overview and foreground GPS adapter: Calicut Corporation Office → Kozhikode Beach (five stops), SM Street → Mananchira (four stops), and Kozhikode Railway Station → Mananchira via SM Street (four stops). The railway corridor is an approximate authored Demo Walk; Google Maps directions must be enabled for provider-verified street routing.
- Optional Google Maps JavaScript, Routes and Street View integration reads the browser key from the Vite `narration` mode; the key stays in the local environment file and is never committed. Live walking routes and panorama coverage still depend on Google Cloud API enablement, billing, key restrictions, network access and location coverage.
- Two local video slots are wired into the journey flow. When `public/video/roam-intro.mp4` exists, it plays after the traveler chooses a Kozhikode route and before the narrated walk introduction. When `public/video/roam-outro.mp4` exists, it plays upon arrival at the route finish before results. Missing files skip the film screen; videos autoplay muted with user controls to enable sound or skip.
- A route-specific illustrated field map with coastal and city geography, a moving player marker and checkpoint landmarks drawn as distinct pictograms rather than generic checkmarks. The railway corridor adds a station arrival facade and a station-to-market route card. The map is an authored overview, not an accurate navigation map.
- A deterministic Demo Walk with held forward/back movement and lateral steering. Avatar gait stops when movement is released. A/D or left/right arrows move the explorer across the street while Q/E or held look buttons rotate the camera continuously; pointer dragging also looks around, and Center View resets the manual angle. Camera yaw is not clamped, so the traveler can look a full 360 degrees. Google route turns contribute to camera heading. Simulated progress is labelled and is not a real-world check-in.
- Five named coast stops and four named stops on each city corridor, with contextual quest choices. A dimmed, typewritten arrival beat identifies the checkpoint; selecting a quest reveals the narrator response, then the task and completion form.
- Thirty curated quests across civic discovery, heritage, food, shopping, street observation, sound and creative challenges; eight new quests cover the station-to-SM-Street-to-Mananchira walk. The first coast stop offers a reconstructed Corporation help desk and a civic-landmark observation.
- Quest completion requires a specific written field note. The civic report also requires an issue category. It is saved as a practice draft in the local journal and is never sent to the Corporation.
- Point awards only after the required in-app completion action; each quest can be collected once per India-local calendar week.
- Daily streak, weekly score and a local leaderboard with sample rivals identified as samples.
- English/Malayalam narrator preference, preloaded local recordings for supported lines, captions, replay, global sound mute and an opt-out for teasing.
- Original sarcastic lines at checkpoint arrivals, option selection, two progress moments per walk and quest rewards. Arrival and selection reactions use animated captions; checkpoint lines are recorded in both supported narrator languages. Dialogue is original, meme-aware and does not reproduce film scripts or imitate an actor.
- Sustained-pace quips for slow walking and running, with English and Malayalam recordings. They use high-accuracy foreground GPS movement only; fast Demo Walk input is never described as the player’s real pace.
- Optional generated ambient loops for the Kozhikode coast and market corridors, plus clearly labelled Thrissur and Kannur sound previews in Settings.
- Reduced-motion setting and visible Demo Walk / approximate GPS labels.

### Supported demo routes

| Route | Start → finish | Authored length | Checkpoints and quest themes |
|---|---|---:|---|
| Coast | Calicut Corporation Office or Beach Road junction → Kozhikode Beach promenade or old piers | about 1.4 km authored corridor | Beach Road corner; old piers; food stalls; public promenade |
| Market | SM Street entrance or Court Road junction → Mananchira Square or pond | about 1.3 km authored corridor | Sweet-shop lane; Court Road; Mittai Theruvu; Mananchira |
| Station | Kozhikode Railway Station → Mananchira Square, via SM Street | about 1.6 km approximate authored corridor | SM Street entrance; sweet-shop lane; Court Road; Mananchira |

These are curated demo corridors with approximate authored coordinates. The Corporation office is the first coast checkpoint and civic quest location; its interior is a reconstructed game scene, not confirmation of public access to the real building. With Google Maps enabled, endpoint and quest choices request provider walking directions. The Three.js corridor is stylized and does not reconstruct every building in surveyed detail. Offline Demo Walk remains predictable and follows the authored route.

### Not available or not verified in this demo

- A real shared leaderboard, accounts, cross-device sync, multiplayer, anti-cheat or server-side point validation.
- Verified location check-in or merchant purchase validation. Demo Walk simulates route movement, while the player still performs the quest interaction and supplies a field note; completion remains self-reported.
- Submitting civic complaints, connecting to government services, or claiming that the reconstructed public-service interior is accessible in the real Corporation building.
- Field-verified walking routes, GPS accuracy and broad Street View coverage. Local browser checks confirmed Google Maps walking directions for the coast and market corridors and a chosen old-pier waypoint; the new railway corridor has not yet been field-verified. API authorization, billing, key restrictions and other panorama locations still depend on the Google Cloud setup. Arbitrary route planning and a surveyed Kozhikode reconstruction are not implemented.
- Dated local event listings, live festival status, bookings, current opening hours or vendor inventory.
- Merchant sponsorship, merchant portal, wallet, purchases, credit conversion, redemption or cash value.
- Arbitrary geographic route generation. With Maps configured, a selected quest becomes a real walking waypoint to the chosen finish; offline Demo Walk follows the authored corridor. The authored 3D scene reacts to turns but does not reconstruct exact street geometry.
- The two intro/outro MP4 assets are not yet supplied. Playback wiring and the production script are present; put the finished clips at the documented paths. Live AI story generation, background GPS and emergency dispatch are out of scope.

## 6. Functional requirements

### Route and movement

- **FR-01:** Show three supported Kozhikode corridor options, each with a clear start and finish. The railway option begins at Kozhikode Railway Station and reaches Mananchira through SM Street. With Maps enabled, selection recalculates the walking route; offline Demo Walk uses the authored corridor.
- **FR-02:** Allow a player to start the demo after the 3D world and narrator assets have loaded.
- **FR-03:** Offer Demo Walk without location permission. Held forward/back keyboard and touch controls change route progress; release stops movement and avatar gait. A/D or arrow keys steer the explorer laterally during Demo Walk; live GPS also maps the player’s signed cross-street offset into the 3D scene. Q/E, held camera buttons and pointer dragging change camera yaw through a full 360 degrees. Center View resets the manual angle. When Maps is configured, apply completed street turns to the 3D camera heading and recompute the walking path through a selected quest waypoint. Clearly label simulated progress and approximate geography.
- **FR-04:** On a secure origin, request foreground location only after a deliberate user action. Show permission, accuracy and off-corridor states honestly. Pause/reset/completion stops location tracking.
- **FR-05:** Keep route coordinates approximate and label them as a demo corridor. Do not present authored steps as verified turn-by-turn navigation.
- **FR-05a:** In the offline map panel, show an illustrated route overview with local context and visually distinct checkpoint landmarks. Keep the current position synchronized with route progress and label the illustration approximate. When live map tiles are enabled, retain the provider map and route attribution.
- **FR-05b:** Offer a separate Street View panel. Query an outdoor panorama only when the player requests it, at the current route position; report missing coverage and do not imply that a panorama is a live camera feed. This requires a configured Google Maps browser key, enabled APIs and billing.
- **FR-05c:** With the Google Maps key configured, show the provider’s street-by-street walking path and update the player marker as the walk advances. Offer three local corridors: Calicut Corporation Office / Beach Road junction toward Kozhikode Beach promenade / old piers; SM Street entrance / Court Road junction toward Mananchira Square / pond; and Kozhikode Railway Station toward Mananchira Square via SM Street. Label authored coordinates approximate until provider directions are loaded. The generated 3D world remains a stylized scene; it must not claim every rendered building is a surveyed replica.
- **FR-05d:** If the intro MP4 exists, play it after the traveler chooses a route and before the narrated walk introduction. If the outro MP4 exists, play it when the player reaches the selected route’s final destination, then show the score and results. Offer sound toggle and skip/continue controls; continue normally when assets are absent or fail to load.

### Quests and rewards

- **FR-06:** At each checkpoint, dim the world and type out a short arrival line before showing the eligible relevant quest options with place, category, activity, point value and completion condition. Selecting an option opens a separate, original humorous dialog, then reveals the readable task. Keep teasing opt-out functional and keep all route/safety text plain.
- **FR-07:** Each quest requires a specific written field note before it can be collected; a civic report also requires an issue category. Completing the civic flow stores a local practice draft only, with a clear no-submission disclosure. Photos may support observation quests but are optional and are not uploaded.
- **FR-08:** Award the configured quest points once per quest per Asia/Kolkata week, only after completion. No points for visiting, skipping, purchasing, or redeeming.
- **FR-09:** After completion, show the point award and a concise response from the narrator. With teasing enabled, this response is playful and sarcastic, not generic praise.
- **FR-10:** Maintain a local journal and show source links for factual place claims.

### Progress and return

- **FR-11:** Show the weekly score, local rank preview and current streak.
- **FR-12:** Define the week as Monday–Sunday in `Asia/Kolkata`. A streak day is a calendar day with one or more completed quests. Multiple quests on one day do not create extra streak days.
- **FR-13:** Clearly label other leaderboard entries as sample rivals. Local data must not be described as a real shared competition.
- **FR-14:** Let players skip a checkpoint, stop, or return later without losing already earned points.

### Narrator, language and sound

- **FR-15:** Narrator language is an explicit English or Malayalam setting, with a one-tap language control on the main screen; English remains the default. The eight quest-selection reactions and checkpoint, opening, progress and reward lines have original Malayalam versions and recorded audio. Keep captions aligned with the selected spoken line; disclose and caption any fallback.
- **FR-16:** With playful teasing enabled, play one route/checkpoint-specific quip on checkpoint arrival, short progress banter at no more than two points in a route, and a reward quip after completion. Do not overlap clips. Provide a replay control where the line is shown.
- **FR-16a:** On live GPS walks only, estimate pace from fresh, sufficiently accurate fixes. Trigger at most one slow-walk tease after sustained slow movement and at most one running tease after sustained fast movement in a walk. Do not tease when the player is stationary, GPS accuracy is poor, or the player uses accelerated Demo Walk. Do not save speed samples or a speed history.
- **FR-17:** Provide captions for spoken content, mute for voice/audio, and an independent location-sound toggle. Keep all gameplay understandable without sound.
- **FR-18:** Select a bundled ambient loop based on the active Kozhikode route. Treat Thrissur and Kannur items as preview-only until a verified route and appropriate sound source exist.
- **FR-19:** Use generated ambience only with clear disclosure. Never imply that a generated Pooram-inspired track is a live festival, authentic field recording, or specific performance.

## 7. Tone and dialogue specification

ROAM’s host is a mischievous, confident game-show companion. The humor should be sharp enough to make a nearby observer laugh without needing the entire backstory, but brief enough not to delay the walk.

### Allowed comic targets

- The player’s current in-game decision, dramatic entrance, overthinking, snack-first priorities, or photo composition.
- The game’s own absurdity, the quest writer, a fictional invisible object, or the narrator’s exaggerated confidence.
- A harmless local detail, with factual claims kept sourced and respectful.

### Disallowed comic targets

- Personal identity or protected traits; body, intelligence, disability, age, income, or social status.
- Real danger, crime claims, accusations about local people, unsafe dares, trespassing, or pressure to buy.
- False turns, deceptive physical errands, fake penalties, lost points, or instructions to keep walking when someone wants to stop.
- Unlicensed actor/celebrity voice imitation, copied film dialogue, or presenting a meme as an endorsement. Celebrity-film references can be a private tone reference; shipped dialogue must be original unless the rights are cleared.

### Writing and localization rules

- Under playful mode, avoid generic congratulations. Use a varied, authored roast or callback; never repeat one canned insult on every event.
- Keep each quip to one or two spoken sentences and roughly 3–9 seconds. Put a real instruction in a separate plain sentence if needed.
- Pace jokes are opt-in with the rest of the teasing. The slow-walk line can use the user’s tortoise joke; the running line can riff on “there is no biryani at the finish.” Keep both affectionate and add no pressure to hurry or run. Do not fire repeatedly while the same pace continues.
- Use Malayalam or light Malayalam-English code-switching only where it sounds natural to local speakers. Do not manufacture “Gen Z” or regional slang by guessing. Have a fluent local reviewer check pronunciation, grammar, register and whether the joke reads as friendly among strangers.
- Keep an opt-out. The opt-out removes teasing but not essential route, quest, accessibility or safety information.

**Examples of the intended original tone:**

- “Beach checkpoint. You arrived like the hero of a mass-entry scene. The audience is three seagulls. Pier hunt or snack-stall intel?”
- “SM Street, detective. Two shop windows and you have already activated investigation mode. Halwa clue or street-name clue?”
- “There was no invisible coconut. You discovered that the quest writer needs supervision. Your points and route are untouched.”

These are examples of style, not quotations or impressions of named film performers.

## 8. Location audio and district context

- Kozhikode Coast and SM Street have generated 10-second ambient loops selected by the active route/quest and bundled with the site for playback without a network request.
- The Thrissur preview is generated percussion inspired by Pooram instrumentation. It is not an authentic event recording, a known song, or proof that Pooram is currently taking place.
- The Kannur preview is generated coastal ambience and is not a field recording from a named beach.
- Audio is optional, low-volume, user-muteable and separate from the narrator language choice.
- To add a real district route, first verify the route/place and source/rights of the audio. Tie event audio to a verified date and location only when a reliable event source supports that claim.

## 9. UX, accessibility, privacy and safety

- Primary actions are available by touch and keyboard; visible controls support the demo without requiring precise gestures.
- Captions remain visible when muted or when audio fails. Respect reduced-motion preference and the in-app reduced-motion setting.
- Keep functional prompts, route labels, consent, terms, privacy and safety wording plain. Sarcasm must not obscure them.
- Location is used only during a foreground walk. Explain the use before asking permission, stop tracking on pause/reset/completion, and do not save location history.
- Profile, points and journal are stored in this browser only. There is no shared account or cloud sync in the current build.
- A photo quest awards points only after the player selects a valid image file and submits the quest. Keep the image in browser memory for the session; do not upload or persist the image itself. Store only a photo-proof flag with the quest event, and explain this at the upload control. Observation quests may still use a written field note without a photo.
- Encourage players to stop before interacting with the screen while walking. Do not make the app reward unsafe movement, crossing, trespassing or buying.
- Provide Privacy and Terms information in the prototype; production deployment needs a careful review of the actual data, service providers and jurisdiction before it is released publicly.

## 10. Technical implementation

### Stack

| Concern | Current implementation |
|---|---|
| UI and app | React 19, Vite 7, JavaScript modules |
| 3D world | Three.js 0.180, authored scene geometry/assets and browser WebGL |
| Route scene and movement | Shared route progress state; simulated forward/back and lateral controls, continuous camera yaw controls and browser foreground Geolocation API. Avatar limb animation follows held Demo Walk controls or movement inferred from fresh GPS fixes; it is not eye tracking. |
| Map and Street View | Google Maps JavaScript walking routes through selected quest waypoints and on-demand Street View panorama; the local key is loaded with Vite narration mode. Verified in the local browser for the Calicut Corporation Office → Kozhikode Beach corridor, a selected old-pier quest waypoint, and the SM Street → Mananchira route. API authorization and billing depend on the Google Cloud setup; panorama coverage varies by position. Offline illustrated map and authored 3D detour scene remain available as fallback. |
| Data | Curated local JavaScript data modules; no application server or database |
| Persistence | Browser `localStorage` for player name, quest events, points, streak inputs and preferences |
| Narration | Pre-generated ElevenLabs voice clips and measured caption timings bundled under `public/audio`, including eight activity-selection responses; generation script reads private `.env.narration.local` only on the developer machine |
| Ambience | Pre-generated sound loops and manifest bundled under `public/audio/ambience` |
| Delivery | Local Vite development/preview or static HTTPS hosting. HTTPS is required for browser GPS outside localhost. |

### Optional Google Maps setup

1. In the Google Cloud project, enable billing plus the **Maps JavaScript API** and **Routes API**. ROAM imports the Routes library through Maps JavaScript; the interactive Street View viewer uses the Maps JavaScript Street View library. Places and Street View Static APIs are not used by this implementation.
2. Create a browser key with website/referrer restrictions for the local preview and dev server (`http://localhost:4173/*` and `http://localhost:5173/*`; add any actual demo origin). Restrict that key to the Maps JavaScript API and Routes API.
3. Save the key locally as `VITE_GOOGLE_MAPS_KEY=...` in `roam-app/.env.local`. Keep that ignored file out of chat and source control, and restart the Vite server after saving it. A browser key is visible to the browser, so the HTTP referrer and API restrictions are essential.
4. Test each selected waypoint and Street View coverage. A Street View panorama may not exist at a given route position; the app should keep the authored 3D scene and illustrated map usable. Google usage can incur billing; Street View panorama display is a separate billable Maps usage category, so it is requested only when the player taps the Street View control.

### Source ownership

- `src/QuestApp.jsx`: active player flow, app state, audio playback, settings, quest completion, local persistence and panels.
- `src/World.jsx`: Three.js world, camera, scene reactions and progress-based motion.
- `src/MapPanel.jsx`: illustrated offline field map, local landmark pictograms, progress marker, optional live route map and on-demand Street View panorama.
- `script.md`: 30-second Gemini Omni Flash intro/outro scene scripts, narration, visual direction, sound guidance and export steps. The completed clips belong in `public/video/roam-intro.mp4` and `public/video/roam-outro.mp4`.
- `src/quests.js`: supported corridors, quest catalogue, point rules, local week/streak/leaderboard helpers, district sound profiles and factual place sources.
- `src/story.js`: supported route metadata and narrator text, including English/Malayalam lines. The old story graph remains unused reference material where noted in source.
- `scripts/elevenlabs-narration.mjs`: generation-time audio creation, timed captions and manifest updates. It must never put the private API key in browser code or `VITE_` variables.
- `scripts/elevenlabs-soundscapes.mjs`: generation-time ambient sound creation. Generated assets are checked into/bundled with the local app build.

### Data flow

1. Load the local quest/player state and route manifest.
2. Preload the current narrator recordings and local sound assets; do not start the walk before the 3D view and narrator loading state resolve.
3. Convert simulated input or a valid foreground location fix into one route progress value. Keep transient pace samples in memory only while a live walk is active.
4. Use route progress for the 3D scene, illustrated map position, route marker, checkpoint threshold and distance display. Use quality-gated live GPS samples for pace quips; simulation is excluded.
5. At a checkpoint, animate the arrival line, show the eligible quests, and play/type an original selection reaction before the task. The selection changes the authored 3D detour. With a configured Maps key, compute a walking route from the current player position through the selected quest waypoint to the corridor finish; show current turn instructions and move the map with the player. The stylized 3D view previews a turn cue from the route maneuver; it is not a surveyed building-by-building city model.
6. On explicit completion, write one local event, compute the score/streak and show the reward response.
7. The journal and local leaderboard derive from those local events. No browser-submitted score is authoritative for a real competition.

## 11. Demo acceptance and two-minute run

### Must be true before presenting

- Production build succeeds and the page cold-opens in the chosen browser.
- Demo Walk advances the 3D camera and route indicator through all three authored routes without GPS or a Maps key. Narration and scene assets are bundled; network is needed only for live Maps and Street View.
- The coast route opens at Calicut Corporation Office and completes across five named stops; both city routes have four stops. The station route begins at Kozhikode Railway Station, passes SM Street and finishes at Mananchira. Each checkpoint has contextual quest choices; points appear only after the required written task and cannot be duplicated during the same week.
- The opening, checkpoint quip, progress banter and reward cue play without overlap; the caption remains visible; English and Malayalam settings select their supported clips.
- Sound previews and generated provenance labels are visible in Settings. Mute, teasing opt-out and reduced motion work.
- The local score, streak and sample leaderboard label are understandable; the current demo score persists after reload.
- GPS denial or failure leaves a usable Demo Walk. GPS is described as approximate and is not represented as a verified vendor visit.
- The illustrated map shows named local context and every checkpoint marker; its moving player marker follows route progress, while camera look persists and Google walking maneuvers steer the scene. Arrival and option dialogs type in, and the task stays hidden until the player advances. On a field walk, slow and fast pace quips trigger only after sustained, accuracy-gated thresholds; pausing or using Demo Walk triggers neither.
- The civic quest enters a visible reconstructed help-desk scene, saves an issue category and written practice report to the journal, awards points once, and clearly states that the report was not submitted and building access is unconfirmed.
- Maps and Street View controls explain missing configuration/coverage honestly; never present the authored 3D illustration as Google Street View.

### Two-minute judge journey

| Time | Show |
|---|---|
| 0:00–0:15 | Introduce ROAM as a local discovery quest game; select a Kozhikode route and start. |
| 0:15–0:35 | Show the narrated 3D street, captions, sound, and route movement. Use Demo Walk for predictable judging. |
| 0:35–0:55 | Reach the first checkpoint; play the sarcastic arrival quip; compare two local quest choices. |
| 0:55–1:20 | Enter the reconstructed civic desk, select an observed issue, write a practice report, and show the point award and journal entry. |
| 1:20–1:45 | Reach the next checkpoint, show the route-specific line, complete the second activity and let points/streak update. |
| 1:45–2:00 | Open the weekend board; call out sample rivals/local-only scoring and mention merchant rewards/live competition as later work. |

Keep a shorter 45–60 second version ready. Avoid spending live demo time on settings or future integrations unless a judge asks.

## 12. Build status and next work

**Current state:** The landing page leads into a district picker and then a route picker. Kozhikode is the only playable district in this demo; additional districts are clearly marked as forthcoming. The landing page has one primary action, “Take the scenic route,” and no “no local knowledge required” promo card. Route choices explain the stops and activities. The app has three Kozhikode corridors: five coast checkpoints from Calicut Corporation Office, four market checkpoints, and four checkpoints from Kozhikode Railway Station through SM Street to Mananchira, with 30 local quests. The station corridor has original English and Malayalam ElevenLabs opening narration; its offline geometry is labelled approximate. The civic quest includes a reconstructed help desk, issue selection and a journal-only practice report. Normal Demo Walk remains held-to-walk; an explicit 4× Auto Walk advances to each checkpoint and pauses for the player's choice, making the route practical to show in a short judging slot. The avatar uses separate shoulder, elbow, hip and knee joints, visible hands and shoes, opposing arm/leg swing, knee flex, a restrained body bob and a station-route explorer outfit; the camera and gait respond to the faster demo pace. Live GPS movement drives the gait only while fresh, accurate fixes show that the player is walking; this is location tracking, not gaze control. The indoor quest camera centers the service counter, and its task card sits at the left so the scene remains visible. The offline Demo Walk has full-circle camera look, drag and hold-to-rotate controls, keyboard/touch lateral steering in Demo Walk, GPS cross-street avatar movement, an authored Three.js streetscape and checkpoint beacons. Local-browser checks confirmed the first checkpoint opens at the Corporation Office, the indoor service-board scene appears, and Google walking directions loaded through the selected quest waypoint. The revised original Malayalam narration/captions are bundled; the narrator now defaults to Malayalam for existing players during a one-time preference update, with a visible English/Malayalam toggle. Checkpoint captions type by Malayalam grapheme so combined letters do not flash in broken pieces. A live browser smoke check verified the welcome → district → route → intro → first checkpoint flow and confirmed the Three.js scene mounts without a renderer error. Visual quality remains an authored Three.js scene, not an Unreal Engine render or a surveyed city model. Field GPS accuracy, route safety and panorama coverage away from tested areas remain unverified. Intro/outro playback is implemented; the MP4 files remain to be added.

**Highest-priority polish:**

1. Run a fresh demo from reset on the target device; check all three routes, all five coast and four-stop city checkpoints, endpoint choices, held movement, the GPS-driven gait on a field walk, camera controls, quest reveal timing, the civic interior, bilingual recordings, captions and sound transitions.
2. Confirm the Maps key’s HTTP referrer and API restrictions, then field-check routes and Street View coverage at featured Kozhikode locations before using this as real-world navigation.
3. Generate and add both 30-second MP4 films using [script.md](../roam-app/script.md); test launch, skip, audio toggle, finish trigger and results handoff.
4. Have a Malayalam speaker review every localized line and recorded pronunciation; revise and regenerate any awkward lines.
5. Tighten the two-minute presenter path and confirm screen readability at the actual demo display size.
6. If a public online build is needed, deploy to HTTPS, verify attribution and check browser location behavior before describing it as live navigation.

**Later product phases:**

- Verified route building and geofenced arrivals using a routing/place provider, with on-site route validation.
- Real accounts and a shared weekly leaderboard with server-authoritative points, abuse limits and a clear privacy model.
- Verified event listings and locally sourced/appropriately licensed district ambience.
- Transparent merchant-partner quests and consent-based check-in/purchase verification.
- Opt-in nearby-player interaction. Start with ephemeral text chat in a shared walk session; match only using coarse proximity while both players have explicitly enabled it. Voice requires a second explicit accept and a secure WebRTC signaling service. Keep precise coordinates on-device, stop sharing when the walk ends, and provide mute, block and report controls. This feature requires an HTTPS deployment and a real-time backend; do not display fake nearby players in the single-player demo.
- A rewards wallet only after legal, tax, fraud, refund and stored-value requirements are reviewed. Points in the current app have no monetary value.

## 13. Risks and mitigations

| Risk | Mitigation |
|---|---|
| A local demo route or visual steer is mistaken for safe, precise turn-by-turn directions | Label approximate routes and visual demo steering; field-check any route before live use; retain the simulation path. |
| Google Maps key is missing, restricted incorrectly, or Street View has no local panorama | Keep the offline app functional, show a clear fallback, restrict the browser key by origin and API, enable billing/required APIs, and test every route point. Load panoramas only on explicit request; usage may incur billing. |
| Google Street View photography is mistaken for ROAM’s stylized 3D art or a live camera | Keep the authored 3D game view primary and label the optional Google panorama as Street View imagery, with provider attribution. |
| Judges think sample scores are real competition | Label every sample rival and local-only score wherever the board appears. |
| Teasing reads as bullying or sounds hostile to a stranger | Target choices and fictional game situations; keep it opt-in, original, reviewed and brief; avoid slurs, identity attacks and repeated humiliation. |
| A joke distracts from a real instruction | Separate the quip from plain route, consent and safety text; never hide a direction inside the joke. |
| Malayalam localization feels forced or inaccurate | Explicit user selection, native-speaker review, easy English fallback and corrections before recording. |
| A generated district track is mistaken for authentic or live event sound | Label it generated and preview-only; never tie it to live-event status without verification. |
| GPS is inaccurate or unavailable | Use Demo Walk as the reliable judging path and show an honest location error state. |
| GPS noise causes an unfair pace tease | Require accurate fresh fixes, sustained motion and a one-time per-walk threshold; do not estimate pace in simulation or during a stationary pause. |
| Audio is blocked or slow | Preload bundled assets, wait before starting, expose captions/replay and preserve the visual task flow. |
| Local data is cleared or unavailable | Explain device-local persistence; do not promise an account backup or real leaderboard. |
| Business features overshadow travel and working demo | Keep merchant rewards, wallet and event integrations out of the current judge path. |

## 14. Place sources

- [Kozhikode Beach — Kozhikode District Administration](https://kozhikode.nic.in/en/tourist-place/kozhikode-beach/)
- [SM Street — Kerala Tourism](https://www.keralatourism.org/destination/sm-street-kozhikode/252/)
- [Mananchira Square — Kerala Tourism](https://www.keralatourism.org/destination/mananchira-square-kozhikode/273/)
- [Kozhikode transportation — Kozhikode District Administration](https://kozhikode.nic.in/en/tourism/transportation/)
- [SM Street — DTPC Kozhikode, including railway-station distance](https://www.dtpckozhikode.com/destination/mittayitheruvu-sm-street)
- [TinkerHub LAYOVER event listing](https://tinkerhub.org/events/X4ZCHA80D8/layover)
- [Routes library setup](https://developers.google.com/maps/documentation/javascript/routes/start)
- [Maps JavaScript API Street View](https://developers.google.com/maps/documentation/javascript/streetview)
- [Google Maps API key security guidance](https://developers.google.com/maps/api-security-best-practices)

Place sources support factual discovery copy; they do not verify current opening hours, individual vendors, live events, exact route geometry or commercial partnerships.

## Movement and route dialogue update (11 October 2026)

- Demo movement uses route-scaled pacing: approximately 30 seconds of manual movement or 18 seconds of auto walk per full corridor, excluding task interactions. Checkpoints still pause movement.
- Hold W/Up to move forward, S/Down to reverse, A/D to move sideways. Touch controls move diagonally; drag or Q/E changes the camera. Sideways displacement persists in the 3D view and illustrated map.
- All three routes use bundled Malayalam intro, checkpoint, selection and reward narration. The railway route uses checkpoint recordings in the correct SM Street, sweet lane, Court Road and Mananchira order. Task panels retain the dialogue and a replay action.
- Pedestrians walk with arm and leg cycles, auto-rickshaws circulate, and dynamic shadows refresh at a limited rate. Reduced motion suppresses ambient animation.
- Live route mode projects accepted foreground GPS fixes onto the selected Kozhikode corridor. Tracking restarts after a completed quest, and stops on pause/reset/completion.
- Walk Here is a separate, explicitly labelled location preview for testing away from Kozhikode: actual GPS displacement moves the authored scene. The first accepted walking direction defines forward; subsequent displacement allows forward, backward and sideways movement. Preview journal entries use gps-preview, not verified visits.
- Reject stale fixes, accuracy worse than 45 metres, and implausible position jumps. Ignore small location noise; return the character to idle after four seconds without a new movement update.
- Phone testing requires HTTPS and location permission. Laptop location may be too coarse for short walks. Physical outdoor accuracy and latency must be checked on the actual demo phone before claiming verified live performance.

## Narrator revision and HTTPS deployment (11 October 2026)

The active English and Malayalam narrator scripts are centralized in src/dialogue.js. Use short spoken reactions tied to the player's immediate choice. Remove translated corporate metaphors, constant detective framing, generic congratulations, and repetitive bro/slang tags. Original dialogue uses comic timing and callbacks; never label an old meme as a verified current trend. Functional tasks, access warnings and GPS consent stay plain. Regenerate ElevenLabs recordings and measured captions whenever text changes; asset tests reject mismatched recordings.

The deployable app root is roam-app, using React, Vite and Three.js. Vercel builds with npm run build and serves dist over HTTPS. Keep ElevenLabs keys local: recordings are generated before publishing, and only the static audio files ship. The restricted public Google Maps browser key is configured separately in Vercel as VITE_GOOGLE_MAPS_KEY. Repository visibility is private; .env files, .vercel account metadata, node_modules and dist are excluded from Git.
