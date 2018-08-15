class UsefulMarkdownCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode:'open'});
    this.md = document.createElement('hui-markdown-card');

    this.shadowRoot.appendChild(this.md);
  }

  setConfig(config) {
    this.md.setConfig(config);
  }

  set hass(hass) {
    this.md.hass = hass;
  }
}

customElements.define('useful-markdown-card', UsefulMarkdownCard);
