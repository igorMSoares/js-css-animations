---
title: globals
---

# globals

## globals.js

Global Constants

- [.VISIBILITY_ANIMS_ID](#globals-visibility-anims-id) : <code>Object.&lt;string, number&gt;</code>
- [.MOTION_ANIMS_ID](#globals-motion-anims-id) : <code>Object.&lt;string, number&gt;</code>
- [.PROPERTY_NAMES](#globals-property-names) : <code>Object.&lt;string, string&gt;</code>
- [.CLASS_NAMES](#globals-class-names) : <code>Object</code>
- [.CUSTOM_CSS_PROPERTIES](#globals-custom-css-properties) : <code>ReadonlyArray.&lt;string&gt;</code>

### globals.VISIBILITY_ANIMS_ID : <code>Object.&lt;string, number&gt;</code> {#globals-visibility-anims-id}

Visibility Animations IDs

The key is the name of the animation function
and the value is the index of the CSS class name
inside CLASS_NAMES.hide and CLASS_NAMES.show

**Kind**: static constant of [<code>globals</code>](#globals-js)  
**See**: [globals.CLASS_NAMES](#globals-class-names)

### globals.MOTION_ANIMS_ID : <code>Object.&lt;string, number&gt;</code>

Motion Animations IDs

The key is the name of the animation function
and the value is the index of the CSS class name
inside CLASS_NAMES.move and CLASS_NAMES.moveBack

**Kind**: static constant of [<code>globals</code>](#globals-js)  
**See**: [globals.CLASS_NAMES](#globals-class-names)

### globals.PROPERTY_NAMES : <code>Object.&lt;string, string&gt;</code>

CSS Custom Properties

The key is the name of the option passed to the animation function
and the value is the respective CSS variable

**Kind**: static constant of [<code>globals</code>](#globals-js)

### globals.CLASS_NAMES : <code>Object</code>

CSS Class Names

**Kind**: static constant of [<code>globals</code>](#globals-js)

### globals.CUSTOM_CSS_PROPERTIES : <code>ReadonlyArray.&lt;string&gt;</code>

CSS Properties customized by options passed in the animation function

('cursor' can only be customized in animations triggered by click event
so it is not being included here)

**Kind**: static constant of [<code>globals</code>](#globals-js)
