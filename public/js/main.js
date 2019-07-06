console.log('hello');

function create_init_board(n) {
    let position = []
    while (position.length < n*n) position.push('.');
    const board = {
        id: 0,
        level: 0,
        position: position,
        children: [],
        best_child: undefined,
        parent: undefined,
        best_move: undefined,
        previous_move: undefined
    }
    return board;
}

function displayBoard(board, div) {
    const n = 11
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
    if (position !== undefined) {

    }
}

function create_piece_div(piece) {
    const img = document.createElement('img');
    img.setAttribute('width', '102');
    img.setAttribute('height', '102');
    img.src = '../image/' + piece + '.png';
    img.setAttribute('style', "position: absolute");
    img.setAttribute('piece', piece)
    return img;
}

function move_piece (to, fr){
    if (fr === undefined) {
        a=a;
    }
}

function update_board(div_board) {
    n = div_board.children.length;
    let arr = [];
    while (arr.length < n*n) arr.push('.');
    console.log(n);
    console.log(arr);
    for (row of div_board.children) {
        for (cell of row.children) {
            const row = Number(cell.getAttribute("row"));
            const col = Number(cell.getAttribute("col"));
            if (cell.children.length !== 0) {
                const piece = cell.children[0].getAttribute("piece");
                console.log((row * n + col) + ' >>> ' + piece);
                if (piece === 'white_queen') arr[row * n + col] = '*';
            }
        }
    }
    return arr;
}

let bucket = [
    []
];

bucket[0].push(create_init_board());
const div_board = document.getElementById('board');
displayBoard(bucket[0][0], div_board)

let img_pointer = undefined;
let old_cell = undefined;


div_board.addEventListener("click", (e) => {
    console.log(e)
    if (key_pressed === "" && e.target.tagName === 'IMG') {
        img_pointer = e.target;
        e.target.parentElement.className = 'cell piece_selected';
        old_cell = e.target.parentElement;
    } else if (key_pressed === "" && e.target.tagName === 'DIV') {
        if (img_pointer !== undefined) e.target.append(img_pointer);
        if (old_cell !== undefined) old_cell.className = 'cell';
        img_pointer = undefined;
    } else if (key_pressed === "W" && e.target.tagName === 'DIV') {
        const pawn = create_piece_div('white_pawn')
        e.target.append(pawn);
    } else if (key_pressed === "B" && e.target.tagName === 'DIV') {
        const pawn = create_piece_div('black_pawn')
        e.target.append(pawn);
    } else if (key_pressed === "Q" && e.target.tagName === 'DIV') {
        const queen = create_piece_div('white_queen')
        e.target.append(queen);
    } else if (key_pressed === "R" && e.target.tagName === 'IMG') {
        const div = e.target.parentElement;
        while (div.firstChild) {
            div.removeChild(div.firstChild);
        }
    }
});

let key_pressed = "";

document.addEventListener('keydown', event => {
    key_pressed = event.key.toUpperCase();
});

document.addEventListener('keyup', event => {
    key_pressed = "";
});























function display_board(board) {
    console.log(board.id);
    let n = Math.sqrt(board.position.length);
    let str = board.position;
    let b = 0;
    for (b = 0; b < n * n + 1; b += n) {
        console.log(str.slice(b, b + n));
    }
}

function apply_move(board, move) {
    const n = board.position.length - 1;

    let new_board = {
        id: boards.length,
        level: board.level + 1,
        position: JSON.parse(JSON.stringify(board.position)),
        children: [],
        parent: board.id,
    };

    boards.push(new_board);

    const fr_row = move.fr[0];
    const fr_col = move.fr[1];
    const to_row = move.to[0];
    const to_col = move.to[1];
    const fr_val = board.position[fr_row][fr_col];
    const to_val = board.position[to_row][to_col];

    if (to_val !== 0) throw error;
    if (fr_row < 0 || n < fr_row) throw error;
    if (fr_col < 0 || n < fr_col) throw error;
    if (to_row < 0 || n < fr_row) throw error;
    if (to_col < 0 || n < to_col) throw error;

    new_board.position[fr_row][fr_col] = to_val;
    new_board.position[to_row][to_col] = fr_val;

    // remove piece
    let row = to_row;
    let col = to_col;
    arr = new_board.position

    function cell_piece(i, j) {
        if (new_board.position(i * n + j) = ".") return 'empty';

    }

    function isCorner(i, j) {
        bool = false;
        bool = bool || (row === 0 && col === 0);
        bool = bool || (row === 0 && col === n);
        bool = bool || (row === n && col === 0);
        bool = bool || (row === n && col === n);
        return bool;
    };


    // up
    if ((row - 2) < n) {
        if (arr[row][row - 0] === 'x') {
            if (arr[row][row - 1] === 'o') {
                if ((arr[row][row - 2] === 'x') || isCorner(row, col + 2)) {
                    board.position[row][col + 1] = 0;
                }
            }
        }
    }
    if ((col + 2) < n) {
        if (arr[row][col + 0] === 'o') {
            if (arr[row][col + 1] === 'x') {
                if ((arr[row][col + 2] === 'o') || isCorner(row, col + 2)) {
                    board.position[row][col + 1] = 0;
                }
            }
        }
    }

    // right
    if ((col + 2) < n) {
        if (arr[row][col + 0] === 'x') {
            if (arr[row][col + 1] === 'o') {
                if ((arr[row][col + 2] === 'x') || isCorner(row, col + 2)) {
                    board.position[row][col + 1] = 0;
                }
            }
        }
    }
    if ((col + 2) < n) {
        if (arr[row][col + 0] === 'o') {
            if (arr[row][col + 1] === 'x') {
                if ((arr[row][col + 2] === 'o') || isCorner(row, col + 2)) {
                    board.position[row][col + 1] = 0;
                }
            }
        }
    }

    // ADD
    // if queen possible moves zero => end of game



    return new_board;
}

