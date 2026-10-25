export const site = {
  name: "GiftVault",
  tagline: "Gift cards you can find when you're standing at the register.",
  title: "GiftVault, a free gift card app for iPhone",
  description:
    "GiftVault is a free iPhone app for gift cards. Scan a card once and it keeps the barcode, number, PIN and balance, shows a bright barcode at the register, and can add the card to Apple Wallet. There is no account, and the app has no ads or tracking.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://giftvault-site.vercel.app",
  appStoreUrl:
    process.env.NEXT_PUBLIC_APP_STORE_URL ?? "https://apps.apple.com/app/id000000000",
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? "",
  repoUrl: "https://github.com/asaleem9/giftvault-site",
  copyrightYear: "2026",
} as const;
