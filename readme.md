# Bram Cookie Consent

**BramCookieConsent** is a barebones and small vanilla CookieConsent JS script (<4kb).

https://tailwindcss.com is currently needed for styling.

## Installation

```sh
npm install bram-cookie-consent --dev
```

## Usage

### JS

```sh
import BramCookieConsent from "./bram-cookie-consent";

new BramCookieConsent({
    content: {
        desc: "This website uses cookies to enhance your browsing experience.",
        buttonAccept: "OK",
        moreInfo: "Learn more",
        moreInfoLink: "https://wikis.ec.europa.eu/display/WEBGUIDE/04.+Cookies"
    },
    position: 'bottomLeft'
});

```
