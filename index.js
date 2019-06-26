
let board = {};
const n = 11 - 1;

function create_init_board(){
    position = [
        [0, 0, 0, 8, 8, 8, 8, 8, 0, 0, 0],
        [0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [8, 0, 0, 0, 0, 1, 0, 0, 0, 0, 8],
        [8, 0, 0, 0, 1, 1, 1, 0, 0, 0, 8],
        [8, 8, 0, 1, 1, 2, 1, 1, 0, 8, 8],
        [8, 0, 0, 0, 1, 1, 1, 0, 0, 0, 8],
        [8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8],
        [8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8],
        [0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0],
        [0, 0, 0, 8, 8, 8, 8, 8, 0, 0, 0],
    ]
    board = {
        position: position,
        score: 0,
        children:[]
    }
    return board;
}

function display_board(board){
    console.log()
    board.position.map(row => console.log(row))
    console.log()
}

function apply_move (board, fr_row, fr_col, to_row, to_col){
    const new_board = JSON.parse(JSON.stringify(board));
    const fr_value = board.position[fr_row][fr_col];
    const to_value = board.position[to_row][to_row];

    if (to_value !==0) throw error;
    if (fr_row < 0 || n < fr_row) throw error;
    if (fr_col < 0 || n < fr_col) throw error;
    if (to_row < 0 || n < fr_row) throw error;
    if (to_col < 0 || n < to_col) throw error;

    new_board.position[fr_row][fr_col] = to_value;
    new_board.position[to_row][to_col] = fr_value;
    return new_board;
}

function evaluate_board (board){
    const arr = board.position;
    let score = 0;
    if (board.position[0][0] === 2) score = 1000;
    if (board.position[0][n] === 2) score = 1000;
    if (board.position[n][0] === 2) score = 1000;
    if (board.position[n][n] === 2) score = 1000;
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

function generate_possible_moves(board, cell){
    let possible_moves = [];
    const fr_row = cell[0];
    const fr_col = cell[1];

    //up
    to_row = fr_row -1;
    while (board.position[to_row][to_col] !== 0 || board.position[to_row][to_col] > -1) {
        possible_moves.push({fr:[fr_row, fr_col], to:[to_row, to_col]});
        to_row -= 1;
    }

    //right
    
    //down
    
    //left
    return [];
}

/// 
board = create_init_board();
display_board(board);
//const new_board = apply_move (board, 0, 3, 'left');
//display_board(new_board);
const score = evaluate_board(board);
console.log(score);