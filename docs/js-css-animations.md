---
title: js-css-animations
---

# js-css-animations

<a name="module_js-css-animations"></a>

## js-css-animations
Builds the animation API that will be exported to the final user


* [js-css-animations](#module_js-css-animations)
    * [~animationFunctions](#module_js-css-animations..animationFunctions) : <code>Object</code>
    * [~eventBoundAnimations](#module_js-css-animations..eventBoundAnimations) : <code>Object.&lt;string, function()&gt;</code>
    * [~verifyAnimationName](#module_js-css-animations..verifyAnimationName) : <code>ProxyHandler</code>
        * [.get(animations, name)](#module_js-css-animations..verifyAnimationName.get)
    * [~jsCssAnimations](#module_js-css-animations..jsCssAnimations) : <code>Object.&lt;string, (function()\|Object)&gt;</code>
    * [~selectElement(selector)](#module_js-css-animations..selectElement) ⇒
    * [~selectAllElements(selector)](#module_js-css-animations..selectAllElements) ⇒
    * [~getTargets(selector)](#module_js-css-animations..getTargets) ⇒
    * [~toggle(selector, animA, animB, opts)](#module_js-css-animations..toggle)
        * [~element](#module_js-css-animations..toggle..element)
    * [~checkTransform(selector)](#module_js-css-animations..checkTransform) ⇒
    * [~checkVisibility(selector, mode)](#module_js-css-animations..checkVisibility) ⇒ <code>boolean</code>
    * [~isVisible(selector)](#module_js-css-animations..isVisible) ⇒
    * [~isHidden(selector)](#module_js-css-animations..isHidden) ⇒

<a name="module_js-css-animations..animationFunctions"></a>

### js-css-animations~animationFunctions : <code>Object</code>
An object containing all the animations functions.Visibility animations functions are underanimationFunctions.hide and animationFunctions.showAll other keys of animationFunctions are Motion animations functions

**Kind**: inner constant of [<code>js-css-animations</code>](#module_js-css-animations)  
**See**

- [module:globals.VISIBILITY_ANIMS_ID](module:globals.VISIBILITY_ANIMS_ID)
- [module:globals.MOTION_ANIMS_ID](module:globals.MOTION_ANIMS_ID)

<a name="module_js-css-animations..eventBoundAnimations"></a>

### js-css-animations~eventBoundAnimations : <code>Object.&lt;string, function()&gt;</code>
An object containing animations functions wich are triggered by an event (like 'click')

**Kind**: inner constant of [<code>js-css-animations</code>](#module_js-css-animations)  
<a name="module_js-css-animations..verifyAnimationName"></a>

### js-css-animations~verifyAnimationName : <code>ProxyHandler</code>
Will throw an ReferenceError if the animation name does not corresponds to any animation function

**Kind**: inner constant of [<code>js-css-animations</code>](#module_js-css-animations)  
<a name="module_js-css-animations..verifyAnimationName.get"></a>

#### verifyAnimationName.get(animations, name)
**Kind**: static method of [<code>verifyAnimationName</code>](#module_js-css-animations..verifyAnimationName)  

| Param | Type | Description |
| --- | --- | --- |
| animations | <code>Object.&lt;string, function()&gt;</code> | Object containing animation functions |
| name | <code>string</code> | Name of the animation |

<a name="module_js-css-animations..jsCssAnimations"></a>

### js-css-animations~jsCssAnimations : <code>Object.&lt;string, (function()\|Object)&gt;</code>
An API encapsulating all the functions that can be used by the user,like all the animations functions and auxiliary functions likeisTransformed(), isVisible() and isHidden()

**Kind**: inner constant of [<code>js-css-animations</code>](#module_js-css-animations)  
<a name="module_js-css-animations..selectElement"></a>

### js-css-animations~selectElement(selector) ⇒
If 'selector' is a string containing a valid CSS selector,it will be used to perform a querySelector(),If 'selector' is already an HTMLElement it will be returned as it is.

**Kind**: inner method of [<code>js-css-animations</code>](#module_js-css-animations)  
**Returns**: An HTMLElement  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>Element</code> \| <code>string</code> | If it's an HTMLElement, 'selector' will be returned as it is. If it's a string, it should be a valid CSS selector |

<a name="module_js-css-animations..selectAllElements"></a>

### js-css-animations~selectAllElements(selector) ⇒
Returns a NodeList with all elements that match 'selector'

**Kind**: inner method of [<code>js-css-animations</code>](#module_js-css-animations)  
**Returns**: A NodeList containing all elements matched by the 'selector'  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>string</code> | A valid CSS selector to be passed to querySelectorAll() |

<a name="module_js-css-animations..getTargets"></a>

### js-css-animations~getTargets(selector) ⇒
Gets the element(s) to be animated. The user can pass either an HTMLElement or a CSS selector as a target to the animation

**Kind**: inner method of [<code>js-css-animations</code>](#module_js-css-animations)  
**Returns**: An array containing a single HTMLElement or a NodeList with all the elements matching the CSS selector in 'selector'  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>HTMLElement</code> \| <code>string</code> | An HTMLElement or a valid CSS selector to be passed to querySelectorAll() |

<a name="module_js-css-animations..toggle"></a>

### js-css-animations~toggle(selector, animA, animB, opts)
Toggles between two animations.If 'animA' and 'animB' have the same name,it will toggle between the 'hide' state and the 'show' state,although this is only applicable to visibility animations.

**Kind**: inner method of [<code>js-css-animations</code>](#module_js-css-animations)  
**See**: [module:globals.VISIBILITY_ANIMS_ID](module:globals.VISIBILITY_ANIMS_ID)  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>HTMLElement</code> \| <code>string</code> | The DOM element or a valid CSS selector with the element(s) to be animated |
| animA | <code>string</code> | The initial animation name |
| animB | <code>string</code> | The next animation name |
| opts | <code>Object</code> \| <code>Object</code> | All options that can be passed by the user to customize the animation |

<a name="module_js-css-animations..toggle..element"></a>

#### toggle~element
The current animation attribute will only be set in the first element thatmatches the 'selector' passed, but the animation will apply to all elementsmatched by 'selector'

**Kind**: inner constant of [<code>toggle</code>](#module_js-css-animations..toggle)  
<a name="module_js-css-animations..checkTransform"></a>

### js-css-animations~checkTransform(selector) ⇒
Verifies if an element is out of its original orientation or scale.Note that if the element has CSS property 'transform: rotate(0deg)',checkTransform() will still return False, as the element is notout of its original orientation.

**Kind**: inner method of [<code>js-css-animations</code>](#module_js-css-animations)  
**Returns**: True if the element was rotated from its original orientation. False if it maintains the original orientation.  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>HTMLElement</code> \| <code>string</code> | An element or a valid CSS selector corresponding to the element |

<a name="module_js-css-animations..checkVisibility"></a>

### js-css-animations~checkVisibility(selector, mode) ⇒ <code>boolean</code>
Verifies if a given element is hidden or visible

**Kind**: inner method of [<code>js-css-animations</code>](#module_js-css-animations)  
**Returns**: <code>boolean</code> - True or False depending if the element is visible or hidden, according to the 'mode' passed  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>Element</code> \| <code>string</code> | An element or a valid CSS selector corresponding to the element |
| mode | <code>string</code> | Either 'visible' or 'hidden' |

<a name="module_js-css-animations..isVisible"></a>

### js-css-animations~isVisible(selector) ⇒
**Kind**: inner method of [<code>js-css-animations</code>](#module_js-css-animations)  
**Returns**: True if the element is visible, False otherwise  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>Element</code> \| <code>string</code> | Dom element or a valid CSS selector |

<a name="module_js-css-animations..isHidden"></a>

### js-css-animations~isHidden(selector) ⇒
**Kind**: inner method of [<code>js-css-animations</code>](#module_js-css-animations)  
**Returns**: True if the element is hidden, False otherwise  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>Element</code> \| <code>string</code> | Dom element or a valid CSS selector |

