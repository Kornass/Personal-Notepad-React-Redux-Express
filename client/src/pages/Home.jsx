import { Link } from "react-router-dom";
import { FaFeatherAlt, FaWpforms } from "react-icons/fa";
function Home() {
  return (
    <>
      <section className="heading">
        <h1>Welcome in your personal notepad!</h1>

        <h5>
          Post under different categories! <br /> You can store here important
          informations, reminders, recipies, todos and more !
        </h5>
        <p>Choose an option:</p>
      </section>

      <Link to="/new-post" className="btn btn-reverse btn-block">
        <FaFeatherAlt /> Create new post
      </Link>
      <Link to="/my-posts" className="btn btn-block">
        <FaWpforms /> View my posts
      </Link>
    </>
  );
}

export default Home;
