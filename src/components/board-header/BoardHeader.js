import {TrelloComponent} from '@core/TrelloComponent'

export class BoardHeader extends TrelloComponent {
  static className = 'tracker__board-header'

  constructor($root) {
    super($root, {
      name: 'BoardHeader',
      listeners: ['click']
    })
  }

  toHTML() {
    return `
    <div>
      <div class="button">
        <i class="material-icons" title="Back to menu">home</i>
      </div>  

      <div class="button">
        <i class="material-icons" title="Settings">settings</i>
      </div>
    </div>  
  
    <div class="board-name" title="Name of the board">Board 1</div>
    
    <div class="button-delete">
      <i class="material-icons" title="Delete this board">delete_forever</i>
    </div>
    `
  }

  onClick(event) {}
}
