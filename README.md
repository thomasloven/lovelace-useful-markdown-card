useful-markdown-card
====================
A markdown card for lovelace, which does a bit more.

This card requires [card-tools](https://github.com/thomasloven/lovelace-card-tools) to be installed.

For installation instructions [see this guide](https://github.com/thomasloven/hass-config/wiki/Lovelace-Plugins).

## Usage
This card works *exactly* the same as the core Home Assistant [markdown-card](https://www.home-assistant.io/lovelace/markdown/).

**However**, this card can do a bit more with what you put in the `content:` parameter.

The magic begins with the **template** `[[ <template> ]]`.

The template will be automatically and dynamically replaced with:

| `<template>` | Example | Result
| ------------ | ------- | ------
| Entity id | `light.bed_light` | The current state of the entity
| State | `light.bed_light.state` | Same as above
| Attribute | `light.bed_light.attributes.friendly_name` | The current value of the specified entitys specified attribute
| Username | `{user}` | The username of the currently logged in user
| Device ID | `{browser}` | The ID of the currently used device-browser combination
| Hash | `{hash}` | The hash part of the current URL

Those last three options are probably most useful with the final form of the template: The `if`.

### if

Syntax: `[[ if(<condition>, <then>, <else>) ]]`
Simply put, if `<condition>` is satisfied, the template will be replaced with `<then>`, otherwise it will be replaced with `<else>`.

Both `<then>` and `<else>` can in turn be `<template>` expressions, and `<else>` can even be another `if`(!).

Conditions are in the form `<left> <comparison> <right>` where `<left>` and `<right>` are `<template>`, strings or numeric values.

`<comparison>` is one of `==`, `!=`, `<`, `>`, `<=` or `>=`.

## Example
```yaml

title: useful-markdown-card
cards:

  # Some controlls for demo purposes
  - type: vertical-stack
    cards:

    - type: entities
      entities:
        - input_number.x_pos

    - type: horizontal-stack
      cards:
        - type: entity-button
          entity: light.bed_light
          name: " "
          tap_action: {action: toggle}

        - type: entity-button
          entity: sun.sun
          icon: mdi:numeric-1
          name: " "
          tap_action: {action: navigate, navigation_path: "#subpage1"}

    - type: horizontal-stack
      cards:
        - type: entity-button
          entity: sun.sun
          icon: mdi:numeric-2
          name: " "
          tap_action: {action: navigate, navigation_path: "#subpage2"}

        - type: entity-button
          entity: sun.sun
          icon: mdi:numeric-3
          name: " "
          tap_action: {action: navigate, navigation_path: "#subpage3"}


  # A default markdown card for comparison
  - type: markdown
    title: Default markdown card
    content: &markdown |
      # Title
      ## Subtitle
      - list
      - items

      [A link](https://google.com)

      [[ light.bed_light.state ]]
      [[ light.bed_light ]]
      [[ light.bed_light.attributes.friendly_name ]]

      Username: [[ {user} ]] Browser ID: [[ {browser} ]]
      Current URL hash: [[ {hash} ]]

      [[ if(light.bed_light == "on", "The lights are on", "It's dark") ]]
      [[ if(input_number.x_pos <= 30, "small", if(input_number.x_pos <= 70, "Medium", "LARGE")) ]]

  # And finally, the useful-markdown-card with a copy of the same content
  - type: custom:useful-markdown-card
    title: Useful markdown card
    content: *markdown
```

![useful-markdown-card mp4](https://user-images.githubusercontent.com/1299821/52882258-6062f000-3167-11e9-8cd3-d8caabeb7cb3.gif)

## Styling

You can also specify css styling to add to the html elements of the card.
Specify it as normal css in a `style:` parameter.

Example:

```yaml
type: custom:useful-markdown-card
style: |
  ha-card {
    padding: 16px;
  }
  h1 {
    text-align: center;
    font-size: 64px;
  }
  h2 {
    text-align: center;
    color: var(--primary-color);
  }
content: |
  # [[ sensor.time ]]
  ## [[ sensor.date ]]
```

![Styling](https://user-images.githubusercontent.com/1299821/58908162-2286d900-8710-11e9-8592-06b864ef3d9b.png)


---
<a href="https://www.buymeacoffee.com/uqD6KHCdJ" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/white_img.png" alt="Buy Me A Coffee" style="height: auto !important;width: auto !important;" ></a>
