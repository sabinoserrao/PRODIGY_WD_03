document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const restartButton = document.getElementById('restart-button');

    let currentPlayer = 'X';
    let gameActive = true;
    let gameState = ['', '', '', '', '', '', '', '', ''];

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const handleCellClick = (e) => {
        const cell = e.target;
        const cellIndex = parseInt(cell.dataset.index);

        if (gameState[cellIndex] !== '' || !gameActive) return;

        cell.textContent = currentPlayer;
        gameState[cellIndex] = currentPlayer;

        checkWin();
        checkDraw();

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    };

    const checkWin = () => {
        for (const [a, b, c] of winningConditions) {
            if (gameState[a] === gameState[b] && gameState[b] === gameState[c] && gameState[a] !== '') {
                gameActive = false;
                alert(`${currentPlayer} wins!`);
                return;
            }
        }
    };

    const checkDraw = () => {
        if (!gameState.includes('') && gameActive) {
            gameActive = false;
            alert('It\'s a draw!');
        }
    };

    const restartGame = () => {
        currentPlayer = 'X';
        gameActive = true;
        gameState = ['', '', '', '', '', '', '', '', ''];
        cells.forEach(cell => cell.textContent = '');
    };

    cells.forEach((cell, index) => {
        cell.dataset.index = index; // Set custom data attribute for cell index
        cell.addEventListener('click', handleCellClick);
    });

    restartButton.addEventListener('click', restartGame);
});
