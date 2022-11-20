---
title: globals
---

# globals

<a name="module_globals"></a>

## globals
Global Constants


* [globals](#module_globals)
    * [.VISIBILITY_ANIMS_ID](#module_globals.VISIBILITY_ANIMS_ID) : <code>Object.&lt;string, number&gt;</code>
    * [.MOTION_ANIMS_ID](#module_globals.MOTION_ANIMS_ID) : <code>Object.&lt;string, number&gt;</code>
    * [.PROPERTY_NAMES](#module_globals.PROPERTY_NAMES) : <code>Object.&lt;string, string&gt;</code>
    * [.CLASS_NAMES](#module_globals.CLASS_NAMES) : <code>Object</code>
    * [.CUSTOM_CSS_PROPERTIES](#module_globals.CUSTOM_CSS_PROPERTIES) : <code>ReadonlyArray.&lt;string&gt;</code>

<a name="module_globals.VISIBILITY_ANIMS_ID"></a>

### globals.VISIBILITY\_ANIMS\_ID : <code>Object.&lt;string, number&gt;</code>
Visibility Animations IDsThe key is the name of the animation functionand the value is the index of the CSS class nameinside CLASS_NAMES.hide and CLASS_NAMES.show

**Kind**: static constant of [<code>globals</code>](#module_globals)  
**See**: module:globals.CLASS_NAMES  
<a name="module_globals.MOTION_ANIMS_ID"></a>

### globals.MOTION\_ANIMS\_ID : <code>Object.&lt;string, number&gt;</code>
Motion Animations IDsThe key is the name of the animation functionand the value is the index of the CSS class nameinside CLASS_NAMES.move and CLASS_NAMES.moveBack

**Kind**: static constant of [<code>globals</code>](#module_globals)  
**See**: module:globals.CLASS_NAMES  
<a name="module_globals.PROPERTY_NAMES"></a>

### globals.PROPERTY\_NAMES : <code>Object.&lt;string, string&gt;</code>
CSS Custom PropertiesThe key is the name of the option passed to the animation functionand the value is the respective CSS variable

**Kind**: static constant of [<code>globals</code>](#module_globals)  
<a name="module_globals.CLASS_NAMES"></a>

### globals.CLASS\_NAMES : <code>Object</code>
CSS Class Names

**Kind**: static constant of [<code>globals</code>](#module_globals)  
<a name="module_globals.CUSTOM_CSS_PROPERTIES"></a>

### globals.CUSTOM\_CSS\_PROPERTIES : <code>ReadonlyArray.&lt;string&gt;</code>
CSS Properties customized by options passed in the animation function('cursor' can only be customized in animations triggered by click eventso it is not being included here)

**Kind**: static constant of [<code>globals</code>](#module_globals)  
