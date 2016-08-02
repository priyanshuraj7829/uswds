var _ = require('lodash');
var select = require('../utils/select');

/**
 * @name showPanelListener
 * @desc The event handler for clicking on a button in an accordion.
 * @param {HTMLElement} el - An HTML element most likely a <button>.
 * @param {Object} ev - A DOM event object.
 */
function showPanelListener (el, ev) {
  var expanded = el.getAttribute('aria-expanded') === 'true';
  ev.preventDefault();
  this.hideAll();
  if (!expanded) {
    this.show(el);
  }
}

/**
 * @class Accordion
 *
 * An accordion component.
 *
 * @param {HTMLElement} el An HTMLElement to turn into an accordion.
 */
function Accordion (el) {
  var self = this;
  this.root = el;

  // delegate click events on each <button>
  _.each(select('button', this.root), function (el) {
    if (el.attachEvent) {
      el.attachEvent('onclick', _.bind(showPanelListener, self, el));
    } else {
      el.addEventListener('click', _.bind(showPanelListener, self, el));
    }
  });

  // find the first expanded button
  var expanded = this.$('button[aria-expanded=true]')[0];
  this.hideAll();
  if (expanded !== undefined) {
    this.show(expanded);
  }
}

/**
 * @param {String} selector
 * @return {Array}
 */
Accordion.prototype.$ = function (selector) {
  return select(selector, this.root);
};

/**
 * @param {HTMLElement} button
 * @return {Accordion}
 */
Accordion.prototype.hide = function (button) {
  var selector = button.getAttribute('aria-controls'),
    content = this.$('#' + selector)[0];

  button.setAttribute('aria-expanded', false);
  content.setAttribute('aria-hidden', true);
  return this;
};

/**
 * @param {HTMLElement} button
 * @return {Accordion}
 */
Accordion.prototype.show = function (button) {
  var selector = button.getAttribute('aria-controls'),
    content = this.$('#' + selector)[0];

  button.setAttribute('aria-expanded', true);
  content.setAttribute('aria-hidden', false);
  return this;
};

/**
 * @return {Accordion}
 */
Accordion.prototype.hideAll = function () {
  var self = this;
  _.each(this.$('button'), function (button) {
    self.hide(button);
  });
  return this;
};

module.exports = Accordion;
