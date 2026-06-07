# Word Card Slideshow

## Goal

Add a word-card slideshow mode to the ABC learning mini program so a learner can open any word as a focused full-screen card, hear the word, and continuously browse visible words across letters without leaving the learning page.

## What I Already Know

* The project is a Taro 3.6 + React 18 + TypeScript + SCSS WeChat mini program.
* The main page is `src/pages/index/index.tsx`; styles are in `src/pages/index/index.scss`.
* Current word cards use single tap to call `playAudio`, which delegates to `AudioManager`.
* Current custom and extra word cards already use long press for delete / deselect behavior, so slideshow entry should not reuse long press.
* The chosen interaction is scheme 1: keep card-body tap for pronunciation and add a top-right fullscreen/expand icon on each word card to enter slideshow mode.
* Current letter switching uses custom horizontal touch handling on the main card, so slideshow gestures must be isolated from letter-page gestures.

## Requirements

* Each rendered word card has a small top-right slideshow/expand affordance.
* Tapping the word card body keeps the existing pronunciation behavior.
* Tapping the slideshow affordance opens a full-screen overlay showing the selected word card.
* The overlay starts at the exact word that was opened.
* The slideshow starts from the current letter's visible word list and follows the visible list order: default words, custom words, then selected extra words.
* The overlay shows the word icon/image, word text, phonetic text when available, a close button in the top-right, and a lightweight position indicator.
* Tapping the large slideshow card or word text plays the current word using the existing slow-mode setting.
* Horizontal swipe in slideshow changes the current word without letting the underlying letter-page gesture handler also run.
* Swiping left advances to the next word; swiping right goes back to the previous word.
* Swiping left from the last word of a letter moves to the next letter's first visible word.
* Swiping right from the first word of a letter moves to the previous letter's last visible word.
* Slideshow only uses boundary rebound at the global start/end where no adjacent word exists.
* Closing the overlay returns to the letter page for the word currently displayed in slideshow.
* The feature should not add runtime dependencies.

## Open Questions

* None.

## Acceptance Criteria

* [ ] Default, custom, and selected extra word cards can open slideshow from a top-right icon.
* [ ] Existing word-card tap pronunciation remains unchanged.
* [ ] Existing long-press delete / deselect behavior remains unchanged for custom and extra words.
* [ ] Slideshow opens on the selected word and displays the right icon/image, word, and phonetic.
* [ ] Slideshow tap pronunciation uses the same audio path and slow-mode behavior as normal cards.
* [ ] Slideshow left swipe changes words in visible order and can advance from one letter's last word to the next letter's first word.
* [ ] Slideshow right swipe can go backward from one letter's first word to the previous letter's last word.
* [ ] Closing slideshow after cross-letter navigation returns to the letter list containing the currently displayed word.
* [ ] Slideshow swiping at the global first/last available word does not loop and gives a boundary rebound.
* [ ] Slideshow gestures do not trigger the main letter-page swipe.
* [ ] Project type-check or build passes with available local commands.

## Definition of Done

* Code changes are limited to the main page interaction and styles unless verification reveals a necessary helper extraction.
* No new runtime dependency is introduced.
* Type-check/build is run with an available project command.
* Trellis/spec documentation is reviewed for whether a new project convention needs to be recorded.

## Technical Approach

Add local slideshow state to the existing class component: visibility, current letter/page index, current word index, card transform/style, and slideshow-specific touch tracking. Build a normalized word-card view model for any letter page so default, custom, and extra words can share the same card rendering and slideshow rendering path.

Render a fullscreen overlay inside `src/pages/index/index.tsx` when slideshow is visible. Stop event propagation on the overlay touch handlers so the page-level letter swipe logic does not receive slideshow gestures. Reuse `playAudio` for slideshow pronunciation with a distinct active element id.

## Decision (ADR-lite)

**Context**: The feature needs a reliable way to enter slideshow mode while preserving existing tap-to-pronounce and long-press delete/deselect behavior.

**Decision**: Use a small top-right fullscreen/expand affordance on each word card as the slideshow entry point.

**Consequences**: Entry is explicit and stable on WeChat mini program touch events. It adds one visual control to every card, so styling must keep the icon discoverable without making cards feel cluttered.

## Out of Scope

* Replacing the existing main letter-page swipe implementation.
* Adding auto-play, spaced repetition, or quizzes.
* Introducing a swiper library or any new runtime dependency.
* Changing word data sources or audio APIs.

## Technical Notes

* Related files: `src/pages/index/index.tsx`, `src/pages/index/index.scss`, `src/utils/audio.ts`.
* Archived related task: `.trellis/tasks/archive/2026-06/06-06-letter-slide-animation/prd.md`.
* Current main-page swipe already tracks `touchStartX`, `touchStartY`, drag state, velocity, and boundary damping.
