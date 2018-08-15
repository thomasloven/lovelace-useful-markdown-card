class UsefulMarkdownCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode:'open'});
    this.md = document.createElement('hui-markdown-card');

    this.shadowRoot.appendChild(this.md);
  }

  process(text) {
    text = text.replace(/\[\[(.*?)\]\]/g, 'match');
    console.log(text);
    return text;
  }

  setConfig(config) {
    this.title = config.title;
    this.content = config.content;

    config.title = this.process(this.title);
    config.content = this.process(this.content);
    this.md.setConfig(config);
  }

  set hass(hass) {
    this.md.hass = hass;
  }
}

customElements.define('useful-markdown-card', UsefulMarkdownCard);
