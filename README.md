# CircleType

[![Build Status](https://travis-ci.org/peterhry/CircleType.svg?branch=master)](https://travis-ci.org/peterhry/CircleType)

A JavaScript library that lets you curve type on the web.

Demo: <https://circletype.labwire.ca>

## Installation

In a browser:
```html
<script src="circletype.min.js"></script>
```

Using npm:

```shell
$ npm i circletype --save
```

Load ES module:
```js
import CircleType from `circletype`;
```

# API

<a name="CircleType"></a>

## CircleType
A CircleType instance creates a circular text element.

**Kind**: global class  

* [CircleType](#CircleType)
    * [new CircleType(elem, [splitter])](#new_CircleType_new)
    * [.radius(value)](#CircleType+radius) ⇒ [<code>CircleType</code>](#CircleType)
    * [.radius()](#CircleType+radius) ⇒ <code>number</code>
    * [.dir(value)](#CircleType+dir) ⇒ [<code>CircleType</code>](#CircleType)
    * [.dir()](#CircleType+dir) ⇒ <code>number</code>
    * [.forceWidth(value)](#CircleType+forceWidth) ⇒ [<code>CircleType</code>](#CircleType)
    * [.forceWidth()](#CircleType+forceWidth) ⇒ <code>boolean</code>
    * [.forceHeight(value)](#CircleType+forceHeight) ⇒ [<code>CircleType</code>](#CircleType)
    * [.forceHeight()](#CircleType+forceHeight) ⇒ <code>boolean</code>
    * [.refresh()](#CircleType+refresh) ⇒ [<code>CircleType</code>](#CircleType)
    * [.destroy()](#CircleType+destroy) ⇒ [<code>CircleType</code>](#CircleType)

<a name="new_CircleType_new"></a>

### new CircleType(elem, [splitter])

| Param | Type | Description |
| --- | --- | --- |
| elem | <code>HTMLElement</code> | A target HTML element. |
| [splitter] | <code>function</code> | An optional function used to split the element's                              text content into individual characters |

**Example**  
```js
// Instantiate `CircleType` with an HTML element.
const circleType = new CircleType(document.getElementById('myElement'));

// Set the text radius and direction. Note: setter methods are chainable.
circleType.radius(200).dir(-1);

// Provide your own splitter function to handle emojis
// @see https://github.com/orling/grapheme-splitter
const splitter = new GraphemeSplitter()
new CircleType(
  document.getElementById('myElement'),
  splitter.splitGraphemes.bind(splitter)
);
```
<a name="CircleType+radius"></a>

### circleType.radius(value) ⇒ [<code>CircleType</code>](#CircleType)
Sets the desired text radius. The minimum radius is the radius required
for the text to form a complete circle. If `value` is less than the minimum
radius, the minimum radius is used.

**Kind**: instance method of [<code>CircleType</code>](#CircleType)  
**Returns**: [<code>CircleType</code>](#CircleType) - The current instance.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | A new text radius in pixels. |

**Example**  
```js
const circleType = new CircleType(document.getElementById('myElement'));

// Set the radius to 150 pixels.
circleType.radius(150);
```
<a name="CircleType+radius"></a>

### circleType.radius() ⇒ <code>number</code>
Gets the text radius in pixels. The default radius is the radius required
for the text to form a complete circle.

**Kind**: instance method of [<code>CircleType</code>](#CircleType)  
**Returns**: <code>number</code> - The current text radius.  
**Example**  
```js
const circleType = new CircleType(document.getElementById('myElement'));

circleType.radius();
//=> 150
```
<a name="CircleType+dir"></a>

### circleType.dir(value) ⇒ [<code>CircleType</code>](#CircleType)
Sets the text direction. `1` is clockwise, `-1` is counter-clockwise.

**Kind**: instance method of [<code>CircleType</code>](#CircleType)  
**Returns**: [<code>CircleType</code>](#CircleType) - The current instance.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | A new text direction. |

**Example**  
```js
const circleType = new CircleType(document.getElementById('myElement'));

// Set the direction to counter-clockwise.
circleType.dir(-1);

// Set the direction to clockwise.
circleType.dir(1);
```
<a name="CircleType+dir"></a>

### circleType.dir() ⇒ <code>number</code>
Gets the text direction. `1` is clockwise, `-1` is counter-clockwise.

**Kind**: instance method of [<code>CircleType</code>](#CircleType)  
**Returns**: <code>number</code> - The current text radius.  
**Example**  
```js
const circleType = new CircleType(document.getElementById('myElement'));

circleType.dir();
//=> 1 (clockwise)
```
<a name="CircleType+forceWidth"></a>

### circleType.forceWidth(value) ⇒ [<code>CircleType</code>](#CircleType)
Sets the `forceWidth` option. If `true` the width of the arc is calculated
and applied to the element as an inline style.

**Kind**: instance method of [<code>CircleType</code>](#CircleType)  
**Returns**: [<code>CircleType</code>](#CircleType) - The current instance.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>boolean</code> | `true` if the width should be set |

**Example**  
```js
const circleType = new CircleType(document.getElementById('myElement'));

circleType.radius(384);

console.log(circleType.container);
//=> <div style="position: relative; height: 3.18275em;">...</div>

// Enable the force width option
circleType.forceWidth(true);

console.log(circleType.container);
//=> <div style="position: relative; height: 3.18275em; width: 12.7473em;">...</div>
```
<a name="CircleType+forceWidth"></a>

### circleType.forceWidth() ⇒ <code>boolean</code>
Gets the `forceWidth` option. If `true` the width of the arc is calculated
and applied to the element as an inline style. Defaults to `false`.

**Kind**: instance method of [<code>CircleType</code>](#CircleType)  
**Returns**: <code>boolean</code> - The current `forceWidth` value  
**Example**  
```js
const circleType = new CircleType(document.getElementById('myElement'));

circleType.forceWidth();
//=> false
```
<a name="CircleType+forceHeight"></a>

### circleType.forceHeight(value) ⇒ [<code>CircleType</code>](#CircleType)
Sets the `forceHeight` option. If `true` the height of the arc is calculated
and applied to the element as an inline style.

**Kind**: instance method of [<code>CircleType</code>](#CircleType)  
**Returns**: [<code>CircleType</code>](#CircleType) - The current instance.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>boolean</code> | `true` if the height should be set |

**Example**  
```js
const circleType = new CircleType(document.getElementById('myElement'));

circleType.radius(384);

console.log(circleType.container);
//=> <div style="position: relative; height: 3.18275em;">...</div>

// Disable the force height option
circleType.forceHeight(false);

console.log(circleType.container);
//=> <div style="position: relative;">...</div>
```
<a name="CircleType+forceHeight"></a>

### circleType.forceHeight() ⇒ <code>boolean</code>
Gets the `forceHeight` option. If `true` the height of the arc is calculated
and applied to the element as an inline style. Defaults to `true`.

**Kind**: instance method of [<code>CircleType</code>](#CircleType)  
**Returns**: <code>boolean</code> - The current `forceHeight` value  
**Example**  
```js
const circleType = new CircleType(document.getElementById('myElement'));

circleType.forceHeight();
//=> true
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

## Development Commands

| Command                 | Description                       |
|:------------------------|:----------------------------------|
| `npm run dev`           | Start dev server                  |
| `npm start`             | Build for release                 |
| `npm test`              | Run unit and screenshot tests     |
| `npm run docs`          | Generate documentation            |
| `npm run reference`     | Generate reference screenshots    |
