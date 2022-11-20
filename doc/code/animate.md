---
title: animate
---

# animate

## Constants

<dl>
<dt><a href="#DURATION_REGEX">DURATION_REGEX</a></dt>
<dd><p>Matches duration or delay CSS properties values</p>
</dd>
<dt><a href="#CALLBACK_TRACKER">CALLBACK_TRACKER</a> : <code>Object</code></dt>
<dd><p>Keeps track of the callbacks being executed, preventing the callbacks to be executed
multiple times if multiple elements are being animated by a single trigger.</p>
<p>When a button triggers an animation, no matter how many elements are being animated,
the start() and complete() callbacks should each be executed only once.</p>
</dd>
<dt><a href="#TARGETS_STACK">TARGETS_STACK</a> : <code>Object</code></dt>
<dd><p>Keeps track of all the targets being animated to ensure that the callback tracker
will be removed only when all the targets have been animated. Also ensures that
all targets will be re-enabled only when all targets have already been animated.</p>
</dd>
<dt><a href="#removeCustomCssProperties">removeCustomCssProperties</a></dt>
<dd><p>Removes the CSS properties customized by the user</p>
</dd>
<dt><a href="#setCssProperty">setCssProperty</a></dt>
<dd><p>Sets an inline CSS property</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#init">init(btn)</a></dt>
<dd><p>Initiates the tracker</p>
</dd>
<dt><a href="#remove">remove(btn)</a></dt>
<dd><p>Removes &#39;btn&#39; from the tracker</p>
</dd>
<dt><a href="#updateCssProperties">updateCssProperties(element, opts)</a></dt>
<dd><p>Sets the CSS properties customized by the user in the animation function&#39;s options</p>
</dd>
<dt><a href="#getTargetSelector">getTargetSelector(eventTarget)</a> ⇒</dt>
<dd><p>Searches and returns the &#39;target-selector&#39; attribute</p>
<p>If the element which triggered the event doesn&#39;t have the attribute,
will bubbles up untill the attribute is found.
If no attribute is found, an empty string is returned and so
no element will be selected to be animated</p>
</dd>
<dt><a href="#getTimeInMs">getTimeInMs(value)</a> ⇒</dt>
<dd><p>Removes the unit from the duration or delay and returns the value in milliseconds</p>
</dd>
<dt><a href="#getTotalAnimTime">getTotalAnimTime(element)</a> ⇒</dt>
<dd><p>Returns an object with the duration and delay time in milliseconds</p>
</dd>
<dt><a href="#isVisibility">isVisibility(animType)</a> ⇒</dt>
<dd><p>Returns true if the animation type is &#39;visibility&#39;</p>
</dd>
<dt><a href="#isMotion">isMotion(animType)</a> ⇒</dt>
<dd><p>Returns true if the animation type is &#39;motion&#39;</p>
</dd>
<dt><a href="#removeMotionCssClass">removeMotionCssClass(element)</a></dt>
<dd><p>Removes the current motion animation CSS class from the element</p>
</dd>
<dt><a href="#disable">disable(element)</a></dt>
<dd><p>Sets an attribute to indicate that the element is currently being animated
and so can not perform any other animations</p>
</dd>
<dt><a href="#enable">enable(element)</a></dt>
<dd><p>Removes the attribute that indicates that an element is currently being animated</p>
</dd>
<dt><a href="#isEnabled">isEnabled(element)</a> ⇒</dt>
<dd><p>Verifies if an element is already being animated or not</p>
</dd>
<dt><a href="#hasIterationProp">hasIterationProp(element)</a> ⇒</dt>
<dd><p>Verifies if an element has defined an iteration CSS property</p>
</dd>
<dt><a href="#handleVisibilityToggle">handleVisibilityToggle(element, args)</a></dt>
<dd><p>Sets the parent element dimensions, if needed.</p>
<p>Removes the collapsed or hidden class from the element, when necessary</p>
</dd>
<dt><a href="#endVisibilityToggle">endVisibilityToggle(element, opts)</a></dt>
<dd><p>Adds the hidden or collapsed class, when necessary.
Finalize parent element&#39;s resize operations, if needed.</p>
</dd>
<dt><a href="#initCallback">initCallback(btn, fn, type)</a></dt>
<dd><p>Executes a given callback, checking, when necessary, if the callback was already
executed by another element being animated by the same trigger button</p>
</dd>
<dt><a href="#animate">animate(element, action, id, opts)</a></dt>
<dd><p>Handles all the animation process</p>
</dd>
<dt><a href="#getAction">getAction(element, animType)</a> ⇒</dt>
<dd><p>Checks which animation CSS class is set to determine wich action to perform next</p>
</dd>
<dt><a href="#preset">preset(el, args)</a></dt>
<dd><p>Sets the CSS properties customized by the user,
prior to the begining of the animation</p>
</dd>
<dt><a href="#eventHandler">eventHandler(el, animationId, opts)</a> ⇒</dt>
<dd><p>Generates the handler function to be passed to the event listener</p>
</dd>
<dt><a href="#init">init(animationId, opts, eventType)</a></dt>
<dd><p>Initiate the event listener with the animation</p>
</dd>
</dl>

