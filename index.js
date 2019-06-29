let count = 0;

function create_init_board() {
    position = [
        [0, 0, 0, 0],
        [8, 2, 0, 0],
        [1, 8, 0, 0],
        [0, 0, 0, 0]
    ]
    n = position.length - 1;
    board = {
        id: '#0',
        level: 0,
        position: position,
        children: [],
        best_child: {}
    }
    return board;
}

function display_board(board) {
    console.log(board.id)
    for (row of board.position) {
        console.log(row);
    }
}

function apply_move(board, move) {
    const n = board.position.length - 1;
    count += 1;

    let new_board = {
        id: "#" + count,
        level: board.level + 1,
        position: JSON.parse(JSON.stringify(board.position)),
        children: [],
        parent: board,
    };

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
    if ((row + 2) < n) {
        if (arr[row][col] === 1) {
            if (arr[row + 1][col] === 8) {
                if (arr[row + 2][col] === 1) {

                    board.position[row + 1][col] = 0;
                }
            }
        }
        if (0 < (row - 2)) {
            if (arr[row - 1][col] === 8) {
                if (arr[row - 2][col] === 1) {

                    board.position[row - 1][col] = 0;
                }
            }
        }
        if ((col + 2) < n) {
            if (arr[row][col + 1] === 8) {
                if (arr[row][col + 1] === 1) {

                    board.position[row + 1][col] = 0;
                }
            }
        }
        if (0 < (col - 2)) {
            if (arr[row][col - 1] === 8) {
                if (arr[row][col - 2] === 1) {

                    board.position[row - 1][col] = 0;
                }
            }
        }
    }
    if (arr[row][col] === 8) {
        if ((row + 2) < n) {
            if (arr[row + 1][col] === 1) {
                if (arr[row + 2][col] === 8) {

                    board.position[row + 1][col] = 0;
                }
            }
        }
        if (0 < (row - 2)) {
            if (arr[row - 1][col] === 1) {
                if (arr[row - 2][col] === 8) {
                    board.position[row - 1][col] = 0;
                }
            }
        }
        if ((col + 2) < n) {
            if (arr[row][col + 1] === 1) {
                if (arr[row][col + 1] === 8) {

                    board.position[row + 1][col] = 0;
                }
            }
        }
        if (0 < (col - 2)) {
            if (arr[row][col - 1] === 1) {
                if (arr[row][col - 2] === 8) {

                    board.position[row - 1][col] = 0;
                }
            }
        }
    }

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
        board.score = 100;
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
        possible_moves.push({
            fr: [fr_row, fr_col],
            to: [to_row, to_col]
        });
        to_row -= 1;
    }

    //right
    to_row = fr_row;
    to_col = fr_col + 1;
    while ((to_col < n + 1) && board.position[to_row][to_col] === 0) {
        possible_moves.push({
            fr: [fr_row, fr_col],
            to: [to_row, to_col]
        });
        to_col += 1;
    }

    //down
    to_row = fr_row + 1;
    to_col = fr_col;
    while ((to_row < n + 1) && board.position[to_row][to_col] === 0) {
        possible_moves.push({
            fr: [fr_row, fr_col],
            to: [to_row, to_col]
        });
        to_row += 1;
    }

    //left
    to_row = fr_row;
    to_col = fr_col - 1;
    while ((to_col < n + 1) && board.position[to_row][to_col] === 0) {
        possible_moves.push({
            fr: [fr_row, fr_col],
            to: [to_row, to_col]
        });
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
    if (evaluate_board === 'white wins') return;
    generate_children(board);
    board.children.map(board => generate_children_rec(board, max_level))
}

function evaluate_board_rec(board) {
    if (board.children === undefined || board.children.length == 0) {
        evaluate_board(board);
        display_board(board);
        console.log('Score: ' + board.score);
        return;
    }
    board.children.map(board__child => evaluate_board_rec(board__child));
    console.log(board);
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
    console.log(board)
}

/// 
let top_board = create_init_board();
generate_children_rec(top_board, 3);
evaluate_board_rec(top_board)
console.log('Total number of boards explored: ' + count);
console.log(top_board.score)