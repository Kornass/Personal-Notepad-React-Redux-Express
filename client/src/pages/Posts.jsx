import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserPosts,
  reset,
  updatePostStatus,
} from "../features/posts/postSlice";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import PostItem from "../components/PostItem";
import { FaRegWindowClose } from "react-icons/fa";

function Posts() {
  const { posts, isLoading, isSuccess } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const [sorting, setSorting] = useState("");

  const sortingOptions = [
    "Status: new",
    "Status: open",
    "Status: closed",
    "Type: News",
    "Type: Science",
    "Type: Sport",
    "Type: Entertainment",
    "Type: Reminder",
    "Type: Food",
    "Type: Date",
  ];

  const handleSortChange = (e) => {
    setSorting(e.target.value);
  };

  const renderPosts = () => {
    const dateSorted = posts
      .slice()
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    if (!sorting) return dateSorted;
    const sort = sorting.split(": ");
    return dateSorted.filter((e) => e[[sort[0].toLowerCase()]] === sort[1]);
  };

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);

  useEffect(() => {
    if (posts.length === 0) dispatch(getUserPosts());
    else posts.forEach((post) => dispatch(updatePostStatus(post._id)));
    //eslint-disable-next-line
  }, [dispatch, posts]);

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
          <div id="sorting">
            Filtered by :
            <div>
              <select
                name="sorting"
                id="sort-select"
                onChange={handleSortChange}
              >
                <option value={"" || sorting}>
                  {!sorting ? "Choose filter" : sorting}
                </option>
                {sortingOptions
                  .filter((option) => option !== sorting)
                  .map((option) => {
                    return (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    );
                  })}
              </select>
              {sorting && (
                <button id="sort-cancel" onClick={() => setSorting("")}>
                  <FaRegWindowClose />
                </button>
              )}
            </div>
          </div>
        </div>
        {renderPosts().map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </>
  );
}

export default Posts;