<a name="DURATION_REGEX"></a>

## DURATION\_REGEX
Matches duration or delay CSS properties values

**Kind**: global constant  
<a name="CALLBACK_TRACKER"></a>

## CALLBACK\_TRACKER : <code>Object</code>
Keeps track of the callbacks being executed, preventing the callbacks to be executedmultiple times if multiple elements are being animated by a single trigger.When a button triggers an animation, no matter how many elements are being animated,the start() and complete() callbacks should each be executed only once.

**Kind**: global constant  
<a name="TARGETS_STACK"></a>

## TARGETS\_STACK : <code>Object</code>
Keeps track of all the targets being animated to ensure that the callback trackerwill be removed only when all the targets have been animated. Also ensures thatall targets will be re-enabled only when all targets have already been animated.

**Kind**: global constant  

* [TARGETS_STACK](#TARGETS_STACK) : <code>Object</code>
    * [.add(elem, btn)](#TARGETS_STACK.add)
    * [.remove(btn)](#TARGETS_STACK.remove)
    * [.get(btn)](#TARGETS_STACK.get) ⇒

<a name="TARGETS_STACK.add"></a>

### TARGETS_STACK.add(elem, btn)
Adds an element to the stack

**Kind**: static method of [<code>TARGETS\_STACK</code>](#TARGETS_STACK)  

| Param | Type | Description |
| --- | --- | --- |
| elem | <code>HTMLElement</code> | Element being animated |
| btn | <code>string</code> | Button that triggered the animation |

<a name="TARGETS_STACK.remove"></a>

### TARGETS_STACK.remove(btn)
Removes from the stack all the elements animated by the same trigger button

**Kind**: static method of [<code>TARGETS\_STACK</code>](#TARGETS_STACK)  

| Param | Type | Description |
| --- | --- | --- |
| btn | <code>string</code> | Button that triggered the animation |

<a name="TARGETS_STACK.get"></a>

### TARGETS_STACK.get(btn) ⇒
Gets all elements included in the stack for a given trigger button

**Kind**: static method of [<code>TARGETS\_STACK</code>](#TARGETS_STACK)  
**Returns**: An array of elements that have been animated by the same trigger button  

| Param | Type | Description |
| --- | --- | --- |
| btn | <code>string</code> | Button that triggered the animation |

<a name="removeCustomCssProperties"></a>

## removeCustomCssProperties
Removes the CSS properties customized by the user

**Kind**: global constant  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>HTMLElement</code> | The DOM element with the custom CSS properties |

<a name="setCssProperty"></a>

## setCssProperty
Sets an inline CSS property

**Kind**: global constant  
**See**: [module:globals.PROPERTY_NAMES](module:globals.PROPERTY_NAMES)  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>HTMLElement</code> | The DOM element which will receive the property |
| property | <code>string</code> | Property key in the PROPERTY_NAMES object |
| value | <code>string</code> | Value of the CSS Property |

<a name="init"></a>

## init(btn)
Initiates the tracker

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| btn | <code>string</code> | A CSS selector representing the trigger button element |

<a name="remove"></a>

## remove(btn)
Removes 'btn' from the tracker

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| btn | <code>string</code> | A CSS selector representing the trigger button element |

<a name="updateCssProperties"></a>

## updateCssProperties(element, opts)
Sets the CSS properties customized by the user in the animation function's options

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>HTMLElement</code> | The DOM element to update the CSS Properties |
| opts | <code>Object.&lt;string, string&gt;</code> | Object containing a custom property key and a CSS value to be updated |

<a name="getTargetSelector"></a>

## getTargetSelector(eventTarget) ⇒
Searches and returns the 'target-selector' attributeIf the element which triggered the event doesn't have the attribute,will bubbles up untill the attribute is found.If no attribute is found, an empty string is returned and sono element will be selected to be animated

**Kind**: global function  
**Returns**: The CSS selector for the animation target(s) or an empty string  

| Param | Type | Description |
| --- | --- | --- |
| eventTarget | <code>HTMLElement</code> | The DOM element wich triggers the event |


* [getTargetSelector(eventTarget)](#getTargetSelector) ⇒
    * [~trigger](#getTargetSelector..trigger) : <code>HTMLElement</code> \| <code>null</code>
    * [~trigger](#getTargetSelector..trigger)

<a name="getTargetSelector..trigger"></a>

### getTargetSelector~trigger : <code>HTMLElement</code> \| <code>null</code>
**Kind**: inner property of [<code>getTargetSelector</code>](#getTargetSelector)  
<a name="getTargetSelector..trigger"></a>

### getTargetSelector~trigger
bubbles up untill the attribute is found

**Kind**: inner property of [<code>getTargetSelector</code>](#getTargetSelector)  
<a name="getTimeInMs"></a>

## getTimeInMs(value) ⇒
Removes the unit from the duration or delay and returns the value in milliseconds

**Kind**: global function  
**Returns**: The duration or delay in milliseconds  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>string</code> | duration or delay CSS property value |

<a name="getTotalAnimTime"></a>

## getTotalAnimTime(element) ⇒
Returns an object with the duration and delay time in milliseconds

**Kind**: global function  
**Returns**: Both the duration and delay, in milliseconds  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>HTMLElement</code> | The DOM element being animated |

<a name="isVisibility"></a>

## isVisibility(animType) ⇒
Returns true if the animation type is 'visibility'

**Kind**: global function  
**Returns**: True if animation type is 'visibility'. False otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| animType | <code>string</code> | Either 'motion' or 'visibility' |

<a name="isMotion"></a>

## isMotion(animType) ⇒
Returns true if the animation type is 'motion'

**Kind**: global function  
**Returns**: True if animation type is 'motion'. False otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| animType | <code>string</code> | Either 'motion' or 'visibility' |

<a name="removeMotionCssClass"></a>

## removeMotionCssClass(element)
Removes the current motion animation CSS class from the element

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>HTMLElement</code> | The DOM element being animated |

<a name="disable"></a>

## disable(element)
Sets an attribute to indicate that the element is currently being animatedand so can not perform any other animations

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>HTMLElement</code> | The DOM element being animated |

<a name="enable"></a>

## enable(element)
Removes the attribute that indicates that an element is currently being animated

**Kind**: global function  

| Param | Type |
| --- | --- |
| element | <code>HTMLElement</code> | 

<a name="isEnabled"></a>

## isEnabled(element) ⇒
Verifies if an element is already being animated or not

**Kind**: global function  
**Returns**: True if the element is not currently being animated  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>HTMLElement</code> | The DOM element to check |

<a name="hasIterationProp"></a>

## hasIterationProp(element) ⇒
Verifies if an element has defined an iteration CSS property

**Kind**: global function  
**Returns**: True if the element has an iteration CSS property set, False otherwise  

| Param | Type |
| --- | --- |
| element | <code>HTMLElement</code> | 

<a name="handleVisibilityToggle"></a>

## handleVisibilityToggle(element, args)
Sets the parent element dimensions, if needed.Removes the collapsed or hidden class from the element, when necessary

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>HTMLElement</code> | The DOM element being animated |
| args | <code>Object</code> | All the necessary arguments |

<a name="endVisibilityToggle"></a>

## endVisibilityToggle(element, opts)
Adds the hidden or collapsed class, when necessary.Finalize parent element's resize operations, if needed.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>HTMLElement</code> | The DOM element being animated |
| opts | <code>Object</code> | All the necessary options |

<a name="initCallback"></a>

## initCallback(btn, fn, type)
Executes a given callback, checking, when necessary, if the callback was alreadyexecuted by another element being animated by the same trigger button

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| btn | <code>string</code> | The button that triggered the animation |
| fn | <code>function</code> | The callback to execute |
| type | <code>string</code> | Either 'start' or 'complete' |

<a name="animate"></a>

## animate(element, action, id, opts)
Handles all the animation process

**Kind**: global function  
**See**

- [module:globals.VISIBILITY_ANIMS_ID](module:globals.VISIBILITY_ANIMS_ID)
- [module:globals.MOTION_ANIMS_ID](module:globals.MOTION_ANIMS_ID)


| Param | Type | Description |
| --- | --- | --- |
| element | <code>HTMLElement</code> | The DOM element to animate |
| action | <code>string</code> | 'show', 'hide', or 'move' |
| id | <code>number</code> | ID of an animation in the *_ANIMS_ID objects |
| opts | <code>Object.&lt;string, any&gt;</code> | All the options passed by the user |

<a name="getAction"></a>

## getAction(element, animType) ⇒
Checks which animation CSS class is set to determine wich action to perform next

**Kind**: global function  
**Returns**: 'show' or 'hide' or 'move' or 'moveBack'  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>HTMLElement</code> | The DOM element being animated |
| animType | <code>\*</code> | Either 'motion' or 'visibility' |

<a name="preset"></a>

## preset(el, args)
Sets the CSS properties customized by the user,prior to the begining of the animation

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| el | <code>HTMLElement</code> | The DOM element being animated |
| args | <code>Object</code> | The animation's ID and type and all the options passed by the user |

<a name="eventHandler"></a>

## eventHandler(el, animationId, opts) ⇒
Generates the handler function to be passed to the event listener

**Kind**: global function  
**Returns**: A function to be passed to the addEventListener() as a handler  
**See**

- [module:globals.VISIBILITY_ANIMS_ID](module:globals.VISIBILITY_ANIMS_ID)
- [module:globals.MOTION_ANIMS_ID](module:globals.MOTION_ANIMS_ID)


| Param | Type | Description |
| --- | --- | --- |
| el | <code>HTMLElement</code> | The DOM element being animated |
| animationId | <code>number</code> | The ID of the animation in the *_ANIMS_ID |
| opts | <code>Object</code> | The options passed by the user |

<a name="init"></a>

## init(animationId, opts, eventType)
Initiate the event listener with the animation

**Kind**: global function  
**See**

- [module:globals.VISIBILITY_ANIMS_ID](module:globals.VISIBILITY_ANIMS_ID)
- [module:globals.MOTION_ANIMS_ID](module:globals.MOTION_ANIMS_ID)


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| animationId | <code>number</code> |  | The ID of the animation in *_ANIMS_ID object |
| opts | <code>Object</code> |  | All options passed by the user |
| eventType | <code>string</code> | <code>&quot;click&quot;</code> | The event to attach the animation to |

