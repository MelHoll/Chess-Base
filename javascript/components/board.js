import jsxElem, { render, renderAppend} from '../third-party/jaredsartin-jsx-no-react.js';
import htm from 'https://unpkg.com/htm?module'
const html = htm.bind(jsxElem.createElement);

class ChessBoard extends HTMLElement {
  initialRender = true;

  connectedCallback() {
    this.render();
    this.initialRender = false;
  }

  render() {
    //Starting position of pieces
    const initBoardMap = {
      a8: "rook-b",
      b8: "knight-b", 
      c8: "bishop-b",
      d8: "queen-b",
      e8: "king-b",
      f8: "bishop-b",
      g8: "knight-b",
      h8: "rook-b",
      a7: "pawn-b",
      b7: "pawn-b", 
      c7: "pawn-b",
      d7: "pawn-b",
      e7: "pawn-b",
      f7: "pawn-b",
      g7: "pawn-b",
      h7: "pawn-b",
      a1: "rook-w",
      b1: "knight-w", 
      c1: "bishop-w",
      d1: "queen-w",
      e1: "king-w",
      f1: "bishop-w",
      g1: "knight-w",
      h1: "rook-w",
      a2: "pawn-w",
      b2: "pawn-w", 
      c2: "pawn-w",
      d2: "pawn-w",
      e2: "pawn-w",
      f2: "pawn-w",
      g2: "pawn-w",
      h2: "pawn-w",
    };

    render(html`<div class="label"></div>`, this); //blank space

    const alphaCharCodeStart = 64;
    for(let i = 9; i >= 0; --i) {
      for(let j = 1; j <= 8; ++j) {
        if(i === 0 && j === 1) renderAppend(html`<div class="label"></div>`, this); //blank space
        
        const alpha = String.fromCharCode(alphaCharCodeStart + j).toLowerCase();
        if(i === 9 || i === 0) { //Render the first row that is labeling the columns
          renderAppend(html`<div class="label">${alpha}</div>`, this);
        } else {
          if(j === 1) renderAppend(html`<div class="label">${i}</div>`, this); // Label the rows
          //Add the chess board space
          renderAppend(html`<chess-space 
            class="${j % 2 == 0 ? "even" : "odd"}" 
            space-data=${alpha + i}
            piece-data=${initBoardMap[alpha + i]}
            />`, this)
        }
      }
    }

    if(this.initialRender) {
      chessEvents.on('reset', () => {
        console.log('Reset board');
        this.render();
      });

      // Example event handler
      chessEvents.on('move', ({detail}) => {
        console.log(`Move event received: ${detail.from} -> ${detail.to}`);

        const elementFrom = document.querySelector(`[space-data=${detail.from}]`);
        const elementTo = document.querySelector(`[space-data=${detail.to}]`);

        const piece = elementFrom.getAttribute('piece-data');

        if(!piece) {
          alert("Error: There is not a piece at " + detail.from);
          return;
        }

        elementFrom.setAttribute('piece-data', '');
        elementTo.setAttribute('piece-data', piece);

        // Hack right now to prevent the board setup animation when moving individual pieces
        // I should have structured  it different and had the pieces be a separate component to allow more flexibility with animation
        elementFrom.firstChild.classList.add('movement');
        elementTo.firstChild.classList.add('movement');
      });
    }
  }
}

customElements.define('chess-board', ChessBoard);