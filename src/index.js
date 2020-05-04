const Vue = require('vue')
const { Engine: blackjack, STATES } = require('chicken-dinero')

let game = blackjack()

function genActions (actions) {

}

let app = new Vue({
  el: '#app',
  data: {
    chips: game.getPlayer().chips,
    wageredAmount: 0,
    actions: game.getActions()
  },
  methods: {
    wager: function () {
      console.log('making a wager of', this.wageredAmount)
    }
  }
})