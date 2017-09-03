# CircleType

[![Build Status](https://travis-ci.org/peterhry/CircleType.svg?branch=master)](https://travis-ci.org/peterhry/CircleType)

A JavaScript library that lets you curve type on the web.

Demo: <http://circletype.labwire.ca>

## Installation

In a browser:
```html
<script src="circletype.min.js"></script>
```

Using npm:

```shell
$ npm i circletype --save
```

Load ES6 module:
```js
import CircleType from `circletype`;
```

# API

<a name="CircleType"></a>

## CircleType
A CircleType instance creates a circular text element.

**Kind**: global class  

* [CircleType](#CircleType)
    * [new CircleType(elem)](#new_CircleType_new)
    * [.radius(value)](#CircleType+radius) ⇒ <code>Number</code>
    * [.radius()](#CircleType+radius) ⇒ <code>Number</code>
    * [.dir(value)](#CircleType+dir) ⇒ [<code>CircleType</code>](#CircleType)
    * [.dir()](#CircleType+dir) ⇒ <code>Number</code>
    * [.refresh()](#CircleType+refresh) ⇒ [<code>CircleType</code>](#CircleType)
    * [.destroy()](#CircleType+destroy) ⇒ [<code>CircleType</code>](#CircleType)

<a name="new_CircleType_new"></a>

### new CircleType(elem)

| Param | Type | Description |
| --- | --- | --- |
| elem | <code>HTMLElement</code> | A target HTML element. |

**Example**  
```js
// Instantiate `CircleType` with an HTML element.
const circleType = new CircleType(document.getElementById('myElement'));

// Set the text radius and direction. Note: setter methods are chainable.
circleType.radius(200).dir(-1);
```
<a name="CircleType+radius"></a>

### circleType.radius(value) ⇒ <code>Number</code>
Sets the desired text radius. The minimum radius is the radius required
for the text to form a complete circle. If `value` is less than the minimum
radius, the minimum radius is used.

**Kind**: instance method of [<code>CircleType</code>](#CircleType)  
**Returns**: <code>Number</code> - The current instance.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>Number</code> | A new text radius in pixels. |

**Example**  
```js
const circleType = new CircleType(document.getElementById('myElement'));

// Set the radius to 150 pixels.
circleType.radius(150);
```
<a name="CircleType+radius"></a>

### circleType.radius() ⇒ <code>Number</code>
Gets the text radius in pixels. The default radius is the radius required
for the text to form a complete circle.

**Kind**: instance method of [<code>CircleType</code>](#CircleType)  
**Returns**: <code>Number</code> - The current text radius.  
**Example**  
```js
const circleType = new CircleType(document.getElementById('myElement'));

circleType.radius();
// > 150
```
<a name="CircleType+dir"></a>

### circleType.dir(value) ⇒ [<code>CircleType</code>](#CircleType)
Sets the text direction. `1` is clockwise, `-1` is counter-clockwise.

**Kind**: instance method of [<code>CircleType</code>](#CircleType)  
**Returns**: [<code>CircleType</code>](#CircleType) - The current instance.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>Number</code> | A new text direction. |

**Example**  
```js
const circleType = new CircleType(document.getElementById('myElement'));

// Set the direction to counter-clockwise.
circleType.dir(-1);

// Set the direction to clockwise.
circleType.dir(1);
```
<a name="CircleType+dir"></a>

### circleType.dir() ⇒ <code>Number</code>
Gets the text direction. `1` is clockwise, `-1` is counter-clockwise.

**Kind**: instance method of [<code>CircleType</code>](#CircleType)  
**Returns**: <code>Number</code> - The current text radius.  
**Example**  
```js
const circleType = new CircleType(document.getElementById('myElement'));

circleType.dir();
// > 1 (clockwise)
```
<a name="CircleType+refresh"></a>

### circleType.refresh() ⇒ [<code>CircleType</code>](#CircleType)
Schedules a task to recalculate the height of the element. This should be
called if the font size is ever changed.

**Kind**: instance method of [<code>CircleType</code>](#CircleType)  
**Returns**: [<code>CircleType</code>](#CircleType) - The current instance.  
**Example**  
```js
const circleType = new CircleType(document.getElementById('myElement'));

circleType.refresh();
```
<a name="CircleType+destroy"></a>

### circleType.destroy() ⇒ [<code>CircleType</code>](#CircleType)
Removes the CircleType effect from the element, restoring it to its
original state.

**Kind**: instance method of [<code>CircleType</code>](#CircleType)  
**Returns**: [<code>CircleType</code>](#CircleType) - This instance.  
**Example**  
```js
const circleType = new CircleType(document.getElementById('myElement'));

// Restore `myElement` to its original state.
circleType.destroy();
```
