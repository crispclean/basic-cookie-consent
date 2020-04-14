/** ES6/Tailwind version */

const defaultDOMString = `
  <div id="basicCookieConsent" class="fixed p-4 bg-white text-black z-10">
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

    document.addEventListener("DOMContentLoaded", () => {
      if (!this.getCookie("basic-cookie-consent")) {
        this.showCookieConsent();
      }
    });
  }

  showCookieConsent() {
    let elements = this.parseDOMString(this.domString);
    elements = this.populateElements(this.parseDOMString(this.domString));
    this.appendElementsToDOM(elements);
  }

  parseDOMString(domString) {
    let html = new DOMParser().parseFromString(domString, "text/html");
    return Array.from(html.body.childNodes);
  }

  populateElements(elements) {
    elements.forEach((el) => {
      if (el.id === "basicCookieConsent") {
        el.classList.add(...eval(this.position)); //check to use alternative for eval
      }
      if (el.id === "moreInfo" && this.content["moreInfoLink"]) {
        el.href = this.content["moreInfoLink"];
        el.target = "_blank";
      }
      if (el.childNodes.length) {
        this.populateElements(el.childNodes);
      }
      if (this.content[el.id]) {
        el.innerHTML = this.content[el.id];
      }
    });
    return elements;
  }

  appendElementsToDOM(elements) {
    const toNodeList = function (arrayOfNodes) {
      let fragment = document.createDocumentFragment();
      arrayOfNodes.forEach(function (item) {
        fragment.appendChild(item.cloneNode(true));
      });
      return fragment.childNodes;
    };

    document.body.append(toNodeList(elements)[0]);

    //Need to add onclick here since cloneNode (above) does not copy event listeners - lame
    const buttonAccept = document.body.querySelector("#buttonAccept");
    buttonAccept &&
      buttonAccept.addEventListener("click", this.dismissCookie.bind(this));
  }

  dismissCookie() {
    this.setCookie("basic-cookie-consent", {
      essential: true,
      marketing: false,
      personal: false,
    });
    document.body.removeChild(document.getElementById("basicCookieConsent")); // https://www.tutorialspoint.com/how-can-detached-dom-elements-cause-memory-leak-in-javascript
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
