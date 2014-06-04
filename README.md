# browserify-widget

It makes it a bit easier to create html widgets with the help of
[browserify](http://browserify.org/).

## Usage

To create a widget you need this and the `inherits` module:

```javascript
var inherits = require('inherits');
var Widget = require('browserify-widget');

inherits(MyWidget, Widget);

var html = '<button id="like-button">Click to like</button><span class="text"></span>';

var events = {
    'like-button:click': function() {
        this.querySelector('.text').innerHTML = 'You like this!';
    }
}

function MyWidget() {
    Widget.call(this, html);
    this.addEvents(events);
}
```

You can avoid writing the html directly into your javascripts by using the
[brfs](https://www.npmjs.org/package/brfs) browserify transform.

## API

The following functions are defined through `browserify-widget`:

### .addEvents(events)

Register custom events. The keys are the css selector plus the event (without
the 'on'), the value is the function which will be called when the event occurs
on this element. The `this` of the to be called function is automatically set
to the container element of the widget itself (remember: a widget can
be rendered multiple times).

### .addEvent(selector, fn)

Basically the same like `.addEvents` but with only one event.

### .renderTo(el)

Render the widget into an existing DOM element. `el` can be an actual element or a selector.

### .appendTo(el)

Appends the widget to a DOM element. `el` can be an actual element or a selector.
