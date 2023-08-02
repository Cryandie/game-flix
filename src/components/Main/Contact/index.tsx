import "./index.css";
function Contact() {
  return (
    <div className="contact-container">
      <div className="contact-intro">
        <h1>GET IN TOUCH</h1>
        <p className="contact-description">
          Trysail transom furl Sea Legs scallywag Jack Ketch chandler mizzenmast
          reef sails skysail. Shiver me timbers loot bucko belaying pin Sea Legs
          boom gunwalls booty jury mast fore.
        </p>
      </div>
      <div className="contact-form-container">
        <form>
          <h2>Contact Form</h2>
          <section className="contact-item-container">
            <div className="contact-item">
              <label className="contact-label" htmlFor="name">
                Name <p className="contact-required-symb">*</p>
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="contact-input"
              />
            </div>
            <div className="contact-item">
              <label className="contact-label" htmlFor="email">
                Email Address<p className="contact-required-symb">*</p>
              </label>
              <input
                type="text"
                name="email"
                id="email"
                className="contact-input"
              />
            </div>
          </section>
          <section className="contact-item-container">
            <div className="contact-item">
              <label className="contact-label" htmlFor="message">
                Message <p className="contact-required-symb">*</p>
              </label>
              <textarea name="message" id="message" className="contact-input" />
            </div>
          </section>
          <section className="contact-btn-container">
            <button type="submit" className="contact-button">
              Submit
            </button>
          </section>
        </form>
      </div>
    </div>
  );
}

export default Contact;
