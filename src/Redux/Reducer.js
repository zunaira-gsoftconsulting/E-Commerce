import { createSlice } from "@reduxjs/toolkit";

  const initialState = {
    user: null,
    movies: [],
    loading: false,
    error: ''
  }

  export const fetchMovies = () => {
    return function (dispatch) {
      dispatch(fetchRequest())
      fetch("http://localhost:3000/movies")
      .then(res => res.json())
      .then(res => {
        // const movie = res.map((data) => (
        //   <p key={data.id}>{data.name}</p>
        // ))
        dispatch(fetchSuccess(res))
      })
      .catch(error => {
        dispatch(fetchFailure(error.message))
      })
    }
  }

  const info = createSlice({
    name: "user",
    initialState,
    reducers: {
      login: (state, action) => {
        state.user = action.payload
      },
      logout: (state) => {
        state.user = null
      },
      fetchRequest: (state) => {
        state.loading = true
      },  
      fetchSuccess: (state, action) => {
        state.loading = false
        state.movies = action.payload
        state.error = ''
      },
      fetchFailure: (state, action) => {
        state.loading = false
        state.movies = []
        state.error = action.payload
      },
    }
  })
  
export const {login, logout, fetchRequest, fetchSuccess, fetchFailure} = info.actions

export default info.reducer