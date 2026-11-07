# Isha Lunar Calendar

A mobile-first React progressive web app that opens directly to the Isha Foundation 2026 lunar calendar. The calendar data is bundled in the app so dates and observances remain available offline after the app has been opened once.

## Run locally

```sh
pnpm install
pnpm dev
```

For a production build, run `pnpm build` and serve the generated `dist` directory over HTTPS (or localhost) to enable the service worker and PWA install flow.

## Calendar source

Dates and observances are transcribed from the [Isha Foundation 2026 Lunar Calendar PDF](https://public-isha.sadhguru.org/public/2026-Isha-Lunar-Calendar-English.pdf), linked from the [Isha Lunar Calendar page](https://isha.sadhguru.org/in/en/isha-lunar-calendar). Timings are shown as published in the source (Indian Standard Time).
