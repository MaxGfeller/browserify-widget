var domify = require('domify');
var inherits = require('inherits');
var EventEmitter = require('events').EventEmitter;

inherits(Widget, EventEmitter);

function Widget(html) {
    this.html = html;
    this.renderedTo = [];
    this.events = {};
}

Widget.prototype.appendTo = function(el) {
    if (typeof el === 'string') el = document.querySelector(el);

    el.appendChild(domify(this.html));
    this.emit('render', el);
    this.renderedTo.push(el);
    this._registerEvents();
}

Widget.prototype.renderTo = function(el) {
    if (typeof el === 'string') el = document.querySelector(el);

    el.innerHTML = this.html;
    this.emit('render', el);
    this.renderedTo.push(el);
    this._registerEvents(el);
}

Widget.prototype.addEvents = function(events) {
    for(var ev in events) {
        this.events[ev] = events[ev];
    }
    this._registerEvents();
}

Widget.prototype.addEvent = function(selector, fn) {
    this.events[selector] = fn;
}

Widget.prototype._registerEvents = function(element) {
    for(var ev in this.events) {
        var i = this._getIndexOfDoublePoint(ev);
        var s = ev.substring(0, i);
        var e = ev.substring(i + 1);

        if(element) {
            var els = element.querySelectorAll(s);
            [].slice.call(els).forEach(function(el) {
                el['on' + e] = this.events[ev].bind(element);
            }.bind(this));
            continue;
        }

        this.renderedTo.forEach(function(el) {
            var els = el.querySelectorAll(s);
            [].slice.call(els).forEach(function(el) {
                el['on' + e] = this.events[ev].bind(el);
            }.bind(this));
        }.bind(this));
    }
}

Widget.prototype._getIndexOfDoublePoint = function(s) {
    var i = false;
    var l = 0;

    while(l > -1) {
        i = s.indexOf(':', l);
        l = i;

        if(s.charAt(i - 1) === '\\') continue;

        if(i !== -1) return i;
    }
    return false;
}

module.exports = Widget;
