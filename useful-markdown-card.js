customElements.whenDefined('card-tools').then(() => {
class UsefulMarkdownCard extends cardTools.litElement() {

  setConfig(config) {
    this._config = config;
    this.cardConfig = {type: "markdown", ...config};
    this.cardConfig.type = "markdown";
    this.cardConfig.content = cardTools.parseTemplate(this._config.content);

    this.card = cardTools.createCard(this.cardConfig);
    window.addEventListener("location-changed", () => this.hass = this._hass);
  }

  render() {
    return cardTools.litHtml()`
    <div id="root">${this.card}</div>
    `;
  }

  getCardSize()
  {
    return this.card.getCardSize();
  }

  set hass(hass) {
    this._hass = hass;
    if(this.card)
    {
      this.card.hass = hass;
      this.cardConfig.content = cardTools.parseTemplate(this._config.content);
      this.card.setConfig(this.cardConfig);
      this.card.requestUpdate();
    }
  }
}

customElements.define('useful-markdown-card', UsefulMarkdownCard);
});

window.setTimeout(() => {
  if(customElements.get('card-tools')) return;
  customElements.define('useful-markdown-card', class extends HTMLElement{
    setConfig() { throw new Error("Can't find card-tools. See https://github.com/thomasloven/lovelace-card-tools");}
  });
}, 2000);
