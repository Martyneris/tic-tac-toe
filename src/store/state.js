import { winnerCheck } from '../utils/helpers'
import * as types from './types'

const initialState = {
    board: [null, null, null, null, null, null, null, null, null],
    turn: '',
    status: '',
    winner: null,
    moves: 0,
    statistics: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case types.GAME_STATUS:
            return { ...state, status: action.status }
        case types.USER_MOVE: {
            let turn = state.turn
            const board = state.board.map((val, i) => {
                turn = state.turn === 'O' || state.turn === '' ? 'X' : 'O'
                if (i === action.pos) val = turn
                return val
            })
            const statistics = { player: state.turn === 'O' || state.turn === '' ? 'X' : 'O', moves: state.moves + 1, position: action.pos }
            return { ...state, board, turn, moves: state.moves + 1, statistics: [...state.statistics, statistics] }
        }
        case types.CHECK_FOR_WINNER: {
            const winnerResult = winnerCheck(state.board, action.player)
            const winner = winnerResult ? action.player : null
            const status = winner ? `The winner is ${action.player}` : state.status
            if (winner) {
                return { ...state, winner, status }
            }
            return { ...state, winner, status }
        }
        case types.RESET_GAME: {
            return { ...initialState }
        }
        default:
            return state
    }
}