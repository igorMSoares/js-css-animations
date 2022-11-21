---
title: transitions
---

# transitions

## transitions.js

Handle user defined transitions to not conflict with js-css-animations transitions

- [transitions](#transitions)
  - _static_
    - [.getCurrentTransition](#getcurrenttransition) ⇒ <code>string</code> \| <code>null</code>
    - [.getClassTransition](#getclasstransition) ⇒ <code>string</code>
    - [.appendTransition](#appendtransition)
    - [.setDimensionsTransitions](#setdimensionstransitions)
    - [.removeInlineTransition](#removeinlinetransition)
    - [.removeDimensionsTransitions](#removedimensionstransitions)
  - _inner_
    - [~getAllTransitions(cssProperties)](#getalltransitions-cssproperties) ⇒ <code>string</code>
      - [~transitions](#getalltransitions-transitions) : <code>Object</code>
      - [~properties](#getalltransitions-properties) : <code>Array.&lt;string&gt;</code>
    - [~getTransitionClassName(wTransit, hTransit)](#gettransitionclassname-wtransit-htransit) ⇒ <code>string</code> \| <code>undefined</code>

### getCurrentTransition ⇒ <code>string</code> \| <code>null</code>

Gets user defined transitions of an element, if any

**Kind**: static constant of [<code>transitions</code>](#transitions)  
**Returns**: <code>string</code> \| <code>null</code> - All user defined transitions combined into single shorthand
property or null if there's no transition defined by the user

| Param   | Type                     |
| ------- | ------------------------ |
| element | <code>HTMLElement</code> |

### getClassTransition ⇒ <code>string</code>

Gets the transition in a given CSS class

**Kind**: static constant of [<code>transitions</code>](#transitions)  
**Returns**: <code>string</code> - A shorthand value for CSS transition property

| Param     | Type                | Description                       |
| --------- | ------------------- | --------------------------------- |
| className | <code>string</code> | Name of the animation's CSS class |

### appendTransition

If an element already has any transition defined, other than that in className,
the current transition(s) will be appended to the className transition so that
no transition will be overwritten

**Kind**: static constant of [<code>transitions</code>](#transitions)

| Param          | Type                     | Description                                                                            |
| -------------- | ------------------------ | -------------------------------------------------------------------------------------- |
| element        | <code>HTMLElement</code> | The DOM element to append the transition                                               |
| className      | <code>string</code>      | CSS class with a transition to append to other transitions                             |
| currTransition | <code>string</code>      | Transition(s) already defined to element, before it receives the new class (className) |

### setDimensionsTransitions

Appends the appropriate CSS class to handle dimension transitions.
If wTransit and hTransit are both set to false, no class will be appended.

**Kind**: static constant of [<code>transitions</code>](#transitions)

| Param    | Type                     | Description                                |
| -------- | ------------------------ | ------------------------------------------ |
| element  | <code>HTMLElement</code> | The DOM element to set the transition      |
| wTransit | <code>boolean</code>     | Indicates if should have width transition  |
| hTransit | <code>boolean</code>     | Indicates if should have height transition |

### removeInlineTransition

If element has an inline css transition appended by appendTransition()
the inline transition property will be removed to reset the element back
to its previous state

**Kind**: static constant of [<code>transitions</code>](#transitions)  
**See**: module:transitions.appendTransition

| Param   | Type                     | Description                              |
| ------- | ------------------------ | ---------------------------------------- |
| element | <code>HTMLElement</code> | The DOM element to remove the transition |

### removeDimensionsTransitions

Removes the CSS class added by setDimensionsTransitions(), if any

**Kind**: static constant of [<code>transitions</code>](#transitions)  
**See**: module:transitions.setDimensionsTransitions

| Param    | Type                     | Description                                    |
| -------- | ------------------------ | ---------------------------------------------- |
| element  | <code>HTMLElement</code> | The DOM element to remove the transitions      |
| wTransit | <code>boolean</code>     | Indicates wheter there was a width transition  |
| hTransit | <code>boolean</code>     | Indicates wheter there was a height transition |

### getAllTransitions(cssProperties) ⇒ <code>string</code>

Parses all CSS properties and combine all transitions into one valid shorthand value
for 'transition' CSS property

**Kind**: inner method of [<code>transitions</code>](#transitions)  
**Returns**: <code>string</code> - All transitions combined into a single shorthand property

| Param         | Type                             | Description               |
| ------------- | -------------------------------- | ------------------------- |
| cssProperties | <code>CSSStyleDeclaration</code> | A collection of CSS rules |

- [~getAllTransitions(cssProperties)](#getalltransitions) ⇒ <code>string</code>
  - [~transitions](#getalltransitions-transitions) : <code>Object</code>
  - [~properties](#getalltransitions-properties) : <code>Array.&lt;string&gt;</code>

#### getAllTransitions~transitions : <code>Object</code>

**Kind**: inner constant of [<code>getAllTransitions</code>](#getalltransitions)

#### getAllTransitions~properties : <code>Array.&lt;string&gt;</code>

**Kind**: inner constant of [<code>getAllTransitions</code>](#getalltransitions)

### getTransitionClassName(wTransit, hTransit) ⇒ <code>string</code> \| <code>undefined</code>

Verifies wether there should be widht or height transition, or both, or none

**Kind**: inner method of [<code>transitions</code>](#transitions)  
**Returns**: <code>string</code> \| <code>undefined</code> - The name of the class with the respective transition, or undefined if there should be no transitions

| Param    | Type                 | Description                                   |
| -------- | -------------------- | --------------------------------------------- |
| wTransit | <code>boolean</code> | Indicates if it should have width transition  |
| hTransit | <code>boolean</code> | Indicates if it should have height transition |
