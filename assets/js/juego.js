(() => {
  /*H = Corazon
  S = Sword
  C = Trebol
  D = Diamante*/
  "use strict";

  let deck = [];
  const tipos = ["H", "S", "C", "D"],
    especiales = ["A", "J", "K", "Q"];
  // let puntosJugador = 0,
  //   puntosComputadora = 0;

  let puntosJugadores = [];

  //?Referencias del HTML
  const btnPedir = document.querySelector("#btnPedir"),
    btnDetener = document.querySelector("#btnDetener"),
    btnNuevo = document.querySelector("#btnNuevo");

  const divCartasJugadores = document.querySelectorAll(".divCartas"),
    smallsPuntos = document.querySelectorAll("small");

    btnPedir.disabled = true;
    btnDetener.disabled = true;
  //*Esta función inicializa el juego
  const inicializarJuego = (numJugadores = 2) => {
    deck = crearDeck();

    puntosJugadores = [];
    for (let i = 0; i < numJugadores; i++) {
      puntosJugadores.push(0);
    }

    smallsPuntos.forEach(elem => elem.innerText = 0) 
    divCartasJugadores.forEach(elem => elem.innerHTML = '');
    // smallsPuntos[0].innerText = 0;
    // smallsPuntos[1].innerText = 0;

    btnPedir.disabled = false;
    btnDetener.disabled = false;
  };

  //*Esta función crear una nueva baraja
  const crearDeck = () => {
    deck = [];
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
    // console.log(deck);

    return _.shuffle(deck);
  };

  //*Esta función me permite tomar una carta
  const pedirCarta = () => {
    // let rand = Math.floor(Math.random()*deck.length);
    // carta = deck[rand]
    // deck.splice(rand, 1)

    if (deck.length === 0) {
      throw "No hay cartas en el Deck";
    }
    // console.log(deck);
    // console.log(carta);
    return deck.pop();
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
  // Turno: 0 = primer jugador, y el último será la computadora
  const acumularPuntos = (carta, turno) => {
    puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
    smallsPuntos[turno].innerText = puntosJugadores[turno];
    return puntosJugadores[turno];
  };

  const crearCarta = (carta, turno) => {
    const imgCarta = document.createElement("img");
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add("carta");
    divCartasJugadores[turno].append(imgCarta);
    // divCartasComputadora.append(imgCarta);
  };

  const determinarGanador = () => {

    const [puntosMinimos, puntosComputadora] = puntosJugadores;

    setTimeout(() => {
      if (puntosComputadora === puntosMinimos) {
        alert("Empatados");
      } else if (puntosComputadora > 21) {
        alert("Has ganado");
      } else if (puntosMinimos > 21) {
        alert("Has perdido");
      } else {
        alert("La computadora gana");
      }
    }, 10);


  };

  //*Turno de la computadora
  const turnoComputadora = (puntosMinimos) => {
    let puntosComputadora = 0;
    do {
      const carta = pedirCarta();
      puntosComputadora = crearCarta(carta, puntosJugadores.length - 1);
      acumularPuntos(carta, puntosJugadores.length - 1);

      // puntosComputadora = puntosComputadora + valorCarta(carta);
      // smallsPuntos[1].innerText = puntosComputadora;

      // const imgCarta = document.createElement("img");
      // imgCarta.src = `assets/cartas/${carta}.png`;
      // imgCarta.classList.add("carta");
      // divCartasComputadora.append(imgCarta);

      if (puntosMinimos === 21) {
        break;
      }
    } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);

    determinarGanador();
  };

  // let valor = valorCarta(pedirCarta());
  // console.log({ valor });

  //?Eventos
  btnPedir.addEventListener("click", () => {
    const carta = pedirCarta();
    const puntosJugador = acumularPuntos(carta, 0);
    // puntosJugador = puntosJugador + valorCarta(carta);
    // smallsPuntos[0].innerText = puntosJugador;

    crearCarta(carta, 0);

    // const imgCarta = document.createElement("img");
    // imgCarta.src = `assets/cartas/${carta}.png`;
    // imgCarta.classList.add("carta");
    // divCartasJugador.append(imgCarta);

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
    // console.clear();
    inicializarJuego();
  });
})();
