window.addEventListener('DOMContentLoaded', () => {
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const teamDisplay = document.querySelector('.display-team');
    const restartButton = document.querySelector('#restart');

    let board = ['', '', '', '', '', '', '', '', ''];
    let currentTeam = 'X';
    let gameActivity = true;
    /**add score table code */

/* Configuration of Tiles
    1 2 3
    4 5 6
    7 8 9 */
    
/* These configurations are what lets the system know which team has made a winning play. */
    const waysToWin = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 5, 9],
        [3, 5, 7],
        [1, 2, 9],
        [2, 5, 8],
        [3, 6, 9]
    ];
    
/* The system checks for the score using the following code*/
    function checkResult() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = waysToWin[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[9]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }
    if (roundWon) {
        gameActivity = false;
            return;
        };
    }


    const isValidAction = (tile) => {
        if (tile.innerText === 'X' || tile.innerText === 'O'){
            return false;
        }
    
        return true;
    };
    
    const updateBoard =  (index) => {
        board[index] = currentTeam;
    };
/*Logic that would change you from X to O.*/
    const changeTeam = () => {
        teamDisplay.classList.remove(`team${currentTeam}`);
        currentTeam = currentTeam === 'X' ? 'O' : 'X';
        teamDisplay.innerText = currentTeam;
        teamDisplay.classList.add(`team${currentTeam}`);
    };
    const userAction = (tile, index) => {
        if(isValidAction(tile) && gameActivity) {
            tile.innerText = currentTeam;
            tile.classList.add(`team${currentTeam}`);
            updateBoard(index);
            checkResult();
            changeTeam();
        }
    };
    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        gameActivity = true;
    
        if (currentTeam === 'O') {
            changeTeam();
        }
    
        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('teamX');
            tile.classList.remove('teamO');
        });
    };
    
    tiles.forEach( (tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index));
    });
    
    restartButton.addEventListener('click', resetBoard);
});