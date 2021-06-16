import {$} from '@core/dom'

export class Trello {
  constructor(selector, options, bodyClass = '') {
    this.bodyClass = bodyClass
    this.$el = $(selector)
    this.components = options.components || []
  }

  getRoot() {
    const $root = $.create('div', 'tracker')
    if (this.bodyClass) {
      document.getElementsByTagName('body')[0].classList.add(this.bodyClass)
    }
    this.components = this.components.map(Component => {
      const $el = $.create('div', Component.className)
      const component = new Component($el)
      $el.html(component.toHTML())
      $root.append($el)
      return component
    })

    return $root
  }

  render() {
    this.$el.append(this.getRoot())
    this.components.forEach(component => component.init())
  }
}
