---
title: measurements
---

# measurements

<a name="module_measurements"></a>

## measurements
Handle element's width and height calculationsso that, when an element's visibility changes,parent element's dimensions can be properly transitioned


* [measurements](#module_measurements)
    * [~measured](#module_measurements..measured)
    * [~validateDimension(dimension)](#module_measurements..validateDimension)
    * [~getMarginNumericValue(margin)](#module_measurements..getMarginNumericValue) ⇒
    * [~getVertMargin(margins, arrLength)](#module_measurements..getVertMargin) ⇒
    * [~getHorizMargin(margins, arrLength)](#module_measurements..getHorizMargin) ⇒
    * [~getElementMargins(element, axis)](#module_measurements..getElementMargins) ⇒
    * [~getElementMeasure(element, dimension)](#module_measurements..getElementMeasure) ⇒
    * [~getParentMeasure(element, dimension)](#module_measurements..getParentMeasure) ⇒
    * [~getParentMeasures(element)](#module_measurements..getParentMeasures) ⇒
    * [~setDimensionMax(element, dimension, value)](#module_measurements..setDimensionMax)
    * [~removeDimensionMax(element, dimension)](#module_measurements..removeDimensionMax)
    * [~setParentMaxMeasures(args)](#module_measurements..setParentMaxMeasures)
    * [~DimensionsMeasurements](#module_measurements..DimensionsMeasurements) : <code>Object</code>

<a name="module_measurements..measured"></a>

### measurements~measured
Tracks whether the parent's element measurement should be before or after the element is set to 'display: none'

**Kind**: inner constant of [<code>measurements</code>](#module_measurements)  
<a name="module_measurements..validateDimension"></a>

### measurements~validateDimension(dimension)
Throws a ReferenceError if 'dimension' is neither 'width' nor 'height'

**Kind**: inner method of [<code>measurements</code>](#module_measurements)  

| Param | Type | Description |
| --- | --- | --- |
| dimension | <code>string</code> | Either 'width' or 'height' |

<a name="module_measurements..getMarginNumericValue"></a>

### measurements~getMarginNumericValue(margin) ⇒
Returns only the numeric part of the margin property

**Kind**: inner method of [<code>measurements</code>](#module_measurements)  
**Returns**: Margin value without unit  

| Param | Type | Description |
| --- | --- | --- |
| margin | <code>string</code> | Margin value along with its unit |

<a name="module_measurements..getVertMargin"></a>

### measurements~getVertMargin(margins, arrLength) ⇒
Calculates the total margin of an element in the vertical axis

**Kind**: inner method of [<code>measurements</code>](#module_measurements)  
**Returns**: The sum of top-margin and bottom-margin  

| Param | Type | Description |
| --- | --- | --- |
| margins | <code>Array.&lt;string&gt;</code> | Array containing an element's margin values |
| arrLength | <code>number</code> | Number of values declared in the CSS margin property |

<a name="module_measurements..getHorizMargin"></a>

### measurements~getHorizMargin(margins, arrLength) ⇒
Calculates the total margin of an element in the horizontal axis

**Kind**: inner method of [<code>measurements</code>](#module_measurements)  
**Returns**: The sum of left-margin and right-margin  

| Param | Type | Description |
| --- | --- | --- |
| margins | <code>Array.&lt;string&gt;</code> | Array containing an element's margin values |
| arrLength | <code>number</code> | Number of values declared in the CSS margin property |

<a name="module_measurements..getElementMargins"></a>

### measurements~getElementMargins(element, axis) ⇒
Element's total margin in a given axis

**Kind**: inner method of [<code>measurements</code>](#module_measurements)  
**Returns**: Total margin in a given axis  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>HTMLElement</code> | The DOM element to calculate margins from |
| axis | <code>string</code> | 'horizontal' or 'vertical' margins |

<a name="module_measurements..getElementMeasure"></a>

### measurements~getElementMeasure(element, dimension) ⇒
Calculates the total width or height of an element

**Kind**: inner method of [<code>measurements</code>](#module_measurements)  
**Returns**: The total dimension of an element, including its margins  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>HTMLElement</code> | The Dom element to measure |
| dimension | <code>string</code> | Either 'width' or 'height' |

<a name="module_measurements..getParentMeasure"></a>

### measurements~getParentMeasure(element, dimension) ⇒
Calculates the element's parent dimension before and after 'element' is set to 'display: none'

**Kind**: inner method of [<code>measurements</code>](#module_measurements)  
**Returns**: An object containing the parent element's dimension before and after the child element is set to 'display: none'  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>HTMLElement</code> | The DOM element from which the parent will be measured |
| dimension | <code>string</code> | Either 'width' or 'height' |

<a name="module_measurements..getParentMeasures"></a>

### measurements~getParentMeasures(element) ⇒
Calculates the width and height of an element's parent,before and after the element is set to 'display: none'

**Kind**: inner method of [<code>measurements</code>](#module_measurements)  
**Returns**: An object with the width and height of the parent element  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>HTMLElement</code> | The DOM element to get the parent's measurements from |

<a name="module_measurements..setDimensionMax"></a>

### measurements~setDimensionMax(element, dimension, value)
Sets the element's 'max-width' or 'max-height' CSS property

**Kind**: inner method of [<code>measurements</code>](#module_measurements)  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>HTMLElement</code> \| <code>null</code> | The DOM element to set max-width or max-height value |
| dimension | <code>string</code> | Either 'width' or 'height' |
| value | <code>string</code> | The CSS property value, in pixels |

<a name="module_measurements..removeDimensionMax"></a>

### measurements~removeDimensionMax(element, dimension)
Removes the element's 'max-width' or 'max-height' CSS property

**Kind**: inner method of [<code>measurements</code>](#module_measurements)  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>HTMLElement</code> \| <code>null</code> | The DOM element to set max-width or max-height value |
| dimension | <code>string</code> | Either 'width' or 'height' |

<a name="module_measurements..setParentMaxMeasures"></a>

### measurements~setParentMaxMeasures(args)
Sets element's parent's 'max-width' or 'max-height' property.If 'dimension' is undefined or different from 'all', 'width' or 'height',no property will be set.

**Kind**: inner method of [<code>measurements</code>](#module_measurements)  

| Param | Type | Description |
| --- | --- | --- |
| args | <code>Object</code> | Object containing all the information needed |

<a name="module_measurements..DimensionsMeasurements"></a>

### measurements~DimensionsMeasurements : <code>Object</code>
**Kind**: inner typedef of [<code>measurements</code>](#module_measurements)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| height | <code>Object</code> | Element's height before and after child element is set to 'display: none' |
| width | <code>Object</code> | Element's width before and after child element is set to 'display: none' |

