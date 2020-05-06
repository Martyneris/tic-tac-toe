export const winnerCheck = (board, player) => {
    const horizontalWins = [0, 3, 6].map( i => { return [i, i + 1, i + 2] })
    const verticalWins = [0, 1, 2].map( i => { return [i, i + 3, i + 6] })
    const diagonalWins = [[0, 4, 8], [2, 4, 6]]

    const allWins = [].concat(horizontalWins).concat(verticalWins).concat(diagonalWins)
    const result = allWins.some(indices => {
      return board[indices[0]] === player && board[indices[1]] === player && board[indices[2]] === player
    })
  
    return result
  }