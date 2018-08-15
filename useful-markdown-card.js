class UsefulMarkdownCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode:'open'});
    this.md = document.createElement('hui-markdown-card');

    this.shadowRoot.appendChild(this.md);
    this._hass = null;
  }

  handleTemplate(str) {
    if(!this._hass) return '';
    str = str.replace(/^\s+|\s+$/g, '');
    let parts = str.split(".");
    let v = this._hass.states[parts[0]+'.'+parts[1]];
    parts.shift();
    parts.shift();
    parts.forEach(item => {
      v = v[item];
    });
    return v;
  }

  process(text) {
    text = text.replace(/\[\[(.*?)\]\]/g, (str,p1, offset,s) => this.handleTemplate(p1));
    return text;
  }

  setConfig(config) {
    this.title = config.title;
    this.content = config.content;
    this._config = config;

    config.title = this.process(this.title);
    config.content = this.process(this.content);
    this.md.setConfig(this._config);
  }

  set hass(hass) {
    this._hass = hass;
    this.md.hass = hass;
    this._config.title = this.process(this.title);
    this._config.content = this.process(this.content);
    this.md.setConfig(this._config);
    this.md.hass = hass;
  }
}

customElements.define('useful-markdown-card', UsefulMarkdownCard);
