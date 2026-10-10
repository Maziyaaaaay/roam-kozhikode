# ROAM — 30-second opening and closing films

These films frame the Kozhikode quest walk. They should feel like short scenes from one animated adventure, not app adverts. Keep the same original traveler, color language, camera grammar, and narrator voice in both. Use the supplied Kozhikode beach reference image for coast, road, palms, and light. Do not copy any existing film character, studio character, actor likeness, or recognizable franchise design.

## Production facts and geography

The app has two playable Kozhikode demo corridors:

- Calicut Corporation Office → Kozhikode Beach, labeled Beach Road.
- SM Street entrance → Mananchira Square, using the SM Street / Sweet Meat Street market area.

The film can establish both corridors as real-world choices, but generated backgrounds are stylized interpretations. Do not claim generated frames are exact surveyed street geometry, a live Google Street View capture, a verified turn-by-turn route, or an exact shop facade. The app can request live Google walking directions when the browser key and required Maps APIs are available. Route coverage can vary.

## Shared visual direction

Create a premium, handcrafted 3D animated feature look: cinematic perspective, expressive but grounded character animation, sculpted tropical foliage, warm Kerala coastal light, believable materials, rich depth, subtle atmospheric haze, appealing color design, and smooth deliberate camera movement. The art should feel original and carefully made, with small environmental details. Keep street scale, palms, shop fronts, shoreline, and traffic plausible for Kozhikode. Use 16:9 landscape, 24 fps, 1080p if available, stable character proportions, and clean compositions that leave the upper-left and lower-right areas free for app captions and controls.

Avoid blocky voxel geometry, photorealistic Street View, generic futuristic cities, neon, oversaturated gradients, floating symbols, interface text, logos, watermarks, warped signs, garbled lettering, copyrighted characters, and recognizable celebrity likenesses. Do not render the ROAM wordmark or important text into the video. The app adds its own title and captions.

### Traveler continuity

An original young adult traveler, seen mostly from behind or in three-quarter view, wearing a deep teal overshirt, ochre daypack, dark trousers, and practical walking shoes. Friendly, curious body language; no exaggerated mascot proportions. Match the traveler consistently across every generated shot. Avoid close-up facial identity changes.

### Narrator continuity

One warm, conversational English storyteller with dry, affectionate wit. Delivery is lively and intimate, like a friend walking beside the player. Never robotic, announcer-like, mean, or imitative of a named actor. Generate the spoken lines exactly as supplied; do not add extra words. Native generated audio is welcome, but preserve the exact dialogue and keep the voice clear over a restrained location soundscape. If the video model cannot keep wording exact, generate picture and ambience only; record the supplied voiceover separately and mix it during assembly.

## Film 1 — Opening: “The city has side quests”

**Duration:** 30 seconds exactly after editing.  
**Purpose:** Welcome the player, establish Kozhikode as the game board, preview route choice and local discovery, then hand off cleanly to the app’s route picker.  
**Voice:** Same narrator used in the app.  
**Music:** Original light percussion and warm strings, restrained under speech; no recognizable song.

### Shot and voiceover timeline

| Time | Picture and camera | Narration / sound |
|---|---|---|
| 0:00–0:04 | Dawn-to-golden-hour transition over the Kozhikode shoreline. Camera glides above the sea and descends toward Beach Road. Palm leaves move in the sea breeze; waves catch the light. | **VO:** “Kozhikode looks like a city. That is your first mistake.” **SFX:** soft surf, distant gulls, gentle traffic. |
| 0:04–0:09 | Follow the traveler from behind along the public beach promenade, then reveal the old piers in the distance. Keep shoreline and road legible as distinct places. Slow, low forward dolly. | **VO:** “It is a collection of excellent detours pretending to be a city.” |
| 0:09–0:15 | Match cut to the busy SM Street / Sweet Meat Street market area: colorful shopfronts, a halwa display glimpsed through a window, pedestrians moving naturally. No legible invented sign text. Camera tracks at walking pace. | **VO:** “One turn finds the sea. Another finds halwa. Suddenly, your plan has become much more interesting.” **SFX:** market murmur, bicycle bell, paper wrapping. |
| 0:15–0:21 | A graceful illustrated route line appears briefly over the street perspective, splitting toward the coast and market, then resolves into two small quest markers in the scene. The traveler looks between them and chooses with a playful shrug. | **VO:** “Pick a path. Spot the detail. Take the points. And try not to get emotionally attached to the leaderboard.” **SFX:** two soft discovery chimes. |
| 0:21–0:26 | Camera follows the traveler around a street corner; the view opens toward Mananchira Square, then quick match cut to the beach. Show the game spans more than one street and one kind of place. | **VO:** “Your walk moves through the city. Your choices decide what you notice.” |
| 0:26–0:30 | The traveler pauses at a sunlit junction. Leave clear negative space for the app’s own title overlay. Camera settles, breeze moves clothing and leaves. End on a clean frame that can cut to the route picker. | **VO:** “Come on, explorer. The city has been waiting for someone to notice.” **SFX:** music resolves; soft footstep and one warm chime. |

### Generation workflow for the opening

Google’s current Gemini Omni Flash generation supports short clips from 3 to 10 seconds, 24 fps, and generates video with audio. Generate four adjoining clips of about 8 seconds each for 0–8, 8–16, 16–24, and 24–32 seconds. Reuse the same traveler image and style reference in every generation; continue each clip from the previous clip or use a matching final/first frame when the interface supports it. Generate without baked captions or titles. Assemble the clips, trim the film to exactly 30 seconds, verify the exact narration, and add captions. Use gentle match cuts or short dissolves only where needed to hide continuity changes. Omni’s conversational editing can refine continuity or repair a specific shot while preserving the rest of the generated clip.

