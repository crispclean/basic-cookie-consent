/** ES6/Tailwind version */

const defaultContent = {
  desc: "This website uses cookies to enhance your browsing experience.",
  buttonAccept: "OK",
  moreInfo: "Learn more",
  moreInfoLink: "https://wikis.ec.europa.eu/display/WEBGUIDE/04.+Cookies"
};

const bottomRight = ["right-0", "bottom-0", "mr-4", "mb-4", "w-1/3"];
const bottomLeft = ["left-0", "bottom-0", "ml-4", "mb-4", "w-1/3"];

const BasicCookieConsent = class {
  constructor(content, position) {
    this.content = { ...defaultContent, ...content };

    this.initContainer();
    this.cookieConsent();
  }

  initContainer() {
    this.container = document.createElement("div");
    this.container.classList.add(
      ...["fixed", "p-4", "bg-white", ...bottomRight]
    );
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

  cookieConsent() {
    if (!this.getCookie("consent")) {
      const desc = document.createElement("desc");
      const actionContainer = document.createElement("div");
      const buttonAccept = document.createElement("button");
      const moreInfo = document.createElement("a");

      buttonAccept.addEventListener("click", this.cookieDismiss.bind(this));

      actionContainer.classList.add(
        "flex",
        "justify-between",
        "items-center",
        "mt-4"
      );
      buttonAccept.classList.add("bg-black", "text-white", "px-4", "py-2");

      desc.innerHTML = this.content.desc;
      buttonAccept.innerHTML = this.content.buttonAccept;
      moreInfo.innerHTML = this.content.moreInfo;
      moreInfo.href = this.content.moreInfoLink;
      moreInfo.target = "_blank";

      actionContainer.append(buttonAccept);
      actionContainer.append(moreInfo);

      this.container.append(desc);
      this.container.append(actionContainer);
      document.body.append(this.container);
    }
  }

  cookieDismiss() {
    this.setCookie("consent", {
      essential: true,
      marketing: false,
      personal: false
    });
    this.container.classList.add("hidden");
  }
};

export default BasicCookieConsent;
