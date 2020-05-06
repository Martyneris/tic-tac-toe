import React, { Component } from 'react';
import { connect } from 'react-redux'
import './App.css';
import { userMove, gameStatus, resetGame, checkForWinner } from './store/actions'
import { Square } from './components/Square'

class App extends Component {

  componentWillUpdate = (prevProps) => {
    const { turn, moves } = this.props
    if (prevProps.board !== this.props.board && moves >= 2) {
      const nextTurn = turn === '' || turn === 'O' ? 'X' : 'O'
      this.props.checkForWinner(nextTurn)
    }
  }

  handleSquarePress = (index) => {
    const { board, moves } = this.props
    if (!board[index]) {
      this.props.gameStatus('')
      this.props.userMove(index)
    } else {
      this.props.gameStatus('That square is already taken!')
    }

    if (moves >= 8) {
      this.props.gameStatus('Tie game!')
    }
  }

  render() {
    const {
      board,
      turn,
      winner,
      status,
      resetGame,
      statistics
    } = this.props
console.log(this.props)
    return (
      <div className="App" data-testid="App">
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {!winner &&
            <h3>{`Next turn : ${turn === '' || turn === 'O' ? 'X' : 'O'}`}</h3>
          }
          {status &&
            <h2>{status}</h2>
          }
          <div className="game-board" data-testid="game-board">
            {board.map((item, i) => {
              return (
                <Square
                  key={i}
                  value={item}
                  handleClick={winner ? () => resetGame() : () => this.handleSquarePress(i, turn)}
                  style={winner && { pointerEvents: 'none' }}
                />
              )
            })}
          </div>
          {statistics.length > 0 &&
            statistics.map((item, i) => {
              return (
                <div key={i}>
                  {`Move no${item.moves} : Player ${item.player} took the square at position no: ${item.position + 1}`}
                </div>
              )
            })
          }
          {statistics.length > 0 &&
            <button onClick={resetGame} style={{ width: '170px', height: '70px', alignSelf: 'center' }}>RESET</button>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state: state.state,
    board: state.state.board,
    turn: state.state.turn,
    status: state.state.status,
    winner: state.state.winner,
    moves: state.state.moves,
    statistics: state.state.statistics
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    userMove: (pos) => {
      dispatch(userMove(pos))
    },
    gameStatus: (status) => {
      dispatch(gameStatus(status))
    },
    checkForWinner: (player) => {
      dispatch(checkForWinner(player))
    },
    resetGame: () => {
      dispatch(resetGame())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