**Master prompt for each opening clip:**  
Create an original, cinematic 3D animated feature scene in Kozhikode, Kerala, India, using the attached coastal reference image for place and lighting inspiration. Premium handcrafted animated-film craft, rich but believable materials, warm tropical sunlight, deep perspective, expressive environmental animation, natural pedestrian scale, smooth stabilized camera, realistic street motion, calm readable composition. Preserve the same original traveler from the supplied character reference: young adult, deep teal overshirt, ochre daypack, dark trousers, practical walking shoes. [INSERT THE TIMED SHOT DESCRIPTION]. Audio: [INSERT ONLY THE AMBIENCE AND SFX FOR THIS CLIP]. No logos, no UI, no subtitles, no text, no invented readable signs, no famous characters or celebrity likenesses. Keep visual continuity with the other shots in this sequence.

**Voice track:** Use the exact voiceover lines in the timeline in order. Do not let the model paraphrase. Keep the voice close, warm, wry, and clearly intelligible. Captions should be added in the editor or app, not generated inside the picture.

## Film 2 — Closing: “You found your way”

**Duration:** 30 seconds exactly after editing.  
**Purpose:** Make the destination feel earned, acknowledge the player’s actual points, streak, and route in the app after the film ends, and leave a satisfying invitation to return. The video itself must work for either supported route; the app shows route-specific destination and score on its results screen.

### Shot and voiceover timeline

| Time | Picture and camera | Narration / sound |
|---|---|---|
| 0:00–0:05 | Continue with the same traveler and light. The traveler arrives at the selected route’s public endpoint. Frame a Kozhikode coastal horizon and promenade, with a subtle visual echo of the city route. Do not show unsafe structures or imply access to restricted areas. | **VO:** “And there you are. The map says you arrived. Your shoes have submitted a formal complaint.” **SFX:** footsteps stop, soft surf or city ambience according to the shot. |
| 0:05–0:11 | Close detail of a notebook or phone held safely at rest, showing only abstract unlettered quest marks and collected tokens. No readable fabricated UI. Camera eases up to the traveler looking back at the route. | **VO:** “You followed a few clues, took a couple of detours, and noticed things most people walk right past.” |
| 0:11–0:17 | A lyrical memory montage: old pier silhouette, a Kozhikode halwa shop window, a Mananchira water reflection, and a lively street corner. Each lasts about one second, with natural cinematic transitions. | **VO:** “The piers. The halwa. That corner you nearly missed. Look at you, collecting a city.” **SFX:** gentle waves, a paper parcel, distant street murmur. |
| 0:17–0:23 | The traveler watches evening light over the coast or square. Tiny quest marks lift from the route and settle into a small journal motif. No leaderboard names or scores are baked into the scene. | **VO:** “Your points are saved. Your next streak is entirely your responsibility. I have done my part.” **SFX:** restrained reward chime, music opens slightly. |
| 0:23–0:27 | The traveler turns toward another inviting street and starts walking. Camera drifts backward, revealing that the city continues beyond this walk. | **VO:** “There is always another street with a suspiciously interesting snack.” |
| 0:27–0:30 | Calm wide frame with open space for the app’s own closing title. Hold the final image for a seamless fade to the app results screen. | **VO:** “See you on the next detour.” **SFX:** warm music resolve, one soft footstep. |

### Generation workflow for the closing

Generate four matching clips of about 8 seconds each in Gemini Omni Flash, then edit to exactly 30 seconds. Reuse the same traveler and visual references from the opening. For the 0:00–0:05 arrival, make two framing variants if needed: one facing the coast and one facing a leafy public square. The app’s ending card provides the precise route destination and actual score, so keep the film’s ending generic enough to fit both. Omni generates audio with video; still review every spoken line. If the model changes wording, replace the voice track with the exact supplied lines and mix it clearly above the ambient bed.

**Master prompt for each closing clip:**  
Continue the same original Kozhikode animated city adventure and same traveler shown in the supplied reference frames. Preserve clothing, scale, lighting direction, materials, color treatment, and camera movement. Premium handcrafted cinematic 3D animation, emotionally satisfying but understated, warm coastal Kerala evening light, believable public streets, smooth camera and natural environmental motion. [INSERT THE TIMED SHOT DESCRIPTION]. Audio: [INSERT ONLY THE AMBIENCE AND SFX FOR THIS CLIP]. Leave uncluttered picture space for application captions. No baked title, no readable text, no logos, no score, no fabricated business or route claim, no famous character or celebrity likeness.

## Captions and sound mix

- Burn captions into the final MP4 only after reviewing the exact transcription. Use sentence case, two lines maximum, high contrast, and safe margins. The app should also show captions for accessibility when the supplied video has dialogue.
- Keep narration intelligible on laptop speakers. Target dialogue around −16 LUFS integrated and keep true peak below −1 dBTP; duck music under speech by roughly 5–7 dB. Avoid sudden loud transitions.
- Make a sound-off viewing pass. The story should remain understandable from the images and app captions.
- Do not use an existing film score, copyrighted character voice, movie quotation, celebrity impression, or shop logo without permission.

## Delivery checklist for the app

Export both videos as 16:9 H.264 MP4, preferably 1080p, with stereo AAC audio. Keep each file at 30 seconds. Name and place them exactly as follows:

- roam-app/public/video/roam-intro.mp4
- roam-app/public/video/roam-outro.mp4

The website checks for those two files automatically. With the opening present, it plays on app launch and then opens route selection. The closing starts when the player reaches the final destination and proceeds to the results screen when playback ends. Both include an enable-sound control and a skip or continue action because browsers may block unmuted autoplay.
