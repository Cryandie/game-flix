import "./GamesFilter.css";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import CustomDropdown from "../../utility/custom-dropdown/CustomDropdown";

//Not creating a types file since we have only one interface here
interface GamesFilterProps {
  nameFilter: string;
  setNameFilter: (value: string) => void;
  minScoreFilter: string | number;
  setMinScoreFilter: (value: string | number) => void;
  order: string;
  setOrder: (value: string) => void;
}

function GamesFilter({
  nameFilter,
  setNameFilter,
  minScoreFilter,
  setMinScoreFilter,
  order,
  setOrder,
}: GamesFilterProps) {
  const options = [
    { value: "release", label: "Release Date" },
    { value: "score", label: "Score" },
    { value: "name", label: "Name" },
  ];
  const handleDropdownChange = (value: string) => {
    setOrder(value);
  };
  const handleClear = () => {
    setNameFilter("");
    setMinScoreFilter("");
    setOrder("score");
  };
  return (
    <div className="filter-card">
      <h1 className="filter-card-title">Filter Results</h1>
      <section className="card-items-container">
        <div className="card-item">
          <label htmlFor="name">Name (contains)</label>
          <input
            className="card-input"
            type="text"
            placeholder="Text string"
            onChange={(e) => setNameFilter(e.target.value)}
            value={nameFilter}
          />
        </div>
        <div className="card-item">
          <label htmlFor="score">Minimum Score</label>
          <input
            className="card-input"
            type="number"
            placeholder="1 - 10"
            min="1"
            max="10"
            onChange={(e) => {
              const value = Number(e.target.value);
              if (value >= 1 && value <= 10) {
                setMinScoreFilter(value);
              }
            }}
            value={minScoreFilter}
          />
        </div>
      </section>
      <section className="card-footer">
        <div className="games-footer-container">
          <label htmlFor="order">Order By</label>
          <section className="order-content">
            <ArrowUpwardIcon className="arrow-up-icon" />
            <CustomDropdown
              options={options}
              selectedValue={order}
              onChange={handleDropdownChange}
            />
          </section>
          <section className="filter-button-container">
            <button className="filter-button" onClick={handleClear}>
              Clear
            </button>
          </section>
        </div>
      </section>
    </div>
  );
}

export default GamesFilter;
