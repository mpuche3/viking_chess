let count = 0;
const n = 9 - 1;

function create_init_board() {
    position = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 8, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 2, 0, 0, 0, 8],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]
    board = {
        position: position,
        score: 0,
        children: [],
        level: 0,
        previous_move: undefined,
        best_move: undefined,
    }
    return board;
}

function display_board(board) {
    console.log()
    board.position.map(row => console.log(row))
    console.log()
}

function apply_move(board, move) {
    //const new_board = JSON.parse(JSON.stringify(board));
    count += 1;
    const arr = JSON.parse(JSON.stringify(board.position));
    let new_board = {
        position: arr
    };
    const fr_row = move.fr[0];
    const fr_col = move.fr[1];
    const to_row = move.to[0];
    const to_col = move.to[1];
    const fr_val = board.position[fr_row][fr_col];
    const to_val = board.position[to_row][to_row];

    //if (to_val !==0) throw error;
    if (fr_row < 0 || n < fr_row) throw error;
    if (fr_col < 0 || n < fr_col) throw error;
    if (to_row < 0 || n < fr_row) throw error;
    if (to_col < 0 || n < to_col) throw error;

    new_board.position[fr_row][fr_col] = to_val;
    new_board.position[to_row][to_col] = fr_val;
    new_board.level = board.level + 1;
    new_board.children = [];
    return new_board;
}

function evaluate_board(board) {
    const arr = board.position;
    let score = 0;

    if (board.position[0][0] === 2) return 1000;
    if (board.position[0][n] === 2) return 1000;
    if (board.position[n][0] === 2) return 1000;
    if (board.position[n][n] === 2) return 1000;

    arr.map(row => {
        row.map(value => {
            if (value === 1) score += 1;
            if (value === 8) score -= 0.42325;
        });
    });

    score = Math.round(score);
    board.score = score;
    return Math.round(score);
}

function generate_possible_moves(board, cell) {
    let possible_moves = [];
    const fr_row = cell[0];
    const fr_col = cell[1];

    //up
    to_row = fr_row - 1;
    to_col = fr_col;
    while (to_row > -1 && board.position[to_row][to_col] === 0) {
        possible_moves.push({
            fr: [fr_row, fr_col],
            to: [to_row, to_col]
        });
        to_row -= 1;
    }

    //right
    to_row = fr_row;
    to_col = fr_col + 1;
    while (to_col < n + 1 && board.position[to_row][to_col] === 0) {
        possible_moves.push({
            fr: [fr_row, fr_col],
            to: [to_row, to_col]
        });
        to_col += 1;
    }

    //down
    to_row = fr_row + 1;
    to_col = fr_col;
    while (to_row < n + 1 && board.position[to_row][to_col] === 0) {
        possible_moves.push({
            fr: [fr_row, fr_col],
            to: [to_row, to_col]
        });
        to_row += 1;
    }

    //left
    to_row = fr_row;
    to_col = fr_col - 1;
    while (to_col < n + 1 && board.position[to_row][to_col] === 0) {
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
    generate_children(board);
    board.children.map(board => generate_children_rec(board, max_level))
}

function evaluate_board_rec(board) {
    let arr = board.children;
    if (arr === undefined || arr.length == 0) return evaluate_board(board);
    arr.map(board__child => board__child.score = evaluate_board_rec(board__child));

    if (board.level%2 === 0) {
        board.score = arr.reduce((total, board_child) => {
            //console.log(total);
            //console.log(board_child.score);
            //console.log(Math.min(board_child.score, total), 0);
            return Math.min(board_child).score, total;
        }, 0);
        //console.log(board.score);
        console.log(board);
    } else {
        board.score = arr.reduce((total, board_child) => {
            //console.log('total: '+ total);
            //console.log('board_child.score: ' + board_child.score);
            //console.log('max: ' + Math.max(board_child.score, total));
            return Math.max(board_child.score, total);
        }, 0);
        //console.log(board.score);
        console.log(board);
    }
}
/// 
let top_board = create_init_board();
//cdisplay_board(board);
//const new_board = apply_move (board, 0, 3, 'left');
//display_board(new_board);
//console.log(score);
//moves = generate_board_possible_moves(board, 'black');
generate_children_rec(top_board, 2);
//console.log(board);
//console.log(board.children[0])
//move = moves[0];
//console.log(move);
//new_board = apply_move(board, move);
//display_board(new_board);
display_board(top_board);
display_board(top_board.children[0]);
//display_board(board.children[0].children[0]);
//display_board(board.children[0].children[0].children[0]);
evaluate_board_rec(top_board)
//display_board(board.children[0].children[0].children[0].children[0]);
console.log('Total number of boards explored: ' + count);
console.log(board.score)