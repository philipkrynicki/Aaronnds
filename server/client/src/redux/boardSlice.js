import axios from "axios";

export const getBoardAsync = createAsyncThunk(
  'board/getBoardAsync',
  async (boardId) => {
    const response = await axios.get(`http://localhost:5000/api/boards/${boardId}`);
    return { response }
  })

  const boardSlice = createSlice({
    name:'board',
    initialState: {},
    reducers: {},
    extraReducers: {
      [getBoardAsync.fulfilled]: (state, action) => {
        console.log(action.payload.response.data)
        return action.payload.data
      }
    }
  })

 export default boardSlice.reducer; 