import { useState } from "react";
import { useSelector } from "react-redux";

function NewPost() {
  const { user } = useSelector((state) => state.auth);
  const [name] = useState(user.name);
  const [email] = useState(user.email);
  const [post, setPost] = useState("");
  const [type, setType] = useState("News");

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <section className="heading">
        <h1>Create New Post</h1>
      </section>
      <section className="form">
        <div className="form-group">
          <label htmlFor="name">User Name</label>
          <input type="text" className="form-control" value={name} disabled />
        </div>
        <div className="form-group">
          <label htmlFor="name">User Email</label>
          <input type="text" className="form-control" value={email} disabled />
        </div>
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
