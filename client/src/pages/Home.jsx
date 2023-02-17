import { Link } from "react-router-dom";
import { FaQuestion, FaTicketAlt } from "react-icons/fa";
function Home() {
  return (
    <>
      <section className="heading">
        <h1>What do you need help with</h1>
        <p>Choose an option</p>
      </section>

      <Link to="/new-ticket" className="btn btn-reverse btn-block">
        <FaQuestion /> Create new ticket
      </Link>
      <Link to="/new-ticket" className="btn btn-block">
        <FaTicketAlt /> View my tickets
      </Link>
    </>
  );
}

export default Home;
