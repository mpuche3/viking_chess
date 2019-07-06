"use strict";

console.log('Vicking Chess');

//
const VC = {
    n: 10,
    img_pointer: undefined,
    old_cell: {},
    key_pressed: '',
    bucket: [],
    boardDiv: document.getElementById('board'),
    boards: [],
    board: {}
}

// 
function createBoard() {
    const n = VC.n;
    let arr = [];
    while (arr.length < n * n) position.push('.');
    const board = {
        id: '#' + boards.length,
        level: 0,
        position: position,
        children: [],
        best_child: undefined,
        parent: undefined,
        best_move: undefined,
        previous_move: undefined
    }
    VC.boards.push(board);
    return board;
}

//
function createBoardDiv() {
    const n = VC.n;
    const div = document.getElementById('board');
    for (let i = 0; i < n; i += 1) {
        let row = document.createElement('div');
        div.append(row);
        row.setAttribute('row', i);
        row.className = 'row';
        for (let j = 0; j < n; j += 1) {
            let cell = document.createElement('div');
            row.append(cell);
            cell.setAttribute('row', i);
            cell.setAttribute('col', j);
            cell.className = "cell";
            cell.innerHTML = i * 10 + j;
        }
    }
}

//
function createPieceDiv(piece) {
    const img = document.createElement('img');
    img.src = '../image/' + piece + '.png';
    img.className = 'piece ' + piece;
    img.setAttribute('piece', piece)
    return img;
}

//
function getBoardFromBoardDiv() {
    const n = VC.n;
    let arr = [];
    while (arr.length < n * n) arr.push('.');
    for (let row of VC.boardDiv.children) {
        for (let cell of row.children) {
            const row = Number(cell.getAttribute("row"));
            const col = Number(cell.getAttribute("col"));
            if (cell.children.length !== 0) {
                const piece = cell.children[0].getAttribute("piece");
                if (piece === 'white_queen') arr[row * (n - 1) + col] = 'q';
                if (piece === 'white_pawn') arr[row * (n - 1) + col] = 'w';
                if (piece === 'black_pawn') arr[row * (n - 1) + col] = 'b';
            }
        }
    }
    return arr;
}

//
function updateBoardDiv(board) {
    const arr = board.position;
    let {
        boardDiv,
        n
    } = VC;
    for (let row of boardDiv.children) {
        for (let cell of row.children) {
            const row = Number(cell.getAttribute("row"));
            const col = Number(cell.getAttribute("col"));
            const index = (row * (n - 1) + col);
            if (arr[index] === '.') {
                cell.innerHTML = '';
            } else if (arr[index] === 'q') {
                const piece = createPieceDiv('white_queen');
                cell.append(piece);
            } else if (arr[index] === 'w') {
                const piece = createPieceDiv('white_pawn');
                cell.append(piece);
            } else if (arr[index] === 'b') {
                const piece = createPieceDiv('black_pawn');
                cell.append(piece);
            }
        }
    }
    return arr;
}

//
function apply_move(board, move) {

    //
    const n = VC.n;
    if (n - 1 < move.to) throw 'error';
    if (move.to < 0) throw 'error';
    if (board.position[move.to] !== '.') throw 'error';

    //

    const old_arr = board.position;
    const new_arr = old_arr;

    //
    new_arr[move.to] = old_arr[move.fr];
    new_arr[move.fr] = '.';

    //
    const i = move.to;
    const a = new_arr
    // UP
    if (a[i] === 'w') {
        if (a[i - n] === 'b') {
            if ((a[i - n - n] === 'w')) {
                a[i - n] = '.';
            }
        }
    }
    if (a[i] === 'b') {
        if (a[i - n] === 'w') {
            if ((a[i - n - n] === 'b') || isCorner(n, i - n - n)) {
                a[i - n] = '.';
            }
        }
    }

    return new_arr;
}

//
function evaluate_board(board) {
    const n = VC.n;
    let score = 0;

    const s = Math.sqrt(n);
    if ((board.position[0] === 2) ||
        (board.position[s - 1] === 2) ||
        (board.position[n - 1] === 2) ||
        (board.position[n - s - 1] === 2)
    ) {
        board.score = 1000 - board.level;
        return 'white wins';
    };

    board.position.map(value => {
        if (value === 'w') score += 1;
        if (value === 'b') score -= 1;
    });

    board.score = Math.round(score);
    return board.score;
}

//
function evaluate_boardDiv() {
    return evaluate_board({
        position: getBoardFromBoardDiv()
    })
}

//
function isCorner(n, index) {
    let bool = false;
    bool = bool || (index === 0);
    bool = bool || (index === n - 1);
    bool = bool || (index === n*n - 1);
    bool = bool || (index === n*n - n);
    return bool;
};

