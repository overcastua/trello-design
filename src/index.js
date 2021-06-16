import {BoardHeader} from './components/board-header/BoardHeader'
import {CardArea} from './components/card-area/CardArea'
import {Trello} from './components/trello/Trello'
import './scss/index.scss'

const trello = new Trello('#app', {
  components: [BoardHeader, CardArea]
}, 'board')

trello.render()
