import jsxElem, { render} from '../third-party/jaredsartin-jsx-no-react.js';
import htm from 'https://unpkg.com/htm?module'
const html = htm.bind(jsxElem.createElement);

class ChessSpace extends HTMLElement {
    static get observedAttributes() {
        return ['piece-data'];
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const self = this;
        const pieceMap = {
            "rook": "♜", 
            "knight": "♞", 
            "bishop": "♝", 
            "pawn": "♟", 
            "king": "♚",
            "queen": "♛"
        }

        const pieceDataArray = this.pieceData?.split("-") ?? [];

        render(html`<div class="${pieceDataArray[1] == 'w' ? "white" : "black"}">
            ${pieceDataArray.length > 0 && pieceMap[pieceDataArray[0]]}
        </div>`, this);

        //Was using this before I found the documentation for attributeChangedCallback
        // var observer = new MutationObserver(function(mutations) {
        //     mutations.forEach(function(mutation) {
        //         if (mutation.type === "attributes") {
        //             mutation.target.textContent = self.pieceData;
        //         }
        //     });
        // });
        
        // observer.observe(this, {
        //     attributes: true
        // });
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.render();
    }

    get pieceData() {
        return this.getAttribute('piece-data');
    }
}

customElements.define('chess-space', ChessSpace);