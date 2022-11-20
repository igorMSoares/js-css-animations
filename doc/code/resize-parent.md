---
title: resize-parent
---

# resize-parent

<a name="module_resize-parent"></a>

## resize-parent
Handles parent element's resizing to perform width/height smooth transitionswhen child element is being animated


* [resize-parent](#module_resize-parent)
    * [~getRootCssProperty(property)](#module_resize-parent..getRootCssProperty) ⇒
    * [~setParentCssProperties(element)](#module_resize-parent..setParentCssProperties)
    * [~getDimension(wTransit, hTransit)](#module_resize-parent..getDimension) ⇒
    * [~setOverflowHidden(el)](#module_resize-parent..setOverflowHidden)
    * [~removeOverflowHidden(el)](#module_resize-parent..removeOverflowHidden)
    * [~initParentResize(args)](#module_resize-parent..initParentResize) ⇒
    * [~endParentResize(element, opts)](#module_resize-parent..endParentResize)

<a name="module_resize-parent..getRootCssProperty"></a>

### resize-parent~getRootCssProperty(property) ⇒
Gets the default value of a CSS property defined in js-css-animations.css

**Kind**: inner method of [<code>resize-parent</code>](#module_resize-parent)  
**Returns**: The default js-css-animation property value  

| Param | Type | Description |
| --- | --- | --- |
| property | <code>string</code> | PROPERTY_NAMES key corresponding to a CSS property name |

<a name="module_resize-parent..setParentCssProperties"></a>

### resize-parent~setParentCssProperties(element)
Sets the same CSS variables (customized by the options in the animation function)in the parent element, so the parent's dimensions transitions will havethe same custom properties of the child element's animations

**Kind**: inner method of [<code>resize-parent</code>](#module_resize-parent)  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>HTMLElement</code> | The DOM element being animated |

<a name="module_resize-parent..getDimension"></a>

### resize-parent~getDimension(wTransit, hTransit) ⇒
Returns a string with the dimension to transition, or 'all' for both dimensions, or undefined if neither width nor height should be transitioned

**Kind**: inner method of [<code>resize-parent</code>](#module_resize-parent)  
**Returns**: undefined if both parameters are false, 'all' if both are true and 'width' or 'height' if only wTransit or hTransit is true, respectively  

| Param | Type | Description |
| --- | --- | --- |
| wTransit | <code>boolean</code> | Indicates if parent element should have width transition |
| hTransit | <code>boolean</code> | Indicates if parent element should have height transition |

<a name="module_resize-parent..setOverflowHidden"></a>

### resize-parent~setOverflowHidden(el)
Adds a CSS class which will set the overflow property to 'clip' (or 'hidden')

**Kind**: inner method of [<code>resize-parent</code>](#module_resize-parent)  

| Param | Type | Description |
| --- | --- | --- |
| el | <code>HTMLElement</code> | The DOM element which will receive the CSS class |

<a name="module_resize-parent..removeOverflowHidden"></a>

### resize-parent~removeOverflowHidden(el)
Removes the CSS class which sets the overflow property to 'clip' (or 'hidden')

**Kind**: inner method of [<code>resize-parent</code>](#module_resize-parent)  

| Param | Type | Description |
| --- | --- | --- |
| el | <code>HTMLElement</code> | The DOM element with the CSS class to remove |

<a name="module_resize-parent..initParentResize"></a>

### resize-parent~initParentResize(args) ⇒
Handles parent element width/height transitions during child element's animation

**Kind**: inner method of [<code>resize-parent</code>](#module_resize-parent)  
**Returns**: An object with the dimension(s) to transition and the parent element's measurements before and after the child element's animation is performed  

| Param | Type | Description |
| --- | --- | --- |
| args | <code>Object</code> | Containing all the information needed to initiate parent's dimensions transitions |

<a name="module_resize-parent..endParentResize"></a>

### resize-parent~endParentResize(element, opts)
Removes all CSS properties and classes added to the parent element to handle the dimensions transitions during the animation

**Kind**: inner method of [<code>resize-parent</code>](#module_resize-parent)  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>HTMLElement</code> | The DOM element being animated |
| opts | <code>Object</code> | Indicates which dimensions were transitioned |

