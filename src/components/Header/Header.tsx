import "./Header.css";

function Header() {
  return (
    <div className="header-container">
      <img className="logo" src="./assets/video-games-logo.PNG" alt="Logo" />
      {/* TODO: Make contact a router link to the contact page */}
      <h2 className="contact"> CONTACT </h2>
    </div>
  );
}

export default Header;