//
function generate_possible_moves(board, index) {
    let possible_moves = [];
    const arr = board.position;
    let i = 0;
    const n = VC.n;

    //up
    i = index - n;
    let l = -1
    while (l < i) {
        if (arr[i] === 'b' || arr[i] === 'w' || arr[i] === 'q' || isCorner(n, i)) break;
        possible_moves.push({
            fr: index,
            to: i
        });
        i -= n;
    }

    //right
    i = index + 1;
    l = n * (Math.floor(index / n) + 1);
    while (i < l) {
        if (arr[i] === 'b' || arr[i] === 'w' || arr[i] === 'q' || isCorner(n, i)) break;
        possible_moves.push({
            fr: index,
            to: i
        });
        i += 1;
    }

    //down
    i = index + n;
    l = n*n;
    while (i < l) {
        if (arr[i] === 'b' || arr[i] === 'w' || arr[i] === 'q' || isCorner(n, i)) break;
        possible_moves.push({
            fr: index,
            to: i
        });
        i += n;
    }

    //left
    i = index - 1;
    l = n * (Math.floor(index / n) + 0) - 1;
    while (l < i) {
        if (arr[i] === 'b' || arr[i] === 'w' || arr[i] === 'q' || isCorner(n, i)) break;
        possible_moves.push({
            fr: index,
            to: i
        });
        i -= 1;
    }

    return possible_moves;
}

//
function generate_board_possible_moves(board) {
    const arr = board.position;
    let moves = [];
    arr.map((row, i) => {
        row.map((val, j) => {
            if (val === 8 && board.level % 2 === 0) {
                moves = moves.concat(generate_possible_moves(board, [i, j]));
            }
            if ((val === 1 || val === 2) && board.level % 2 === 1) {
                moves = moves.concat(generate_possible_moves(board, [i, j]));
            }
        })
    })
    return moves;
}

//
function generate_children(board) {
    moves = generate_board_possible_moves(board, 'black');
    moves.map(move => {
        board_child = apply_move(board, move);
        board.children.push(board_child);
    })
}

//
function generate_children_rec(board, max_level) {
    if (board.level > max_level - 1) return;
    if (evaluate_board(board) === 'white wins') {
        return;
    };
    generate_children(board);
    board.children.map(board => {
        generate_children_rec(board, max_level)
    });
}

//
function evaluate_board_rec(board) {
    if (board.children === undefined || board.children.length == 0) {
        evaluate_board(board);
        //display_board(board);
        //console.log('Score: ' + board.score);
        return;
    }
    board.children.map(board__child => evaluate_board_rec(board__child));
    //console.log(board);
    let best_child = {}
    if (board.level % 2 === 0) {
        best_child.score = +1001;
        for (let child of board.children) {
            if (best_child.score > child.score) {
                best_child = child;
            }
        }
    } else {
        best_child.score = -1001
        for (let child of board.children) {
            if (best_child.score < child.score) {
                best_child = child;
            }
        }
    }
    board.best_child = best_child;
    board.score = best_child.score;
    //console.log(board)
}

//
VC.boardDiv.addEventListener("click", (e) => {
    // VC 
    if (e.target.className.indexOf('cell') !== -1) {
        if (VC.key_pressed === "") {
            if (VC.img_pointer !== undefined) e.target.append(VC.img_pointer);
            if (VC.old_cell !== undefined) VC.old_cell.className = 'cell';
            VC.img_pointer = undefined;
        } else if (VC.key_pressed === "W") {
            const pawn = createPieceDiv('white_pawn')
            e.target.append(pawn);
        } else if (VC.key_pressed === "B") {
            const pawn = createPieceDiv('black_pawn')
            e.target.append(pawn);
        } else if (VC.key_pressed === "Q") {
            const queen = createPieceDiv('white_queen')
            e.target.append(queen);
        } else if (VC.key_pressed === "R") {
            const div = e.target.parentElement;
            while (div.firstChild) {
                div.removeChild(div.firstChild);
            }
        }
    } else if (e.target.className.indexOf('piece') !== -1) {
        if (VC.key_pressed === "" && e.target.tagName === 'IMG') {
            VC.img_pointer = e.target;
            e.target.parentElement.className = 'cell piece_selected';
            VC.old_cell = e.target.parentElement;
        }
    }
});

//
document.addEventListener('keydown', event => {
    VC.key_pressed = event.key.toUpperCase();
});

//
document.addEventListener('keyup', event => {
    VC.key_pressed = "";
});

//
createBoardDiv();

console.log(VC.board);