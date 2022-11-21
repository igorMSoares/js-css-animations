---
title: js-css-animations
---

# Modules

## js-css-animations.js

Builds the animation API that will be exported to the final user

- _export_

  - [jsCssAnimations](#jscssanimations) : <code>Object.&lt;string, (function()\|object)&gt;</code>

- _inner_

  - [animationFunctions](#animationfunctions) : <code>Object</code>
  - [eventBoundAnimations](#eventboundanimations) : <code>Object.&lt;string, function()&gt;</code>
  - [verifyAnimationName](#verifyanimationname) : <code>ProxyHandler</code>
    - [.get(animations, name)](#verifyanimationname-get-animations-name)
  - [selectElement(selector)](#selectelement-selector) ⇒ <code>HTMLElement</code>
  - [selectAllElements(selector)](#selectallelements-selector) ⇒ <code>NodeList.&lt;Element&gt;</code>
  - [getTargets(selector)](#gettargets-selector) ⇒ <code>NodeList.&lt;Element&gt;</code> \| <code>Array.&lt;HTMLElement&gt;</code>
  - [toggle(selector, animA, animB, opts)](#toggle-selector-anima-animb-opts)
    - [element](#toggle-element)
  - [checkTransform(selector)](#checktransform-selector) ⇒ <code>boolean</code>
  - [checkVisibility(selector, mode)](#checkvisibility-selector-mode) ⇒ <code>boolean</code>
  - [isVisible(selector)](#isvisible-selector) ⇒ <code>boolean</code>
  - [isHidden(selector)](#ishidden-selector) ⇒ <code>boolean</code>

## jsCssAnimations : <code>Object.&lt;string, (function()\|Object)&gt;</code>

An API encapsulating all the functions that can be used by the user,
like all the animations functions and auxiliary functions like:
isTransformed(), isVisible() and isHidden()

**Kind**: inner constant of [<code>js-css-animations</code>](#js-css-animations)

## animationFunctions : <code>Object</code>

An object containing all the animations functions.

Visibility animations functions are under
animationFunctions.hide and animationFunctions.show

All other keys of animationFunctions are Motion animations functions

**Kind**: inner constant of [<code>js-css-animations</code>](#js-css-animations)

**See**:

- [globals.VISIBILITY_ANIMS_ID](globals.html#globals-visibility-anims-id)
- [globals.MOTION_ANIMS_ID](globals.html#globals-motion-anims-id)

## eventBoundAnimations : <code>Object.&lt;string, function()&gt;</code>

An object containing animations functions wich are triggered by an event (like 'click')

**Kind**: inner constant of [<code>js-css-animations</code>](#js-css-animations)

## verifyAnimationName : <code>ProxyHandler</code>

Will throw an ReferenceError if the animation name does not corresponds to any animation function

**Kind**: inner constant of [<code>js-css-animations</code>](#js-css-animations)

### verifyAnimationName.get(animations, name)

**Kind**: static method of [<code>verifyAnimationName</code>](#verifyanimationname)

| Param      | Type                                           | Description                           |
| ---------- | ---------------------------------------------- | ------------------------------------- |
| animations | <code>Object.&lt;string, function()&gt;</code> | Object containing animation functions |
| name       | <code>string</code>                            | Name of the animation                 |

## selectElement(selector) ⇒ <code>HTMLElement</code>

If 'selector' is a string containing a valid CSS selector,
it will be used to perform a querySelector(),
If 'selector' is already an HTMLElement it will be returned as it is.

**Kind**: inner method of [<code>js-css-animations</code>](#js-css-animations)  
**Returns**: An HTMLElement

| Param    | Type                                        | Description                                                                                                       |
| -------- | ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| selector | <code>Element</code> \| <code>string</code> | If it's an HTMLElement, 'selector' will be returned as it is. If it's a string, it should be a valid CSS selector |

## selectAllElements(selector) ⇒ <code>NodeList.&lt;Element&gt;</code>

Returns a NodeList with all elements that match 'selector'

**Kind**: inner method of [<code>js-css-animations</code>](#js-css-animations)  
**Returns**: A NodeList containing all elements matched by the 'selector'

| Param    | Type                | Description                                             |
| -------- | ------------------- | ------------------------------------------------------- |
| selector | <code>string</code> | A valid CSS selector to be passed to querySelectorAll() |

## getTargets(selector) ⇒ <code>NodeList.&lt;Element&gt;</code> \| <code>Array.&lt;HTMLElement&gt;</code>

Gets the element(s) to be animated. The user can pass either an HTMLElement or a CSS selector as a target to the animation

**Kind**: inner method of [<code>js-css-animations</code>](#js-css-animations)  
**Returns**: An array containing a single HTMLElement or a NodeList with all the elements matching the CSS selector in 'selector'

| Param    | Type                                            | Description                                                               |
| -------- | ----------------------------------------------- | ------------------------------------------------------------------------- |
| selector | <code>HTMLElement</code> \| <code>string</code> | An HTMLElement or a valid CSS selector to be passed to querySelectorAll() |

## toggle(selector, animA, animB, opts)

Toggles between two animations.

If 'animA' and 'animB' have the same name,
it will toggle between the 'hide' state and the 'show' state,
although this is only applicable to visibility animations.

**Kind**: inner method of [<code>js-css-animations</code>](#js-css-animations)  
**See**: [globals.VISIBILITY_ANIMS_ID](globals.html#globals-visibility-anims-id)

| Param    | Type                                            | Description                                                                |
| -------- | ----------------------------------------------- | -------------------------------------------------------------------------- |
| selector | <code>HTMLElement</code> \| <code>string</code> | The DOM element or a valid CSS selector with the element(s) to be animated |
| animA    | <code>string</code>                             | The initial animation name                                                 |
| animB    | <code>string</code>                             | The next animation name                                                    |
| opts     | <code>Object</code> \| <code>Object</code>      | All options that can be passed by the user to customize the animation      |

### toggle~element

The current animation attribute will only be set in the first element that
matches the 'selector' passed, but the animation will apply to all elements
matched by 'selector'

**Kind**: inner constant of [<code>toggle</code>](#toggle-selector-anima-animb-opts)

## checkTransform(selector) ⇒ <code>boolean</code>

Verifies if an element is out of its original orientation or scale.

Note that if the element has CSS property 'transform: rotate(0deg)',
checkTransform() will still return False, as the element is not
out of its original orientation.

**Kind**: inner method of [<code>js-css-animations</code>](#js-css-animations)  
**Returns**: True if the element was rotated from its original orientation. False if it maintains the original orientation.

| Param    | Type                                            | Description                                                     |
| -------- | ----------------------------------------------- | --------------------------------------------------------------- |
| selector | <code>HTMLElement</code> \| <code>string</code> | An element or a valid CSS selector corresponding to the element |

## checkVisibility(selector, mode) ⇒ <code>boolean</code>

Verifies if a given element is hidden or visible

**Kind**: inner method of [<code>js-css-animations</code>](#js-css-animations)  
**Returns**: <code>boolean</code> - True or False depending if the element is visible or hidden, according to the 'mode' passed

| Param    | Type                                        | Description                                                     |
| -------- | ------------------------------------------- | --------------------------------------------------------------- |
| selector | <code>Element</code> \| <code>string</code> | An element or a valid CSS selector corresponding to the element |
| mode     | <code>string</code>                         | Either 'visible' or 'hidden'                                    |

## isVisible(selector) ⇒ <code>boolean</code>

**Kind**: inner method of [<code>js-css-animations</code>](#js-css-animations)  
**Returns**: True if the element is visible, False otherwise

| Param    | Type                                        | Description                         |
| -------- | ------------------------------------------- | ----------------------------------- |
| selector | <code>Element</code> \| <code>string</code> | Dom element or a valid CSS selector |

## isHidden(selector) ⇒ <code>boolean</code>

**Kind**: inner method of [<code>js-css-animations</code>](#js-css-animations)  
**Returns**: True if the element is hidden, False otherwise

| Param    | Type                                        | Description                         |
| -------- | ------------------------------------------- | ----------------------------------- |
| selector | <code>Element</code> \| <code>string</code> | Dom element or a valid CSS selector |
