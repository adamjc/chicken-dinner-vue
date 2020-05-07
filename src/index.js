const Vue = require('vue')
const { Engine: blackjack, STATES } = require('chicken-dinero')

let game = new blackjack()

let id = setInterval(() => {
  console.log('doin a step')
  game.step()

  app.actions = game.getActions()
  app.dealerHand = game.getDealerHand()
  app.hand = game.getPlayer().hand
}, 2000)

let app = new Vue({
  el: '#app',
  data: {
    chips: game.getPlayer().chips,
    wageredAmount: 10,
    actions: game.getActions(),
    dealerHand: game.getDealerHand(),
    hand: game.getPlayer().hand
  },
  methods: {
    wager: function () {
      this.actions.wager(this.wageredAmount)
      game.stepUntilChange() // Deal Player
      game.stepUntilChange() // Deal Dealer

      this.actions = game.getActions()
      this.dealerHand = game.getDealerHand()
      this.hand = game.getPlayer().hand
    },
    hit: function () {
      this.actions.hit()
      game.stepUntilChange()

      this.actions = game.getActions()
      this.dealerHand = game.getDealerHand()
      this.hand = game.getPlayer().hand
    },
    stand: function () {
      this.actions.stand()
      game.stepUntilChange()

      this.actions = game.getActions()
      this.dealerHand = game.getDealerHand()
      this.hand = game.getPlayer().hand
    }
  }
})