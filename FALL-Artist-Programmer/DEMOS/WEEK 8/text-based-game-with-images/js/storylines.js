const storylines = [

  // Path 1
  {
    id: 1,
    text: "You start with a coolItem",
    image: "1.jpg",
    options: [
      {
        text : "Get coolItem",
        setState : { coolItem: true },
        nextPath : 2
      },
      {
        text: "Leave cooItem",
        nextPath : 2
      }
    ]
  },

  // Path 2
  {
    id: 2,
    text: "You meet a merchant",
    image: "2.jpg",
    options: [
      {
        text : "Exchange coolItem for money",
        requiredState : (currentState) => currentState.coolItem,
        setState : { coolItem: false, money: true },
        nextPath : 3
      },
      {
        text: "Exchange coolItem for potion",
        requiredState: (currentState) => currentState.coolItem,
        setState: { coolItem: false, potion: true },
        nextPath: 3
      },
      {
        text: "Ignore merchant",
        nextPath: 3
      }
    ]
  },

  // Path 3
  {
    id: 3,
    text: "After the merchant you find a suspicious mansion.",
    image: "3.jpg",
    options: [
      {
        text: "explore the mansion",
        nextPath: 4
      },
      {
        text: "go to the next town",
        nextPath: 5
      },
      {
        text: "reset here",
        nextPath: 6
      }
    ]
  },

  // Purposely end the game:
  // Path 4
  {
    id: 4,
    text: "You explored the mansion and were killed by a ghost!",
    options: [
      {
        text: "Restart",
        nextPath: -1
      }
    ]
  }

]
