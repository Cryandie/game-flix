import "./index.css";

function Footer() {
  return (
    <div className="footer-container">
      <p>Made by Seïf Ben Sghaier</p>
      <p>Contact: seifbensghaier@gmail.com</p>
      <p>
        Gaming API:
        <a
          className="footer-link"
          href="https://rawg.io/apidocs"
          target="_blank"
          rel="noreferrer"
        >
          Rawg_API
        </a>
      </p>
      <p>
        Github Repo:
        <a
          className="footer-link"
          href="https://github.com/Cryandie/game-flix"
          target="_blank"
          rel="noreferrer"
        >
          My Github
        </a>
      </p>
    </div>
  );
}

export default Footer;