function evaluate_board(board) {
    const n = board.position.length - 1;
    const arr = board.position;
    let score = 0;

    if ((board.position[0][0] === 2) ||
        (board.position[0][n] === 2) ||
        (board.position[n][0] === 2) ||
        (board.position[n][n] === 2)
    ) {
        board.score = 100 - board.level;
        return 'white wins';
    };

    arr.map(row => {
        row.map(value => {
            if (value === 1) score += 1;
            if (value === 8) score -= 1;
        });
    });

    board.score = Math.round(score);
    return;
}

function generate_possible_moves(board, cell) {
    let possible_moves = [];
    const fr_row = cell[0];
    const fr_col = cell[1];

    //up
    to_row = fr_row - 1;
    to_col = fr_col;
    while ((to_row > -1) && board.position[to_row][to_col] === 0) {
        let isCorner = false;
        isCorner = isCorner || ((to_row === 0) && (to_col === 0));
        isCorner = isCorner || ((to_row === 0) && (to_col === n));
        isCorner = isCorner || ((to_row === n) && (to_col === 0));
        isCorner = isCorner || ((to_row === n) && (to_col === n));
        let isKing = (board.position[fr_row][fr_col]) === 8;
        if (!isCorner || !isKing) {
            possible_moves.push({
                fr: [fr_row, fr_col],
                to: [to_row, to_col]
            });
        }
        to_row -= 1;
    }

    //right
    to_row = fr_row;
    to_col = fr_col + 1;
    while ((to_col < n + 1) && board.position[to_row][to_col] === 0) {
        let isCorner = false;
        isCorner = isCorner || ((to_row === 0) && (to_col === 0));
        isCorner = isCorner || ((to_row === 0) && (to_col === n));
        isCorner = isCorner || ((to_row === n) && (to_col === 0));
        isCorner = isCorner || ((to_row === n) && (to_col === n));
        let isKing = (board.position[fr_row][fr_col]) === 8;
        if (!isCorner || !isKing) {
            possible_moves.push({
                fr: [fr_row, fr_col],
                to: [to_row, to_col]
            });
        }
        to_col += 1;
    }

    //down
    to_row = fr_row + 1;
    to_col = fr_col;
    while ((to_row < n + 1) && board.position[to_row][to_col] === 0) {
        let isCorner = false;
        isCorner = isCorner || ((to_row === 0) && (to_col === 0));
        isCorner = isCorner || ((to_row === 0) && (to_col === n));
        isCorner = isCorner || ((to_row === n) && (to_col === 0));
        isCorner = isCorner || ((to_row === n) && (to_col === n));
        let isKing = (board.position[fr_row][fr_col]) === 8;
        if (!isCorner || !isKing) {
            possible_moves.push({
                fr: [fr_row, fr_col],
                to: [to_row, to_col]
            });
        }
        to_row += 1;
    }

    //left
    to_row = fr_row;
    to_col = fr_col - 1;
    while ((to_col < n + 1) && board.position[to_row][to_col] === 0) {
        let isCorner = false;
        isCorner = isCorner || ((to_row === 0) && (to_col === 0));
        isCorner = isCorner || ((to_row === 0) && (to_col === n));
        isCorner = isCorner || ((to_row === n) && (to_col === 0));
        isCorner = isCorner || ((to_row === n) && (to_col === n));
        let isKing = (board.position[fr_row][fr_col]) === 8;
        if (!isCorner || !isKing) {
            possible_moves.push({
                fr: [fr_row, fr_col],
                to: [to_row, to_col]
            });
        }
        to_col -= 1;
    }
    return possible_moves;
}

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

function generate_children(board) {
    moves = generate_board_possible_moves(board, 'black');
    moves.map(move => {
        board_child = apply_move(board, move);
        board.children.push(board_child);
    })
}

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

function display_best_moves(board) {
    display_board(board, 'nice');
    if (board.best_child !== undefined) display_best_moves(board.best_child);
}