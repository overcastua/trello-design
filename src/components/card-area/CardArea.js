/* eslint-disable object-curly-spacing */
/* eslint-disable indent */
import { TrelloComponent } from '@core/TrelloComponent'

export class CardArea extends TrelloComponent {
  static className = 'tracker__card-area'
  constructor($root) {
    super($root, {
      name: 'CardArea',
      listeners: ['click'],
    })
  }

  toHTML() {
    return this.uninitedListHTML()
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
          <div class="list__title" contenteditable>List name</div>
          <div class="button-actions">
            <i class="material-icons">more_horiz</i>
          </div>
        </div>
        <div class="list__cards" data-type="extendable" data-id="${id}"></div>
        <div class="list__add-card" data-card="add" data-btn="${id}">
          <span class="add">+</span> Add a card
        </div>
      </div>
    `
  }

  cardHTML(id) {
    console.log(id)
    return `
    <div class="list__card" data-card=${id}>
      <div class="list__card-text" spellcheck="false"><span class="list__card-text-edit-span" data-spanedit="${id}">Task</span><input class="list__card-text-edit-input" type="text" data-inpedit="${id}"/></div>
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
}

let list = 0
let card = 0
