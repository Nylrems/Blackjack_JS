/*H = Corazon
  S = Sword
  C = Trebol
  D = Diamante*/

let deck = [];
const tipos = ["H", "S", "C", "D"];
const especiales = ["A", "J", "K", "Q"];

//Esta función crear una nueva baraja
const crearDeck = () => {
  for (let i = 2; i <= 10; i++) {
    for (let tipo of tipos) {
      deck.push(i + tipo);
    }
  }
  for (let tipo of tipos) {
    for (let esp of especiales) {
      deck.push(esp + tipo);
    }
  }
  deck = _.shuffle(deck);
  console.log(deck);

  return deck;
};

crearDeck();


