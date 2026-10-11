# ROAM build status · quest pivot, 11 October 2026

Active interface: `src/QuestApp.jsx`. Previous story mode is retained as a reference.

Current build: thirty local-discovery quests across three Kozhikode corridors: five coast checkpoints, four SM Street-to-Mananchira checkpoints, and four station-to-Mananchira checkpoints. The station route has new bilingual ElevenLabs opening narration and a visible railway facade. The explorer has separate shoulder/elbow/hip/knee joints, hand and foot articulation, opposing arm and leg movement, a restrained step bounce, and movement-gated live-GPS gait. A Blender-exported cafe model now appears in every streetscape; the rest is a stylized authored Three.js world, not an Unreal Engine scene or surveyed city model. Coast, market and station routes all retain local points, streak, journal, sample leaderboard and contextual quests.

ElevenLabs generation succeeded for the story library and three short quest cues. The private key remains outside browser code. New active playback uses the two openings and quest cues; story narration is no longer imposed at every stop.

Verification before the latest route expansion: production build and automated checks passed. Latest verification: 33 automated tests pass and the production build succeeds, including the railway route through all four checkpoint and quest-choice stages. Browser verification confirmed a completed coastal walk, 260 saved points, a one-day streak, rank movement, the optional gag preserving score/location, and persistence after reload. Phone-size layout was inspected at 390 × 844. Voice files decode successfully; subjective delivery remains for the user to audition.

Limits: local demo scores, sample competitors, self-reported proof, approximate corridors, paired endpoint selection. No shared backend, anti-fraud check-in, verified events, arbitrary routing, merchant rewards, rendered intro video or surveyed city reproduction. Physical phone GPS remains untested. Live movement now uses accurate foreground location fixes to animate only when the device is moving; actual GPS quality is not yet field-tested.

## Narrator and sound update · 11 October 2026

Added the explicit English/Malayalam narrator preference, five new Malayalam voice clips, four bilingual sarcastic mid-walk and reward cues, automatically selected Kozhikode surf/market ambience, and labelled Thrissur/Kannur sound previews. Used ElevenLabs sound generation for two current-route loops and two preview-only district tracks. Audio is bundled and plays offline. The Thrissur audio is inspired by Pooram instrumentation, not a recording of the event. Settings clearly distinguish the extra district previews from routes in this build.

## Checkpoint narrator update · 11 October 2026

Added eight route/checkpoint-specific arrival lines in English and Malayalam, plus matching pre-recorded voice clips, captions and replay controls. The line plays when the player reaches a checkpoint while teasing is enabled. Dialogue is original and uses broad comic “mass entry” framing; it does not imitate a named actor or quote a film. Updated `outputs/ROAM-PRD.md` to make the current quest app the source of truth and to separate implemented behavior from future plans. Production build succeeds after the change. A fresh device/browser walk-through and local Malayalam review remain to be done.

## Illustrated map and pace banter · 11 October 2026

Replaced the basic offline route sketch with a route-specific illustrated field map. It shows the coast or market street context, checkpoint pictograms and a player marker moving along the demo route. Added four bilingual pace clips. A sustained, quality-gated foreground GPS pace can trigger one slow-walk tease or one running tease per walk; Demo Walk speed and stationary pauses never trigger them. Pace is transient and not saved. Added captions during these spoken moments. Updated the PRD and README to reflect these behaviors and the map's approximate, non-navigation status. Production build succeeds; a physical GPS pace test and fluent Malayalam review remain outstanding.

## Four-stop routes and 3D game pass · 11 October 2026

Expanded both Kozhikode walks to four named checkpoints with two or more quest choices per stop, curated start/finish choices, Google route recalculation through selected quest destinations, and English/Malayalam checkpoint voice recordings. Added denser street façades, lit collectible-style checkpoint beacons, a visible moving explorer who bobs and turns with route cues, a launch leaderboard panel, and a navy / warm-paper / vermilion visual palette. The local browser verified a Google route through the selected old-pier quest. All 26 automated checks and the production build pass. Authored 3D geometry remains a stylized reconstruction; field route safety and live GPS remain unverified.

## Movement, checkpoint and Malayalam follow-up

Fixed camera controls that previously reset on release; left/right taps, A/D and arrow keys now preserve the chosen view angle, Center View clears only the manual offset, and drag-look works on the 3D canvas. The 3D camera now consumes cumulative Google walking turns. Repositioned and scaled the explorer, added visible stop-number/name beacons, and pulsed the active stop. Added eight original Malayalam quest-reaction scripts and matching recorded ElevenLabs clips; the typewritten captions and voice follow the selected language, exposed through a one-tap EN/ML control. Browser verification reached checkpoint 1, displayed its Malayalam checkpoint narration and quest choices, then displayed the Malayalam quest reaction and matching task. All 27 automated tests and production build pass. Full device field-walk validation and fluent-speaker review remain outstanding.


## Three-route, articulated movement update · 11 October 2026

Added the station-to-SM-Street-to-Mananchira route, eight new locally contextual quests, a route-specific bilingual opening, and clear approximate-route framing. The player now has independently animated hips, knees, shoulders, elbows, hands and boots, plus a small step bounce and idle settle. Foreground GPS motion now drives the same gait when the player is moving; camera/keyboard input remains a demo control. Added a railway facade and placed the existing Blender cafe model into all route scenes for a stronger rendered landmark. Updated the PRD and README. All 33 tests pass and Vite builds. The new route’s provider directions and outdoor GPS behavior still need a field check.

## Walk Here distance, chase camera and badges · 11 October 2026

Walk Here (real GPS, authored world) now moves the explorer one metre through the 3D scene for every real metre walked, in any compass direction, so GPS jitter can no longer push the player backwards or sideways. The HUD shows real metres to the next stop and total metres walked; progress glides between fixes. While walking, the camera is a third-person chase camera that orbits the explorer, so the character stays in frame through look/drag turns and quest detours; a ground halo and a smaller name tag mark the player. Added twelve local badges derived from the journal and live GPS distance (`src/badges.js`), a BADGES screen, and an unlock toast. Badges never change points or the board. 52 automated tests pass and the production build succeeds. Walk Here was verified in the browser with simulated GPS fixes; a real outdoor phone walk is still outstanding.

## Real-time Walk Here motion · 11 October 2026

Walk Here now moves the explorer every animation frame instead of once per GPS fix. The phone's motion sensor detects each step, so the explorer starts and stops with the player within about a second; between fixes it glides at the measured walking pace and never runs more than a few metres ahead of GPS-confirmed distance. Without a motion sensor it trails GPS smoothly at the measured pace. Leg cadence follows the real pace. The status line shows STEP SENSOR ON / READY / GPS ONLY. Logic lives in `src/live-motion.js` with simulated-walk tests; 59 tests pass and the build succeeds. Browser-verified with simulated GPS and accelerometer input; a real outdoor phone walk is still the final check.
