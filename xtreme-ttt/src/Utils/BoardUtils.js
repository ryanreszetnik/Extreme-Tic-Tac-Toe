const wins = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
export const isGameFinished = (board) => {
  const XBoards = new Array(9).fill(false);
  const OBoards = new Array(9).fill(false);
  const boardCopy = [...board];
  for (let i = 0; i < 9; i++) {
    const b = boardCopy.splice(0, 9);
    const winners = smallBoardWinners(b);
    // console.log("spliced board", b);
    XBoards[i] = winners["X"];
    OBoards[i] = winners["O"];
  }
  const XWins = bigBoardWinners(XBoards);
  const OWins = bigBoardWinners(OBoards);
  return XWins || OWins;
};
const bigBoardWinners = (board) => {
  //   console.log(board);
  let win = false;
  wins.forEach((w) => {
    if (board[w[0]] && board[w[1]] && board[w[2]]) {
      win = true;
    }
  });
  return win;
};
const smallBoardWinners = (board) => {
  let XWin = false;
  let OWin = false;
  wins.forEach((w) => {
    if (board[w[0]] === "X" && board[w[1]] === "X" && board[w[2]] === "X") {
      XWin = true;
    } else if (
      board[w[0]] === "O" &&
      board[w[1]] === "O" &&
      board[w[2]] === "O"
    ) {
      OWin = true;
    }
  });
  return { X: XWin, O: OWin };
};
