const Vue = require('vue')
const { Engine: blackjack, STATES } = require('chicken-dinero')

let game = blackjack()

let id = setInterval(() => {
  game.step()
  Object.assign(app, getState())
}, 100)

function getState () {
  const player = game.getPlayer()

  return {
    chips: player.chips,
    wageredAmount: player.wageredAmount,
    actions: game.getActions(),
    hand: player.hand,
    dealerHand: game.getDealerHand(),
    state: game.getState()
  }
}

let app = new Vue({
  el: '#app',
  data: {
    chips: game.getPlayer().chips,
    wagerAmount: 10,
    wageredAmount: game.getPlayer().wageredAmount,
    actions: game.getActions(),
    dealerHand: game.getDealerHand(),
    hand: game.getPlayer().hand,
    state: game.getState(),
    total: game.total,
    STATES
  },
  methods: {
    wager: function () {
      if (game.getState() === STATES.DONE) {
        game.clearBoard()

        Object.assign(this, getState())
      }

      console.log('wagering', this.wagerAmount) // DEBUG
      this.actions.wager(this.wagerAmount)
      game.stepUntilChange() // DEBUG - Deal Player
      game.stepUntilChange() // DEBUG - Deal Dealer

      Object.assign(this, getState())
    },
    hit: function () {
      this.actions.hit()
      game.stepUntilChange() // DEBUG - Potentially end game

      Object.assign(this, getState())
    },
    stand: function () {
      this.actions.stand()
      game.stepUntilChange() // DEBUG - End game (dealer's turn until game finish)

      Object.assign(this, getState())
    }
  }
})