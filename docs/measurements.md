---
title: measurements
---

# measurements

## measurements.js

Handle element's width and height calculations
so that, when an element's visibility changes,
parent element's dimensions can be properly transitioned

- [measurements](#measurements)
  - [measured](#measured)
  - [validateDimension(dimension)](#validatedimension-dimension)
  - [getMarginNumericValue(margin)](#getmarginnumericvalue-margin) ⇒ <code>number</code>
  - [getVertMargin(margins, arrLength)](#getvertmargin-margins-arrlength) ⇒ <code>number</code>
  - [getHorizMargin(margins, arrLength)](#gethorizmargin-margins-arrlength) ⇒ <code>number</code>
  - [getElementMargins(element, axis)](#getelementmargins-element-axis) ⇒ <code>number</code>
  - [getElementMeasure(element, dimension)](#getelementmeasure-element-dimension) ⇒ <code>number</code>
  - [getParentMeasure(element, dimension)](#getparentmeasure-element-dimension) ⇒ <code>Object</code>
  - [getParentMeasures(element)](#getparentmeasures-element) ⇒ <code>Object</code>
  - [setDimensionMax(element, dimension, value)](#setdimensionmax-element-dimension-value)
  - [removeDimensionMax(element, dimension)](#removedimensionmax-element-dimension)
  - [setParentMaxMeasures(args)](#setparentmaxmeasures-args)
  - [DimensionsMeasurements](#dimensionsmeasurements) : <code>Object</code>

### measured

Tracks whether the parent's element measurement should be before or after the element is set to 'display: none'

**Kind**: inner constant of [<code>measurements</code>](#measurements)

### validateDimension(dimension)

Throws a ReferenceError if 'dimension' is neither 'width' nor 'height'

**Kind**: inner method of [<code>measurements</code>](#measurements)

| Param     | Type                | Description                |
| --------- | ------------------- | -------------------------- |
| dimension | <code>string</code> | Either 'width' or 'height' |

### getMarginNumericValue(margin) ⇒ <code>number</code>

Returns only the numeric part of the margin property

**Kind**: inner method of [<code>measurements</code>](#measurements)  
**Returns**: Margin value without unit

| Param  | Type                | Description                      |
| ------ | ------------------- | -------------------------------- |
| margin | <code>string</code> | Margin value along with its unit |

### getVertMargin(margins, arrLength) ⇒ <code>number</code>

Calculates the total margin of an element in the vertical axis

**Kind**: inner method of [<code>measurements</code>](#measurements)  
**Returns**: The sum of top-margin and bottom-margin

| Param     | Type                              | Description                                          |
| --------- | --------------------------------- | ---------------------------------------------------- |
| margins   | <code>Array.&lt;string&gt;</code> | Array containing an element's margin values          |
| arrLength | <code>number</code>               | Number of values declared in the CSS margin property |

### getHorizMargin(margins, arrLength) ⇒ <code>number</code>

Calculates the total margin of an element in the horizontal axis

**Kind**: inner method of [<code>measurements</code>](#measurements)  
**Returns**: The sum of left-margin and right-margin

| Param     | Type                              | Description                                          |
| --------- | --------------------------------- | ---------------------------------------------------- |
| margins   | <code>Array.&lt;string&gt;</code> | Array containing an element's margin values          |
| arrLength | <code>number</code>               | Number of values declared in the CSS margin property |

### getElementMargins(element, axis) ⇒ <code>number</code>

Element's total margin in a given axis

**Kind**: inner method of [<code>measurements</code>](#measurements)  
**Returns**: Total margin in a given axis

| Param   | Type                     | Description                               |
| ------- | ------------------------ | ----------------------------------------- |
| element | <code>HTMLElement</code> | The DOM element to calculate margins from |
| axis    | <code>string</code>      | 'horizontal' or 'vertical' margins        |

### getElementMeasure(element, dimension) ⇒ <code>number</code>

Calculates the total width or height of an element

**Kind**: inner method of [<code>measurements</code>](#measurements)  
**Returns**: The total dimension of an element, including its margins

| Param     | Type                     | Description                |
| --------- | ------------------------ | -------------------------- |
| element   | <code>HTMLElement</code> | The Dom element to measure |
| dimension | <code>string</code>      | Either 'width' or 'height' |

### getParentMeasure(element, dimension) ⇒ <code>Object</code>

Calculates the element's parent dimension before and after 'element' is set to 'display: none'

**Kind**: inner method of [<code>measurements</code>](#measurements)  
**Returns**: An object containing the parent element's dimension before and after the child element is set to 'display: none'

| Param     | Type                     | Description                                            |
| --------- | ------------------------ | ------------------------------------------------------ |
| element   | <code>HTMLElement</code> | The DOM element from which the parent will be measured |
| dimension | <code>string</code>      | Either 'width' or 'height'                             |

### getParentMeasures(element) ⇒ <code>Object</code>

Calculates the width and height of an element's parent,
before and after the element is set to 'display: none'

**Kind**: inner method of [<code>measurements</code>](#measurements)  
**Returns**: An object with the width and height of the parent element

| Param   | Type                     | Description                                           |
| ------- | ------------------------ | ----------------------------------------------------- |
| element | <code>HTMLElement</code> | The DOM element to get the parent's measurements from |

### setDimensionMax(element, dimension, value)

Sets the element's 'max-width' or 'max-height' CSS property

**Kind**: inner method of [<code>measurements</code>](#measurements)

| Param     | Type                                          | Description                                          |
| --------- | --------------------------------------------- | ---------------------------------------------------- |
| element   | <code>HTMLElement</code> \| <code>null</code> | The DOM element to set max-width or max-height value |
| dimension | <code>string</code>                           | Either 'width' or 'height'                           |
| value     | <code>string</code>                           | The CSS property value, in pixels                    |

### removeDimensionMax(element, dimension)

Removes the element's 'max-width' or 'max-height' CSS property

**Kind**: inner method of [<code>measurements</code>](#measurements)

| Param     | Type                                          | Description                                          |
| --------- | --------------------------------------------- | ---------------------------------------------------- |
| element   | <code>HTMLElement</code> \| <code>null</code> | The DOM element to set max-width or max-height value |
| dimension | <code>string</code>                           | Either 'width' or 'height'                           |

### setParentMaxMeasures(args)

Sets element's parent's 'max-width' or 'max-height' property.

If 'dimension' is undefined or different from 'all', 'width' or 'height',
no property will be set.

**Kind**: inner method of [<code>measurements</code>](#measurements)

| Param | Type                | Description                                  |
| ----- | ------------------- | -------------------------------------------- |
| args  | <code>Object</code> | Object containing all the information needed |

### DimensionsMeasurements : <code>Object</code>

**Kind**: inner typedef of [<code>measurements</code>](#measurements)  
**Properties**

| Name   | Type                | Description                                                               |
| ------ | ------------------- | ------------------------------------------------------------------------- |
| height | <code>Object</code> | Element's height before and after child element is set to 'display: none' |
| width  | <code>Object</code> | Element's width before and after child element is set to 'display: none'  |
