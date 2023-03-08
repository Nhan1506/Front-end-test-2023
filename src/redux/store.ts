import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import blogsReducer, { fetchBlogs } from "./blogsSlice";

// Create the middleware instance and methods
const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: fetchBlogs.pending,
  effect: async (action, listenerApi) => {
    // Run whatever additional side-effect-y logic you want here
  },
});

export default configureStore({
  reducer: {
    blog: blogsReducer,
  },
  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});
