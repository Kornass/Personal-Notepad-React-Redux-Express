import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createPost, reset } from "../features/posts/postSlice";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
function NewPost() {
  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.post
  );
  const [name] = useState(user.name);
  const [email] = useState(user.email);
  const [post, setPost] = useState("");
  const [type, setType] = useState("News");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      dispatch(reset());
      navigate("/posts");
    }
    dispatch(reset());
  }, [dispatch, isError, isSuccess, navigate, message]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost({ post, type }));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <BackButton url="/" />
      <section className="heading">
        <h1>Create New Post</h1>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="type"></label>
            <select
              name="type"
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="News">News</option>
              <option value="Science">Science</option>
              <option value="Sport">Sport</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Reminder">Reminder</option>
              <option value="Food">Food</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="post">Post</label>
            <textarea
              name="post"
              id="post"
              className="form-control"
              placeholder="My Post..."
              value={post}
              onChange={(e) => setPost(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default NewPost;
