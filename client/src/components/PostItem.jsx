import { Link } from "react-router-dom";

function PostItem({ post }) {
  return (
    <div className="ticket">
      <div>{new Date(post.createdAt).toLocaleString("en-US")}</div>
      <div>{post.type}</div>
      <div className={`status status-${post.status}`}>{post.status}</div>
      <Link to={`/post/${post._id}`} className="btn btn-reverse btn-sm">
        View
      </Link>
    </div>
  );
}

export default PostItem;
