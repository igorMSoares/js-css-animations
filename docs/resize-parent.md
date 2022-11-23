---
title: resize-parent
---

# Modules

## resize-parent.js

Handles parent element's resizing to perform width/height smooth transitions
when child element is being animated

- _export_

  - [initParentResize(args)](#initparentresize-args) ⇒ <code>Object</code>
  - [endParentResize(element, opts)](#endparentresize-element-opts)

- _inner_

  - [getRootCssProperty(property)](#getrootcssproperty-property) ⇒ <code>string</code>
  - [setParentCssProperties(element)](#setparentcssproperties-element)
  - [getDimension(wTransit, hTransit)](#getdimension-wtransit-htransit) ⇒ <code>string</code> \| <code>undefined</code>
  - [setOverflowHidden(el)](#setoverflowhidden-el)
  - [removeOverflowHidden(el)](#removeoverflowhidden-el)

## initParentResize(args) ⇒ <code>Object</code>

Handles parent element width/height transitions during child element's animation

**Kind**: inner method of [<code>resize-parent</code>](#resize-parent-js)

**Returns**: An object with the dimension(s) to transition and the parent element's measurements before and after the child element's animation is performed

| Param | Type                | Description                                                                       |
| ----- | ------------------- | --------------------------------------------------------------------------------- |
| args  | <code>Object</code> | Containing all the information needed to initiate parent's dimensions transitions |

## endParentResize(element, opts)

Removes all CSS properties and classes added to the parent element to handle the dimensions transitions during the animation

**Kind**: inner method of [<code>resize-parent</code>](#resize-parent-js)

| Param   | Type                     | Description                                  |
| ------- | ------------------------ | -------------------------------------------- |
| element | <code>HTMLElement</code> | The DOM element being animated               |
| opts    | <code>Object</code>      | Indicates which dimensions were transitioned |

## getRootCssProperty(property) ⇒ <code>string</code>

Gets the default value of a CSS property defined in js-css-animations.css

**Kind**: inner method of [<code>resize-parent</code>](#resize-parent-js)

**Returns**: The default js-css-animation property value

| Param    | Type                | Description                                             |
| -------- | ------------------- | ------------------------------------------------------- |
| property | <code>string</code> | PROPERTY_NAMES key corresponding to a CSS property name |

## setParentCssProperties(element)

Sets the same CSS variables (customized by the options in the animation function)
in the parent element, so the parent's dimensions transitions will have
the same custom properties of the child element's animations

**Kind**: inner method of [<code>resize-parent</code>](#resize-parent-js)

| Param   | Type                     | Description                    |
| ------- | ------------------------ | ------------------------------ |
| element | <code>HTMLElement</code> | The DOM element being animated |

## getDimension(wTransit, hTransit) ⇒ <code>string</code> \| <code>undefined</code>

Returns a string with the dimension to transition, or 'all' for both dimensions, or undefined if neither width nor height should be transitioned

**Kind**: inner method of [<code>resize-parent</code>](#resize-parent-js)

**Returns**: undefined if both parameters are false, 'all' if both are true and 'width' or 'height' if only wTransit or hTransit is true, respectively

| Param    | Type                 | Description                                               |
| -------- | -------------------- | --------------------------------------------------------- |
| wTransit | <code>boolean</code> | Indicates if parent element should have width transition  |
| hTransit | <code>boolean</code> | Indicates if parent element should have height transition |

## setOverflowHidden(el)

Adds a CSS class which will set the overflow property to 'clip' (or 'hidden')

**Kind**: inner method of [<code>resize-parent</code>](#resize-parent-js)

| Param | Type                     | Description                                      |
| ----- | ------------------------ | ------------------------------------------------ |
| el    | <code>HTMLElement</code> | The DOM element which will receive the CSS class |

## removeOverflowHidden(el)

Removes the CSS class which sets the overflow property to 'clip' (or 'hidden')

**Kind**: inner method of [<code>resize-parent</code>](#resize-parent-js)

| Param | Type                     | Description                                  |
| ----- | ------------------------ | -------------------------------------------- |
| el    | <code>HTMLElement</code> | The DOM element with the CSS class to remove |
