---
title: animate
---

# animate

## animate.js

Handles all the animation process

- _export_

  - [init(animationId, opts, eventType)](#init-animationid-opts-eventtype)
  - [end(triggerSelector, eventType)](#end-triggerselector-eventtype)
  - [animate(element, action, id, opts)](#animate-element-action-id-opts)
  - [preset(el, args)](#preset-el-args)
  - [isEnabled(element)](#isenabled-element) ⇒ <code>boolean</code>
  - [removeCustomCssProperties(element)](#removecustomcssproperties-element)
  - [setCssProperty(element, property, value)](#setcssproperty-element-property-value)
  - [updateCssProperties(element, opts)](#updatecssproperties-element-opts)
  - [updateDefaultConfig(opts)](#updatedefaultconfig-opts)
  - [resetDefaultConfig()](#resetdefaultconfig)

- _inner_

  - [configurations](#configurations) : <code>Object</code>
  - [configHandler()](#confighandler)
  - [CONFIG](#config) : <code>Object</code>
  - [DURATION_REGEX](#duration-regex) : <code>RegExp</code>
  - [CALLBACK_TRACKER](#callback-tracker) : <code>Object</code>
  - [TARGETS_STACK](#targets-stack) : <code>Object</code>
  - [getTargetSelector(eventTarget)](#gettargetselector-eventtarget) ⇒ <code>string</code>
  - [getTimeInMs(value)](#gettimeinms-value) ⇒ <code>number</code>
  - [getTotalAnimTime(element)](#gettotalanimtime-element) ⇒ <code>Object</code>
  - [isVisibility(animType)](#isvisibility-animtype) ⇒ <code>boolean</code>
  - [isMotion(animType)](#ismotion-animtype) ⇒ <code>boolean</code>
  - [removeMotionCssClass(element)](#removemotioncssclass-element)
  - [disable(element)](#disable-element)
  - [enable(element)](#enable-element)
  - [hasIterationProp(element)](#hasiterationprop-element) ⇒ <code>boolean</code>
  - [handleVisibilityToggle(element, args)](#handlevisibilitytoggle-element-args)
  - [endVisibilityToggle(element, opts)](#endvisibilitytoggle-element-opts)
  - [initcallback(trigger, fn, type)](#initcallback-trigger-fn-type)
  - [getAction(element, animType)](#getaction-element-animtype) ⇒ <code>string</code> \| <code>null</code>
  - [eventHandler(el, animationId, opts)](#eventhandler-el-animationid-opts) ⇒ <code>function</code>

## init(animationId, opts, eventType)

Initiate the event listener with the animation

**Kind**: static function of [<code>animate</code>](#animate-js)

**See**:

- [globals.VISIBILITY_ANIMS_ID](globals.html#visibility-anims-id)
- [globals.MOTION_ANIMS_ID](globals.html#motion-anims-id)

| Param       | Type                | Default                        | Description                                    |
| ----------- | ------------------- | ------------------------------ | ---------------------------------------------- |
| animationId | <code>number</code> |                                | The ID of the animation in \*\_ANIMS_ID object |
| opts        | <code>Object</code> |                                | All options passed by the user                 |
| eventType   | <code>string</code> | <code>&quot;click&quot;</code> | The event to attach the animation to           |

## end(triggerSelector, eventType)

Removes the event listener of all elements represented by the triggerSelector

**Kind**: static function of [<code>animate</code>](#animate-js)

| Param           | Type                | Default                        | Description                                                                                         |
| --------------- | ------------------- | ------------------------------ | --------------------------------------------------------------------------------------------------- |
| triggerSelector | <code>string</code> | <code>null</code>              | A valid CSS selector for the trigger Element. If ommited, CLASS_NAMES.trigger will be used instead. |
| eventType       | <code>string</code> | <code>&quot;click&quot;</code> | The event name. If ommited, 'click' is the default value.                                           |

## animate(element, action, id, opts)

Handles all the animation process

**Kind**: static function of [<code>animate</code>](#animate-js)

**See**:

- [globals.VISIBILITY_ANIMS_ID](globals.html#visibility-anims-id)
- [globals.MOTION_ANIMS_ID](globals.html#motion-anims-id)

| Param   | Type                                    | Description                                    |
| ------- | --------------------------------------- | ---------------------------------------------- |
| element | <code>HTMLElement</code>                | The DOM element to animate                     |
| action  | <code>string</code>                     | 'show', 'hide', or 'move'                      |
| id      | <code>number</code>                     | ID of an animation in the \*\_ANIMS_ID objects |
| opts    | <code>Object.&lt;string, any&gt;</code> | All the options passed by the user             |

## preset(el, args)

Sets the CSS properties customized by the user,
prior to the begining of the animation

**Kind**: static function of [<code>animate</code>](#animate-js)

| Param | Type                     | Description                                                        |
| ----- | ------------------------ | ------------------------------------------------------------------ |
| el    | <code>HTMLElement</code> | The DOM element being animated                                     |
| args  | <code>Object</code>      | The animation's ID and type and all the options passed by the user |

## isEnabled(element) ⇒ <code>boolean</code>

Verifies if an element is already being animated or not

**Kind**: static function of [<code>animate</code>](#animate-js)

**Returns**: True if the element is not currently being animated

| Param   | Type                     | Description              |
| ------- | ------------------------ | ------------------------ |
| element | <code>HTMLElement</code> | The DOM element to check |

### configurations : <code>Object.&lt;string, any&gt;</code>

Contains the default value for each custom option.
Those values can be overwritten by the user by calling jsCssAnimations.config()
and passing new default values for all the animations.

**Kind**: inner constant of [<code>animate</code>](#animate-js)

**See**: [js-css-animations.config()](js-css-animations.html#config-opts)

### configHandler

ProxyHandler passed to the _CONFIG_ object to ensure that
if an option is not customized by the user, the default value set
in _configurations.default_ will be returned instead.

**Kind**: inner constant of [<code>animate</code>](#animate-js)

**See**

- [CONFIG](#config)
- [configurations](#configurations)

### CONFIG : <code>Object.&lt;string, any&gt;</code>

Object that handles configurations, either customized by the user
or default values defined in _configurations.default_ object

**Kind**: inner constant of [<code>animate</code>](#animate-js)

**See**: [configurations](#configurations)

## DURATION_REGEX : <code>RegExp</code>

Matches duration or delay CSS properties values

**Kind**: inner constant of [<code>animate</code>](#animate-js)

## CALLBACK_TRACKER : <code>Object</code>

Keeps track of the callbacks being executed, preventing the callbacks to be executed
multiple times if multiple elements are being animated by a single trigger.

When an element triggers an animation, no matter how many elements are being animated,
the start() and complete() callbacks should each be executed only once.

**Kind**: inner constant of [<code>animate</code>](#animate-js)

- [CALLBACK_TRACKER](#callback-tracker) : <code>Object</code>
  - [.init(trigger)](#callback-tracker-init-trigger)
  - [.remove(trigger)](#callback-tracker-remove-trigger)
  - [.executing](#callback-tracker-executing) : <code>Object</code>

### CALLBACK_TRACKER.init(trigger)

Initiates the tracker

**Kind**: static function of [<code>CALLBACK_TRACKER</code>](#callback-tracker)

| Param   | Type                | Description                                                               |
| ------- | ------------------- | ------------------------------------------------------------------------- |
| trigger | <code>string</code> | A CSS selector representing the element<br/>which triggered the animation |

### CALLBACK_TRACKER.remove(trigger)

Removes 'trigger' from the tracker

**Kind**: static function of [<code>CALLBACK_TRACKER</code>](#callback-tracker)

| Param   | Type                | Description                                                               |
| ------- | ------------------- | ------------------------------------------------------------------------- |
| trigger | <code>string</code> | A CSS selector representing the element<br/>which triggered the animation |

## TARGETS_STACK : <code>Object</code>

Keeps track of all the targets being animated to ensure that the callback tracker
will be removed only when all the targets have been animated. Also ensures that
all targets will be re-enabled only when all targets have already been animated.

**Kind**: inner constant of [<code>animate</code>](#animate-js)

- [TARGETS_STACK](#targets-stack) : <code>Object</code>
  - [.add(elem, trigger)](#targets-stack-add-elem-trigger)
  - [.remove(trigger)](#targets-stack-remove-trigger)
  - [.get(trigger)](#targets-stack-get-trigger) ⇒ <code>Array.&lt;HTMLElement&gt;</code>

### TARGETS_STACK.add(elem, trigger)

Adds an element to the stack

**Kind**: static function of [<code>TARGETS_STACK</code>](#targets-stack)

| Param   | Type                     | Description                                               |
| ------- | ------------------------ | --------------------------------------------------------- |
| elem    | <code>HTMLElement</code> | Element being animated                                    |
| trigger | <code>string</code>      | CSS selector for the element that triggered the animation |

### TARGETS_STACK.remove(trigger)

Removes from the stack all the elements animated by the same trigger button

**Kind**: static function of [<code>TARGETS_STACK</code>](#targets-stack)

| Param   | Type                | Description                                               |
| ------- | ------------------- | --------------------------------------------------------- |
| trigger | <code>string</code> | CSS selector for the element that triggered the animation |

### TARGETS_STACK.get(trigger) ⇒ <code>Array.&lt;HTMLElement&gt;</code>

Gets all elements included in the stack for a given trigger button

**Kind**: static function of [<code>TARGETS_STACK</code>](#targets-stack)

**Returns**: An array of elements that have been animated by the same trigger button

| Param   | Type                | Description                                               |
| ------- | ------------------- | --------------------------------------------------------- |
| trigger | <code>string</code> | CSS selector for the element that triggered the animation |

### updateDefaultConfig(opts)

Customize the default animations configurations by overwriting
the _CONFIG_ values

**Kind**: inner method of [<code>animate</code>](#animate-js)

**See**: [CONFIG](#config)

| Param | Type                | Description                            |
| ----- | ------------------- | -------------------------------------- |
| opts  | <code>Object</code> | All the options customized by the user |

### resetDefaultConfig()

Reset the configurations to its default values
by removing from _CONFIG_ all options customized by the user

**Kind**: inner method of [<code>animate</code>](#animate-js)

**See**: [CONFIG](#config)

## removeCustomCssProperties(element)

Removes the CSS properties customized by the user

**Kind**: static function of [<code>animate</code>](#animate-js)

| Param   | Type                     | Description                                    |
| ------- | ------------------------ | ---------------------------------------------- |
| element | <code>HTMLElement</code> | The DOM element with the custom CSS properties |

## setCssProperty(element, property, value)

Sets an inline CSS property

**Kind**: static function of [<code>animate</code>](#animate-js)

**See**: [globals.PROPERTY_NAMES](globals.html#property-names)

| Param    | Type                     | Description                                     |
| -------- | ------------------------ | ----------------------------------------------- |
| element  | <code>HTMLElement</code> | The DOM element which will receive the property |
| property | <code>string</code>      | Property key in the PROPERTY_NAMES object       |
| value    | <code>string</code>      | Value of the CSS Property                       |

## updateCssProperties(element, opts)

Sets the CSS properties customized by the user in the animation function's options

**Kind**: static function of [<code>animate</code>](#animate-js)

| Param   | Type                                       | Description                                                           |
| ------- | ------------------------------------------ | --------------------------------------------------------------------- |
| element | <code>HTMLElement</code>                   | The DOM element to update the CSS Properties                          |
| opts    | <code>Object.&lt;string, string&gt;</code> | Object containing a custom property key and a CSS value to be updated |

## getTargetSelector(eventTarget) ⇒ <code>string</code>

Searches and returns the 'target-selector' attribute

If the element which triggered the event doesn't have the attribute,
will bubbles up untill the attribute is found.
If no attribute is found, an empty string is returned and so
no element will be selected to be animated

**Kind**: inner method of [<code>animate</code>](#animate-js)

**Returns**: The CSS selector for the animation target(s) or an empty string

| Param       | Type                     | Description                             |
| ----------- | ------------------------ | --------------------------------------- |
| eventTarget | <code>HTMLElement</code> | The DOM element wich triggers the event |

## getTimeInMs(value) ⇒ <code>number</code>

Removes the unit from the duration or delay and returns the value in milliseconds

**Kind**: inner method of [<code>animate</code>](#animate-js)

**Returns**: The duration or delay in milliseconds

| Param | Type                | Description                          |
| ----- | ------------------- | ------------------------------------ |
| value | <code>string</code> | duration or delay CSS property value |

## getTotalAnimTime(element) ⇒ <code>Object</code>

Returns an object with the duration and delay time in milliseconds

**Kind**: inner method of [<code>animate</code>](#animate-js)

**Returns**: Both the duration and delay, in milliseconds

| Param   | Type                     | Description                    |
| ------- | ------------------------ | ------------------------------ |
| element | <code>HTMLElement</code> | The DOM element being animated |

## isVisibility(animType) ⇒ <code>boolean</code>

Returns true if the animation type is 'visibility'

**Kind**: inner method of [<code>animate</code>](#animate-js)

**Returns**: True if animation type is 'visibility'. False otherwise.

| Param    | Type                | Description                     |
| -------- | ------------------- | ------------------------------- |
| animType | <code>string</code> | Either 'motion' or 'visibility' |

## isMotion(animType) ⇒ <code>boolean</code>

Returns true if the animation type is 'motion'

**Kind**: inner method of [<code>animate</code>](#animate-js)

**Returns**: True if animation type is 'motion'. False otherwise.

| Param    | Type                | Description                     |
| -------- | ------------------- | ------------------------------- |
| animType | <code>string</code> | Either 'motion' or 'visibility' |

## removeMotionCssClass(element)

Removes the current motion animation CSS class from the element

**Kind**: inner method of [<code>animate</code>](#animate-js)

| Param   | Type                     | Description                    |
| ------- | ------------------------ | ------------------------------ |
| element | <code>HTMLElement</code> | The DOM element being animated |

## disable(element)

Sets an attribute to indicate that the element is currently being animated
and so can not perform any other animations

**Kind**: inner method of [<code>animate</code>](#animate-js)

| Param   | Type                     | Description                    |
| ------- | ------------------------ | ------------------------------ |
| element | <code>HTMLElement</code> | The DOM element being animated |

## enable(element)

Removes the attribute that indicates that an element is currently being animated

**Kind**: inner method of [<code>animate</code>](#animate-js)

| Param   | Type                     |
| ------- | ------------------------ |
| element | <code>HTMLElement</code> |

## hasIterationProp(element) ⇒ <code>boolean</code>

Verifies if an element has defined an iteration CSS property

**Kind**: inner method of [<code>animate</code>](#animate-js)

**Returns**: True if the element has an iteration CSS property set, False otherwise

| Param   | Type                     |
| ------- | ------------------------ |
| element | <code>HTMLElement</code> |

## handleVisibilityToggle(element, args)

Sets the parent element dimensions, if needed.

Removes the collapsed or hidden class from the element, when necessary

**Kind**: inner method of [<code>animate</code>](#animate-js)

| Param   | Type                     | Description                    |
| ------- | ------------------------ | ------------------------------ |
| element | <code>HTMLElement</code> | The DOM element being animated |
| args    | <code>Object</code>      | All the necessary arguments    |

## endVisibilityToggle(element, opts)

Adds the hidden or collapsed class, when necessary.
Finalize parent element's resize operations, if needed.

**Kind**: inner method of [<code>animate</code>](#animate-js)

| Param   | Type                     | Description                    |
| ------- | ------------------------ | ------------------------------ |
| element | <code>HTMLElement</code> | The DOM element being animated |
| opts    | <code>Object</code>      | All the necessary options      |

## initCallback(trigger, fn, type)

Executes a given callback, checking, when necessary, if the callback was already
executed by another element being animated by the same trigger button

**Kind**: inner method of [<code>animate</code>](#animate-js)

| Param   | Type                  | Description                                                  |
| ------- | --------------------- | ------------------------------------------------------------ |
| trigger | <code>string</code>   | The CSS selector of the element that triggered the animation |
| fn      | <code>function</code> | The callback to execute                                      |
| type    | <code>string</code>   | Either 'start' or 'complete'                                 |

## getAction(element, animType) ⇒ <code>string</code> \| <code>null</code>

Checks which animation CSS class is set to determine wich action to perform next

**Kind**: inner method of [<code>animate</code>](#animate-js)

**Returns**: 'show' or 'hide' or 'move' or 'moveBack'

| Param    | Type                     | Description                     |
| -------- | ------------------------ | ------------------------------- |
| element  | <code>HTMLElement</code> | The DOM element being animated  |
| animType | <code>\*</code>          | Either 'motion' or 'visibility' |

## eventHandler(el, animationId, opts) ⇒ <code>function</code>

Generates the handler function to be passed to the event listener

**Kind**: inner method of [<code>animate</code>](#animate-js)

**Returns**: A function to be passed to the addEventListener() as a handler

**See**:

- [globals.VISIBILITY_ANIMS_ID](globals.html#visibility-anims-id)
- [globals.MOTION_ANIMS_ID](globals.html#motion-anims-id)

| Param       | Type                     | Description                                 |
| ----------- | ------------------------ | ------------------------------------------- |
| el          | <code>HTMLElement</code> | The DOM element being animated              |
| animationId | <code>number</code>      | The ID of the animation in the \*\_ANIMS_ID |
| opts        | <code>Object</code>      | The options passed by the user              |
