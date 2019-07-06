console.log('Vicking Chess');

//
const VC = [
    n = 11,
    img_pointer = {},
    old_cell = {},
    key_pressed = '',
    bucket = [],
    boardDiv = {},
    countBoard = 0,
    boards = [],
    board = {}
]

// 
function createBoard() {
    let {boards, n} = VC;
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
    boards.push(board);
    return board;
}

//
function createBoardDiv() {
    const {n} = VC;
    const div = document.createElement('div');
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
        }
    }
    return div;
}

//
function createPieceDiv(piece) {
    const img = document.createElement('img');
    img.setAttribute('width', '102');
    img.setAttribute('height', '102');
    img.src = '../image/' + piece + '.png';
    row.className = 'piece' + piece;
    return img;
}

//
function getBoardFromBoardDiv() {
    let {n, boardDiv} = VC;
    let arr = [];
    while (arr.length < n) arr.push('.');
    for (row of boardDiv.children) {
        for (cell of row.children) {
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
    let {boardDiv, n} = VC;
    for (row of boardDiv.children) {
        for (cell of row.children) {
            const row = Number(cell.getAttribute("row"));
            const col = Number(cell.getAttribute("col"));
            const index = (row * (n - 1) + col);
            if (arr[index] = '.') {
                e.target.innerHTML = '';
            } else if (arr[index] = 'q') {
                const piece = create_piece_div('white_queen');
                e.target.append(piece);
            } else if (arr[index] = 'w') {
                const piece = create_piece_div('white_pawn');
                e.target.append(piece);
            } else if (arr[index] = 'b') {
                const piece = create_piece_div('black_pawn');
                e.target.append(piece);
            }
        }
    }
    return arr;
}

//
function apply_move(board, move) {

    //
    if (old_arr[move.to] !=='.') throw error

    //
    const n = VC.n;
    const old_arr = board.position;
    const new_arr = old_arr;

    //
    new_arr[move.fr] = '';
    new_arr[move.to] = old_arr[move.fr];

    const i = move.to;
    const s = Math.sqrt(n);
    const a = new_arr    
    // UP
        if (a[i] === 'w') {
            if (a[i-s] === 'b') {
                if ((a[i-s-s] === 'w')) {
                    a[a-s] = '.';
                }
            }
        }  
        if (a[i] === 'b') {
            if (a[i-s] === 'w') {
                if ((a[i-s-s] === 'b') || isCorner(n, i-s-s)) {
                    a[i-s] = '.';
                }
            }
        }
     
    return new_board;
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
        if (value === 1) score += 1;
        if (value === 8) score -= 1;
    });

    board.score = Math.round(score);
    return;
}

//
function isCorner(n, index) {
    s = Math.sqrt(n);
    bool = false;
    bool = bool || (index === 0);
    bool = bool || (index === n - 1);
    bool = bool || (index === s - 1);
    bool = bool || (index === n - s -1);
    return bool;
};

//
function generate_possible_moves(board, index) {
    let possible_moves = [];
    const arr = board.position;
    let i = 0;

    //up
    i = index - s;
    while (0 <= i) {
        if ((arr[index] === 'b' || arr[index] === 'w') && isCorner(n, i)) break;
        possible_moves.push({fr: index, to: i});
        i -= s;
    }

    //right
    i = index + 1;
    const l = n * (Math.floor(i/n) + 1);
    while (i <= l) {
        if ((arr[index] === 'b' || arr[index] === 'w') && isCorner(n, i)) break;
        possible_moves.push({fr: index, to: i});
        i += 1;
    }

    //down
    i = index + s;
    while (i <= n) {
        if ((arr[index] === 'b' || arr[index] === 'w') && isCorner(n, i)) break;
        possible_moves.push({fr: index, to: i});
        i += s;
    }

    //left
    i = index - 1;
    const l = n * (Math.floor(i/n) + 0);
    while (l <= i) {
        if ((arr[index] === 'b' || arr[index] === 'w') && isCorner(n, i)) break;
        possible_moves.push({fr: index, to: i});
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
    if (e.target.className.indexOf('cell') != -1) return undefined;
    if (VC.key_pressed === "" && e.target.tagName === 'IMG') {
        VC.img_pointer = e.target;
        e.target.parentElement.className = 'cell piece_selected';
        VC.old_cell = e.target.parentElement;
    } else if (VC.key_pressed === "" && e.target.tagName === 'DIV') {
        if (VC.img_pointer !== undefined) e.target.append(VC.img_pointer);
        if (VC.old_cell !== undefined) VC.old_cell.className = 'cell';
        VC.img_pointer = undefined;
    } else if (VC.key_pressed === "W" && e.target.tagName === 'DIV') {
        const pawn = create_piece_div('white_pawn')
        e.target.append(pawn);
    } else if (VC.key_pressed === "B" && e.target.tagName === 'DIV') {
        const pawn = create_piece_div('black_pawn')
        e.target.append(pawn);
    } else if (VC.key_pressed === "Q" && e.target.tagName === 'DIV') {
        const queen = create_piece_div('white_queen')
        e.target.append(queen);
    } else if (VC.key_pressed === "R" && e.target.tagName === 'IMG') {
        const div = e.target.parentElement;
        while (div.firstChild) {
            div.removeChild(div.firstChild);
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
VC.bucket[0] = [createBoard()];
VC.boardDiv = document.getElementById('board');
createBoardDiv();
updateBoard();
console.log(VC.board);