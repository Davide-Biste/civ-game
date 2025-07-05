import { configureStore, createSlice } from '@reduxjs/toolkit'

export type GameState = {
  score: number
  level: number
  threshold: number
}

const initialState: GameState = {
  score: 0,
  level: 1,
  threshold: 10,
}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    addScore: (state, action: { payload: number }) => {
      state.score += action.payload
      if (state.score >= state.threshold) {
        state.score = state.score - state.threshold
        state.level += 1
        state.threshold = Math.round(state.threshold * 1.5)
      }
    },
    reset: () => initialState,
  },
})

export const { addScore, reset } = gameSlice.actions

export const store = configureStore({
  reducer: {
    game: gameSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
