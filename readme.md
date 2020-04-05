# Basic Cookie Consent

**BasicCookieConsent** is a very baisc and small _(→ 4 kB)_ vanilla JS script.

## Installation

```sh
npm install basic-cookie-consent --dev
```

## Usage

The library relies on Javascript to build the DOM/functionality.

```sh
import BasicCookieConsent from 'basic-cookie-consent';

new BasicCookieConsent();
```

## API

```{
    content: {
        desc: "This website uses cookies to enhance your browsing experience.",
        buttonAccept: "OK",
        moreInfo: "Learn more",
        moreInfoLink: "https://wikis.ec.europa.eu/display/WEBGUIDE/04.+Cookies"
    },
    position: 'bottomLeft'
}
```
