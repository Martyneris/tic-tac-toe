import React from 'react';
import { render, getByTestId } from '@testing-library/react';
import App from './App';
import store, { reducer } from './store/index'
import { userMove } from './store/actions'
import { Provider } from 'react-redux'

describe('Component rendering', () => {

  test('renders app container', () => {
    const { getByTestId } = render(<Provider store={store}>
      <App />
    </Provider>);
    const appContainer = getByTestId('game-board');
    expect(appContainer).toBeInTheDocument();
  });

  test('renders game board element', () => {
    const { getByTestId } = render(<Provider store={store}>
      <App />
    </Provider>);
    const boardElement = getByTestId('game-board');
    expect(boardElement).toBeInTheDocument();
  });

})

describe('Reducers', () => {
  it('has  an initial state', () => {
    const expectedState = {
      board: [null, null, null, null, null, null, null, null, null],
      turn: '',
      status: '',
      winner: null,
      moves: 0,
      statistics: []
    };

    const { state } = store.getState()
    expect(state).toEqual(expectedState);
  });

  it('should update the board when a player makes a move', () => {
    const state = {
      board: [null, null, null, null, null, null, null, null, null],
      turn: '',
      status: '',
      winner: null,
      moves: 0,
      statistics: []
    };

    const expectedState = {
      board: ["X", null, null, null, null, null, null, null, null],
      turn: 'X',
      status: '',
      winner: null,
      moves: 1,
      statistics: [{
        "moves": 1,
        "player": "X",
        "position": 0,
      },]
    };

    const position = 0

    const action = userMove(position);
    const result = reducer(state, action).state;

    expect(result).toEqual(expectedState);
  });
});
