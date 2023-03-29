import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserPosts,
  reset,
  updatePostStatus,
} from "../features/posts/postSlice";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import PostItem from "../components/PostItem";

function Posts() {
  const { posts, isLoading, isSuccess } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  // reset the state on mount
  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);

  useEffect(() => {
    dispatch(getUserPosts());
    posts.map((post) => dispatch(updatePostStatus(post._id)));
    //eslint-disable-next-line
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <BackButton url="/" />
      <h1>Posts</h1>
      <div className="tickets">
        <div className="ticket-headings">
          <div>Date</div>
          <div>Type</div>
          <div>Status</div>
          <div></div>
        </div>
        {posts
          .slice()
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((post) => (
            <PostItem key={post._id} post={post} />
          ))}
      </div>
    </>
  );
}

export default Posts;
