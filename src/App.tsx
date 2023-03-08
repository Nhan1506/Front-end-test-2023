import React, { Suspense, lazy } from "react"
import { Routes, Route } from "react-router-dom"
import { SnackbarProvider } from "notistack"
import { BrowserRouter } from "react-router-dom"

const Home = lazy(() => import("./pages/Home").then(({ Home }) => ({ default: Home })))

const AddBlog = lazy(() => import("./pages/AddBlog").then(({ AddBlog }) => ({ default: AddBlog })))

const DetailBlog = lazy(() =>
  import("./pages/DetailBlog").then(({ DetailBlog }) => ({
    default: DetailBlog,
  }))
)

const EditBlog = lazy(() => import("./pages/EditBlog").then(({ EditBlog }) => ({ default: EditBlog })))

function App() {
  return (
    <>
      <BrowserRouter>
        <SnackbarProvider
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <h1>Front End Test 2023</h1>
          <Suspense fallback={<p> Loading...</p>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blog/add" element={<AddBlog />} />
              <Route path="/blog/detail/:id" element={<DetailBlog />} />
              <Route path="/blog/edit/:id" element={<EditBlog />} />
            </Routes>
          </Suspense>
        </SnackbarProvider>
      </BrowserRouter>
    </>
  )
}

export default App
