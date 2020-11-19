
const storylines = [

  // Path 1
  {
    id: 1,
    text: "You wake up with a COOL-ITEM",
    options: [
      {
        text: "Take the COOL-ITEM",
        setState: { coolItem: true },
        nextPath: 2
      },
      {
        text: "Leave the COOL-ITEM",
        nextPath: 2
      }
    ]
  },
  // End Path 1


  // Path 2
  {
    id: 2,
    text: "You meet a merchant.",
    options: [
      {
        text: "Exchange COOL-ITEM for money.",
        // We need a way to update our state var in app.js
        // .coolItem is set on line 11
        // must have a state that actually is real 
        requiredState: (currentState) => currentState.coolItem,
        setState: { coolItem: false, money: true },
        nextPath: 3
      },
      {
        text: "Exchange COOL-ITEM for potion.",
        requiredState: (currentState) => currentState.coolItem,
        setState: { coolItem: false, potion: true },
        nextPath: 4
      },
      {
        text: "Ignore the merchant.",
        nextPath: 5
      }
    ]


  },
  // End Path 2

  // Path 3
  {
    id: 3,
    text: "After the merchant, you find a suspicious mansion.",
    options: [
      {
        text: "Explore the mansion.",
        nextPath: 6
      },
      {
        text: "Go to the next town.",
        nextPath: 6
      }
    ]
  },
  // End Path 3

  // Path 4
  {
    id: 4
  },
  // End Path 4

  // Path 5
  {
    id: 5
  },
  // End Path 5

  // Path 6
  {
    id: 6,
    text: "You explored the mansion and you were killed by a ghost!",
    options: [
      {
        text: "You died, play again.",
        nextPath: -1
      }
    ]
  },
  // End Path 6
];
