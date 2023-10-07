import "./Category.css";
import Input from "../../components/Input";

function Category({ handleChange }) {
  return (
    <div>
      <h2 className="sidebar-title">Category</h2>

      <div>
        <label className="sidebar-label-container">
          <input onChange={handleChange} type="radio" value="" name="test" />
          <span className="checkmark"></span>All
        </label>
        <Input
          handleChange={handleChange}
          value="shirts"
          title="shirts"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="trousers"
          title="trousers"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="dresses"
          title="dresses"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="tops"
          title="tops"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="underwear"
          title="underwear"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="shoes"
          title="shoes"
          name="test"
        />
      </div>
    </div>
  );
}

export default Category;