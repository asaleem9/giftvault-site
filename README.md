# GiftVault site

Marketing site for GiftVault, a free iOS gift card manager. Next.js 16 on Vercel.

## Develop

```bash
npm install
npm run dev
```

## Assets

Screenshots and clips are generated from the app repository's marketing and test evidence folders:

```bash
GIFTVAULT_APP_DIR=../giftcard-manager npm run assets
```

Motion pieces are HyperFrames compositions under `hyperframes/`; `npm run media` renders them into `public/media` and `public/compositions`.
