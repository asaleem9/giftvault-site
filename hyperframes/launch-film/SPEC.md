GOAL:    The viewer thinks "that's my drawer" in the first two seconds and knows by the end that GiftVault is the honest, free place for every gift card.
OUTPUT:  HyperFrames, 1920 x 1080, 30 fps
TIME:    45 s x 30 fps = 1350 frames; no music clock, cuts follow the motion
LOOK:    ground #0F2A22 with one radial lift to #1D453C at 60% / 50% (no texture); ink #F1EFE6; accent #D8C08A on one word per title and the end card;
         display Inter 700 at 84 px, -0.03em tracking, max 6 words a line; quiet lines Inter 500 at 36 px #9DB5A9;
         medium: product UI (real screenshots and recordings) inside a CSS phone (414 x 894 screen, 52 px radius, 13 px bezel, black island) at 1.6-1.9x;
         light and depth: card shadow 0 24px 60px rgba(0,0,0,.38); phone shadow 0 40px 120px rgba(0,0,0,.55); no grain, no vignette
OBJECTS: gift cards (merchant gradient, name top-left, balance top-right, "•••• 4471", "GIFT CARD"), the phone, an orange expiry tag, the app icon (real file), a barcode (real screenshot)
MOTION:  arrivals expo.out / power4.out 0.5-0.9 s; camera power2.inOut 0.5 s; exits power3.in 40% shorter; gather power3.inOut 1.6 s staggered 90 ms;
         springs at damping 0.8 (elastic.out(1,0.8)) on the end-card mark only; titles land then hold dead still; word stagger 70 ms with blur 6 px -> 0
SHOTS:
  0-3.5    HOOK     fourteen cards scattered; "Nine stores. One drawer." lands word by word at 0.6; Target tag pops at 2.2 ("expires in 7 days")
  3.5-8    TENSION  the camera pushes 1.15x into the tagged card, the other cards slide a little apart; line "Which one still has money on it?" at 4.2
  8-13     REVEAL   cards gather into the phone (from the drawer film), the real list fades in on the screen; title "Every gift card, one place" at 10.6, brass on "one"
  13-21    PROOF 1  add-card clip at 1.7x, punch-in 1.25x to the balance field at 17.5; title "Scan or type it once" at 13.4
  21-30    PROOF 2  spend clip at 1.7x, punch-in to the Spent sheet at 25; title "Log what you spend" at 21.4; the balance lands on $37.10 at 29
  30-37    PAYOFF   hurry-register clip at 1.9x; at the flip (33.4) the whole ground floods to #F1EFE6 in 0.4 s power2.inOut; title "Show it at the register" at 30.4 in dark ink
  37-41.5  CLAIM    ground back to green at 37; "No store lets apps read balances." at 37.3; "GiftVault doesn't pretend to." at 39.2 with brass on "doesn't"
  41.5-45  END CARD the app icon lands at 41.8 (scale 0 -> 1, elastic 0.8), wordmark "GiftVault" wipes in at 42.3, "Free. No accounts. No ads. No tracking." at 42.9, CTA pill "Download on the App Store" at 43.3, all held to 45
BANNED:  dark void with small floating UI; glow, particles; purple/blue gradients; three cards in a row; a title over a dimmed screenshot; the logo docked in a corner;
         every scene fading up the same way; product UI tilted in 3D; invented dashboards; any claim not in the app's own copy
QA:      f0 cards fill the frame, nothing black; f=10.8 s title readable over the phone; f=17.5 s punch-in shows the balance "50" being typed; f=33.5 s frame is light with the barcode;
         f=39.5 s both claim lines legible; f=44.5 s icon + wordmark + CTA centred inside title-safe
