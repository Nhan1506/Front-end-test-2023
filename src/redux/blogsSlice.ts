import { AxiosInstance } from "./../api/AxiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchBlogs = createAsyncThunk(
  "blog/detail/get",
  async (id: string) => {
    const { data } = await AxiosInstance.get(`/blogs/${id}`);
    return data;
  }
);

export const slice = createSlice({
  name: "blog",
  initialState: {
    isLoading: false,
    data: {
      createAt: "",
      id: "",
      title: "",
      content: "",
      image: "",
      body: {
        title: "",
        content: "",
        image: "",
      },
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBlogs.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchBlogs.fulfilled, (state, action: any) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchBlogs.rejected, (state) => {
      state.isLoading = false;
    });
  },
});
export default slice.reducer;
