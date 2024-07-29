import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import NewPost from "./pages/NewPost";
import Posts from "./pages/Posts";
import Post from "./pages/Post";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/new-post" element={<PrivateRoute />}>
              <Route path="/new-post" element={<NewPost />} />
            </Route>
            <Route path="/posts" element={<PrivateRoute />}>
              <Route path="/posts" element={<Posts />} />
            </Route>
            <Route path="/post/:postId" element={<PrivateRoute />}>
              <Route path="/post/:postId" element={<Post />} />
            </Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer autoClose={2500} />
    </>
  );
}

export default App;
