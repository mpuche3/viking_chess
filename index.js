

function create_init_board(){
    console.log('Creating new init board');
    position = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
    ]
    board = {
        position: position,
        score: 0,
        children:[]
    }
    return board;
}

function display_board(board){
    console.log(board.position);
}

const board_init = create_init_board();
display_board(board_init);