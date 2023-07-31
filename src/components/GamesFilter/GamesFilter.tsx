import "./GamesFilter.css";

function GamesFilter() {
  return (
    <div className="filter-card">
      <h1 className="filter-card-title">Filter Results</h1>
      <section className="card-items-container">
        <div className="card-item">
          <label htmlFor="name">Name (contains)</label>
          <input className="card-input" type="text" placeholder="Text string" />
        </div>
        <div className="card-item">
          <label htmlFor="score">Minimum Score</label>
          {/* TODO: Replace with a dropdown from 1 to 10 or limit the numbers from 1 to 10 */}
          <input className="card-input" type="number" placeholder="1 - 10" />
        </div>
      </section>
      <section className="card-footer">
        <div className="footer-container">
          <label htmlFor="order">Order By</label>
          <section className="order-content">
            {/* TODO: Insert arrow up logo here */}
            <h2>Logo</h2>
            <input
              className="order-dropdown"
              type="text"
              placeholder="Replace me with a dropdown "
            />
          </section>
          <section className="filter-button-container">
            <button className="filter-button"> Clear </button>
          </section>
        </div>
      </section>
    </div>
  );
}

export default GamesFilter;
