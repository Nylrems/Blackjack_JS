/*H = Corazon
  S = Sword
  C = Trebol
  D = Diamante*/

let deck = [];
const tipos = ["H", "S", "C", "D"];
const especiales = ["A", "J", "K", "Q"];
let puntosJugador = 0,
  puntosComputadora = 0;

//?Referencias del HTML
const btnPedir = document.querySelector("#btnPedir");
const btnDetener = document.querySelector("#btnDetener");
const btnNuevo = document.querySelector("#btnNuevo");
const divCartasJugador = document.querySelector("#jugador-cartas");
const divCartasComputadora = document.querySelector("#computadora-cartas");
const smallsPuntos = document.querySelectorAll("small");

//*Esta función crear una nueva baraja
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
  // console.log(deck);

  return deck;
};

crearDeck();

//*Esta función me permite tomar una carta
const pedirCarta = () => {
  // let rand = Math.floor(Math.random()*deck.length);
  // carta = deck[rand]
  // deck.splice(rand, 1)

  if (deck.length === 0) {
    throw "No hay cartas en el Deck";
  }

  const carta = deck.pop();
  // console.log(deck);
  // console.log(carta);
  return carta;
};

// for(let i = 0; i <100; i++)
// pedirCarta();

//*Esta función me permite pedir una carta
const valorCarta = (carta) => {
  const valor = carta.substring(0, carta.length - 1);

  // if (isNaN(valor)) {
  //   puntos = (valor === 'A') ? 11: 10;
  // } else {
  //   console.log("Es un número");
  //   puntos = valor * 1;
  // }

  //return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;

  let puntos;
  puntos = isNaN(valor)
    ? (puntos = valor === "A" ? 11 : 10)
    : (puntos = valor * 1);
  return puntos;
};

//*Turno de la computadora
const turnoComputadora = (puntosMinimos) => {
  do {
    const carta = pedirCarta();
    puntosComputadora = puntosComputadora + valorCarta(carta);
    smallsPuntos[1].innerText = puntosComputadora;

    const imgCarta = document.createElement("img");
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add("carta");
    divCartasComputadora.append(imgCarta);

    if (puntosMinimos === 21) {
      break;
    }
  } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);
  setTimeout(() => {
    if (puntosComputadora > puntosJugador && puntosComputadora <= 21) {
      alert("Has perdido");
    } else if (puntosComputadora > 21) {
      alert("Has ganado");
    } else if (puntosComputadora === puntosJugador) {
      alert("Empatados");
    }
  }, 10);
};

// let valor = valorCarta(pedirCarta());
// console.log({ valor });

//?Eventos
btnPedir.addEventListener("click", () => {
  const carta = pedirCarta();

  puntosJugador = puntosJugador + valorCarta(carta);
  smallsPuntos[0].innerText = puntosJugador;

  const imgCarta = document.createElement("img");
  imgCarta.src = `assets/cartas/${carta}.png`;
  imgCarta.classList.add("carta");
  divCartasJugador.append(imgCarta);
  setTimeout(() => {
    if (puntosJugador > 21) {
      alert("Has perdido :C");
      turnoComputadora(puntosJugador);
      btnPedir.disabled = true;
      btnDetener.disabled = true;
    } else if (puntosJugador === 21) {
      turnoComputadora(puntosJugador);
      alert("21 blackjack! Has ganado");
      btnPedir.disabled = true;
    }
  }, 10);
});

btnDetener.addEventListener("click", () => {
  btnPedir.disabled = true;
  btnDetener.disabled = true;
  turnoComputadora(puntosJugador);
});

btnNuevo.addEventListener("click", () => {
  console.clear();
  deck = [];
  deck = crearDeck();
  puntosJugador = 0;
  puntosComputadora = 0;

  smallsPuntos[0].innerText = 0;
  smallsPuntos[1].innerText = 0;

  divCartasJugador.innerHTML = "";
  divCartasComputadora.innerHTML = "";

  btnPedir.disabled = false;
  btnDetener.disabled = false;
});
