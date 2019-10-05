'use strict';

function createChessBoard() {

    let chessBoard = document.createElement('div');
    chessBoard.classList.add('chessBoard');
    chessBoard.appendChild(getFirstRowElem());

    let elemCount = 8;
    let evenColor = false;

    for(let i = elemCount; i > 0; i--) {
        let chessRow = document.createElement('div');
        chessRow.classList.add('chessRow');

        let chessP = document.createElement('p');
        chessP.textContent = i;
        chessRow.appendChild(chessP);

        for(let j = 0; j < elemCount; j++) {
            let chessItem = document.createElement('div');
            chessItem.classList.add('chessCol');
            chessItem.classList.add(getEvenClass(evenColor, j));

            chessRow.appendChild(chessItem);
        }
        chessBoard.appendChild(chessRow);
        evenColor = toggleEven(evenColor);
    }
    return chessBoard;
}

function getEvenClass(evenColor, iterationNumber){
    if (evenColor) {
        return iterationNumber%2 == 0 ? 'black' : 'white';
    } else {
        return iterationNumber%2 == 0 ? 'white' : 'black';
    }
}

function getFirstRowElem() {
    const elem = document.createElement('div');
    elem.classList.add('chessRow', 'first');

    for (let letter of ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']) {
        const childElem = document.createElement('div');
        childElem.classList.add('letter');
        childElem.textContent = letter;
        elem.appendChild(childElem);
    }
    return elem;
}

function toggleEven(evenColor) {
    return evenColor ? false : true;
}

document.body.appendChild(createChessBoard());