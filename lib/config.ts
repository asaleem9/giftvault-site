export const site = {
  name: "GiftVault",
  tagline: "Every gift card. One place.",
  description:
    "GiftVault is a free iOS gift card manager. Scan or type a card once, show a bright barcode at the register, keep honest balances, and add cards to Apple Wallet. No accounts, no ads, no tracking.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://giftvault-site.vercel.app",
  appStoreUrl:
    process.env.NEXT_PUBLIC_APP_STORE_URL ?? "https://apps.apple.com/app/id000000000",
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? "",
  repoUrl: "https://github.com/asaleem9/giftvault-site",
  copyrightYear: "2026",
} as const;
