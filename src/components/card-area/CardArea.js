/* eslint-disable object-curly-spacing */
/* eslint-disable indent */
import { TrelloComponent } from '@core/TrelloComponent'
import { $ } from '@core/dom'

export class CardArea extends TrelloComponent {
  static className = 'tracker__card-area'
  constructor($root) {
    super($root, {
      name: 'CardArea',
      listeners: [
        'click',
        'dragstart',
        'dragend',
        'dragover',
        'dragenter',
        'dragleave',
        'drop',
        'keydown',
      ],
    })
    this.selected = null
  }

  toHTML() {
    return this.firstRender()
  }

  firstRender() {
    return `
    <div class="row-element">
    <div class="empty-list">
      <div class="add-list" data-list="uninited">  
        <span class="add">+</span> Add a list
      </div>
    </div>
  </div>
  <div class="delete-area">
    <span class="material-icons">delete</span>
  </div>
    `
  }

  uninitedListHTML() {
    return `
    <div class="row-element">
    <div class="empty-list">
      <div class="add-list" data-list="uninited">  
        <span class="add">+</span> Add a list
      </div>
    </div>
  </div>
    `
  }

  initedListHTML(id) {
    return `
      <div class="list" data-type="list">
        <div class="list__edit">
          <div class="list__title" spellcheck="false" contenteditable>List name</div>
          <div class="button-actions">
            <i class="material-icons">more_horiz</i>
          </div>
        </div>
        <div class="list__cards" data-param="extendable" data-id="${id}"></div>
        <div class="list__add-card" data-card="add" data-btn="${id}">
          <span class="add">+</span> Add a card
        </div>
      </div>
    `
  }

  cardHTML(id) {
    return `
    <div class="list__card" data-card=${id}>
      <div class="list__card-text" draggable="true" spellcheck="false" data-drag=${id}><span class="list__card-text-edit-span" spellcheck="false" data-spanedit="${id}">Task</span><input class="list__card-text-edit-input" type="text" data-inpedit="${id}"/></div>
      <span class="material-icons" data-btnedit="${id}">
      edit
      </span>
    </div>
    `
  }

  onClick(event) {
    if (event.target.dataset.list === 'uninited') {
      this.$root.replace('[data-list="uninited"]', this.initedListHTML(list++))
      this.$root.insert(this.uninitedListHTML())
    }
    if (event.target.dataset.card === 'add') {
      this.$root
        .findOne(`[data-id="${event.target.dataset.btn}"]`)
        .insert(this.cardHTML(card++))
    }
    if (event.target.dataset.btnedit) {
      if (
        this.$root
          .findOne(`[data-spanedit="${event.target.dataset.btnedit}"]`)
          .$el.computedStyleMap()
          .get('display').value === 'block'
      ) {
        const value = this.$root.getSpanValue(
          `[data-spanedit="${event.target.dataset.btnedit}"]`,
        )
        this.$root
          .findOne(`[data-drag="${event.target.dataset.btnedit}"]`)
          .setAttribute('draggable', 'false')
        this.$root
          .findOne(`[data-spanedit="${event.target.dataset.btnedit}"]`)
          .css({ display: 'none' })
        this.$root.setInputValue(
          `[data-inpedit="${event.target.dataset.btnedit}"]`,
          value,
        )
        this.$root
          .findOne(`[data-inpedit="${event.target.dataset.btnedit}"]`)
          .css({ display: 'block' })
          .focus()
      } else {
        this.$root
          .findOne(`[data-drag="${event.target.dataset.btnedit}"]`)
          .setAttribute('draggable', 'true')
        let value = this.$root.getInputValue(
          `[data-inpedit="${event.target.dataset.btnedit}"]`,
        )
        if (!value) value = 'Task'
        this.$root
          .findOne(`[data-inpedit="${event.target.dataset.btnedit}"]`)
          .css({ display: 'none' })
        this.$root.setSpanValue(
          `[data-spanedit="${event.target.dataset.btnedit}"]`,
          value,
        )
        this.$root
          .findOne(`[data-spanedit="${event.target.dataset.btnedit}"]`)
          .css({ display: 'block' })
      }
    }
  }

  onDragend(event) {
    const lists = this.$root.findAll('.list__cards.highlight')
    lists.forEach((ls) => {
      $(ls).removeClass('highlight')
      $(ls).removeClass('hovered')
    })
    this.$root
      .findOne(`[data-card="${event.target.dataset.drag}"]`)
      .css({ display: 'flex' })
    this.$root.findOne('.delete-area').css({ display: 'none' })
  }

  onDragstart(event) {
    console.log('start')
    setTimeout(() => {
      this.$root
        .findOne(`[data-card="${event.target.dataset.drag}"]`)
        .css({ display: 'none' })
    }, 0)
    const lists = this.$root.findAll('.list__cards')
    this.selected = this.$root.findOne(
      `[data-card="${event.target.dataset.drag}"]`,
    )
    lists.forEach((ls) => {
      $(ls).addClass('highlight')
    })
    this.$root.findOne('.delete-area').css({ display: 'block' })
  }

  onDragover(event) {
    event.preventDefault()
  }

  onDragenter(event) {
    if (event.target.dataset.param) {
      event.target.classList.add('hovered')
    }
    if (event.target.className === 'delete-area') {
      event.target.classList.add('trash-hovered')
    }
  }

  onDragleave(event) {
    if (event.target.dataset.param) {
      event.target.classList.remove('hovered')
    }
    if (event.target.className === 'delete-area trash-hovered') {
      event.target.classList.remove('trash-hovered')
    }
  }

  onKeydown(event) {
    if (event.target.className === 'list__title') {
      if (event.keyCode === 13) {
        event.preventDefault()
      }
    }
  }

  onDrop(event) {
    if (event.target.dataset.param) {
      event.target.append(this.selected.$el)
    } else if ($(event.target).closest('.delete-area').$el) {
      setTimeout(() => {
        this.selected.remove()
        this.selected = null
      }, 0)
    } else {
      const closest = $(event.target).closest('[data-param="extendable"]')
      if (closest.$el) {
        closest.append(this.selected.$el)
      }
    }
  }
}

let list = 0
let card = 0
