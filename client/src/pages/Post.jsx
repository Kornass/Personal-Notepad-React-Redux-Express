import { useSelector, useDispatch } from "react-redux";
import {
  getSinglePost,
  removePost,
  closePost,
  restorePost,
  updatePostContent,
} from "../features/posts/postSlice";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Modal from "react-modal";

Modal.setAppElement("#root");

function Post() {
  const { post, isLoading, isError, message } = useSelector(
    (state) => state.post
  );
  const [modalIsOpen, setIsOpen] = useState(false);
  const [postContent, setPostContent] = useState(undefined);
  const [editing, setEditing] = useState(false);

  const editChange =
    postContent === post.post && editing
      ? false
      : postContent !== post.post && editing
      ? true
      : undefined;

  const dispatch = useDispatch();
  const { postId } = useParams();
  const navigate = useNavigate();

  function handleEdit(e) {
    const buttonContent = e.target.textContent;
    if (buttonContent !== "Submit") {
      setEditing((prev) => !prev);
    } else {
      dispatch(updatePostContent({ postId, post: postContent }));
      setEditing(false);
      toast.success("Post Updated!");
    }
  }

  function afterOpenModal() {
    console.log("after open");
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    setPostContent(post.post);
  }, [post.post]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getSinglePost(postId));
    //eslint-disable-next-line
  }, [isError, message, postId]);

  const onPostClose = () => {
    dispatch(closePost(postId));
    toast.success("Post Closed");
    navigate("/posts");
  };

  const onPostRemove = () => {
    dispatch(removePost(postId));
    toast.success("Post Deleted!");
    navigate("/posts");
  };

  const onPostRestore = () => {
    dispatch(restorePost(postId));
    toast.success("Post Restored!");
    navigate("/posts");
  };

  if (isLoading || postContent === undefined) {
    return <Spinner />;
  }

  if (isError) {
    return <h3>Something went wrong...</h3>;
  }
  return (
    <div className="ticket-page">
      <header className="ticket-heeader">
        <BackButton url="/posts" />
        <h2>
          Post Id: {post._id}
          <span className={`status status-${post.status}`}>{post.status}</span>
        </h2>
        <h3>
          Date Submitted: {new Date(post.createdAt).toLocaleString("en-US")}
        </h3>
        <h3>Type: {post.type}</h3>
        <hr />
        <textarea
          rows="3"
          className={editing ? "ticket-desc edit" : "ticket-desc"}
          value={postContent}
          disabled={!editing}
          onChange={(e) => setPostContent(e.target.value)}
        />
      </header>
      {post.status !== "closed" ? (
        <button onClick={onPostClose} className="btn btn-block btn-secondary">
          Close post
        </button>
      ) : (
        <button onClick={onPostRestore} className="btn btn-block btn-secondary">
          Restore post
        </button>
      )}
      <button
        onClick={handleEdit}
        className={`btn btn-block btn-update ${
          editChange === true ? "activeEdit" : ""
        }`}
      >
        {editChange === true
          ? "Submit"
          : editChange === false
          ? "Cancel Editing"
          : "Update post"}
      </button>
      <button
        onClick={() => setIsOpen(true)}
        className="btn btn-block btn-danger"
      >
        Remove post
      </button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        className="modal"
        contentLabel="Example Modal"
      >
        <p>
          Post are going to be deleted permanently! Are you sure you want to
          remove it ?
        </p>
        <div className="modalButtons">
          <button className="btn btn-danger" onClick={onPostRemove}>
            Delete
          </button>
          <button className="btn btn-light" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default Post;
