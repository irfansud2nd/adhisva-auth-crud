import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import { AuthProvider } from "./context/AuthContext";
import RegisterPage from "./pages/auth/RegisterPage";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import AllBlogPage from "./pages/blog/AllBlogPage";
import AuthorBlogPage from "./pages/blog/AuthorBlogPage";
import BlogPage from "./pages/blog/BlogPage";
import CreateBlogPage from "./pages/blog/CreateBlogPage";
import EditBlogPage from "./pages/blog/EditBlogPage";
import SearchBlogPage from "./pages/blog/SearchBlogPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="/" element={<RequireAuth />}>
              <Route path="/" element={<AllBlogPage />} />
              <Route path="/create" element={<CreateBlogPage />} />
              <Route path="/edit/:id" element={<EditBlogPage />} />
              <Route path="/search/:title" element={<SearchBlogPage />} />
              <Route path="/blog/:id" element={<BlogPage />} />
              <Route path="/author/:email" element={<AuthorBlogPage />} />
              <Route
                path="/author/:email/published"
                element={<AuthorBlogPage published={true} />}
              />
              <Route
                path="/author/:email/unpublished"
                element={<AuthorBlogPage published={false} />}
              />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
