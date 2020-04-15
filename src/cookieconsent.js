/** ES6/Tailwind version */

const defaultDOMString = `
  <div id="bramCookieConsent" class="fixed p-4 bg-white text-black z-10">
    <div id="desc"></div>
    <div class="flex justify-between items-center mt-4">
      <button id="buttonAccept" class="bg-black text-white px-4 py-2"></button>
      <a id="moreInfo" href></a>
    </div>
  </div>`;

const defaultContent = {
  desc: "This website uses cookies to enhance your browsing experience.",
  buttonAccept: "OK",
  moreInfo: "Learn more",
  moreInfoLink: "https://wikis.ec.europa.eu/display/WEBGUIDE/04.+Cookies",
};

const bottomRight = ["right-0", "bottom-0", "mx-4", "mb-4", "lg:w-1/3"];
const bottomLeft = ["left-0", "bottom-0", "mx-4", "mb-4", "lg:w-1/3"];

const CookieConsent = class {
  constructor(params = {}) {
    this.position = params.position ? position : "bottomRight";
    this.content = { ...defaultContent, ...params.content };
    this.domString = defaultDOMString;

    document.addEventListener(
      "DOMContentLoaded",
      this.onDomContentLoaded.bind(this)
    );
  }

  onDomContentLoaded() {
    if (!this.getCookie("bram-cookie-consent")) {
      this.showCookieConsent();
    }
  }

  showCookieConsent() {
    this.elements = this.parseDOMString(this.domString)[0];
    this.populateContentAndListeners();
    document.body.append(this.elements);
  }

  closeCookieConsent() {
    document.body.removeChild(document.getElementById("bramCookieConsent")); // https://www.tutorialspoint.com/how-can-detached-dom-elements-cause-memory-leak-in-javascript
  }

  parseDOMString(domString) {
    let html = new DOMParser().parseFromString(domString, "text/html");
    return Array.from(html.body.childNodes);
  }

  populateContentAndListeners() {
    const container = this.elements;
    container.classList.add(...eval(this.position));

    const content = container.children[0];
    content.innerHTML = this.content["desc"];

    const buttonAccept = container.children[1].children[0];
    buttonAccept.innerHTML = this.content.buttonAccept;
    buttonAccept &&
      buttonAccept.addEventListener("click", () => {
        this.setCookie("bram-cookie-consent", {
          essential: true,
          marketing: false,
          personal: false,
        });
        this.closeCookieConsent();
      });

    const moreInfoLink = container.children[1].children[1];
    moreInfoLink.href = this.content["moreInfoLink"];
    moreInfoLink.target = "_blank";
  }

  setCookie(name, value) {
    const expire = new Date();
    expire.setTime(expire.getTime() + expire * 24 * 60 * 60 * 1000);
    const cookie =
      name +
      "=" +
      JSON.stringify(value) +
      ";" +
      "expires=" +
      expire.toUTCString() +
      ";";

    document.cookie = cookie;
  }

  getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  eraseCookie(name) {
    document.cookie = name + "=; Max-Age=-99999999;";
  }
};

export default CookieConsent;
