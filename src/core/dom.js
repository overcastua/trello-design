/* eslint-disable indent */
class Dom {
  constructor(selector) {
    this.$el =
      typeof selector === 'string' ? document.querySelector(selector) : selector
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html
      return this
    }
    return this.$el.outerHTML.trim()
  }

  clear() {
    this.html('')
    return this
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback)
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback)
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el
    }

    if (Element.prototype.append) {
      this.$el.append(node)
    } else {
      this.$el.appendChild(node)
    }

    return this
  }

  insert(content) {
    return this.$el.insertAdjacentHTML('beforeend', content)
  }

  get data() {
    return this.$el.dataset
  }

  closest(selector) {
    return $(this.$el.closest(selector))
  }

  getCoords() {
    return this.$el.getBoundingClientRect()
  }

  findOne(selector) {
    return $(this.$el.querySelector(selector))
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector)
  }

  css(styles = {}) {
    Object.keys(styles).forEach((key) => {
      this.$el.style[key] = styles[key]
    })
    return this
  }

  replace(selector, content) {
    return (document.querySelector(selector).parentNode.outerHTML = content)
  }

  remove() {
    this.$el.remove()
    return this
  }

  getSpanValue(selector) {
    return this.findOne(selector).$el.innerText
  }

  setSpanValue(selector, text) {
    return (this.findOne(selector).$el.innerText = text)
  }

  setInputValue(selector, text) {
    return (this.findOne(selector).$el.value = text)
  }
  getInputValue(selector) {
    return this.findOne(selector).$el.value
  }

  setAttribute(attr, val) {
    console.log(this.$el)
    return this.$el.setAttribute(attr, val)
  }

  addClass(className) {
    return this.$el.classList.add(className)
  }

  removeClass(className) {
    return this.$el.classList.remove(className)
  }

  focus() {
    return this.$el.focus()
  }
}

export function $(selector) {
  return new Dom(selector)
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName)
  if (classes) {
    el.classList.add(classes)
  }
  return $(el)
}
