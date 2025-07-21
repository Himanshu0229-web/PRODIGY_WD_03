let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

const winConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

cells.forEach(cell => cell.addEventListener("click", handleClick));

function handleClick(event) {
  const index = event.target.dataset.index;

  if (!gameActive || board[index] !== "") return;

  board[index] = currentPlayer;
  event.target.textContent = currentPlayer;

  if (checkWinner()) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (!board.includes("")) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
  for (const condition of winConditions) {
    const [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      highlightWinner(condition);
      return true;
    }
  }
  return false;
}

function highlightWinner(indices) {
  const className = currentPlayer === "X" ? "winning-x" : "winning-o";
  indices.forEach(index => {
    cells[index].classList.add(className);
  });
}


function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("winning-x", "winning-o");
  });
}

// Theme toggle
document.getElementById("themeToggle").addEventListener("change", function () {
  document.body.classList.toggle("dark");
});


