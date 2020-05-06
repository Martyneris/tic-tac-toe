import * as types from './types'

export const userMove = (pos) => {
    return {
        type: types.USER_MOVE,
        pos
    }
}

export const gameStatus = (status) => {
    return {
        type: types.GAME_STATUS,
        status
    }
}

export const checkForWinner = (player) => {
    return {
        type: types.CHECK_FOR_WINNER,
        player
    }
}

export const resetGame = () => {
    return {
        type: types.RESET_GAME
    }
}