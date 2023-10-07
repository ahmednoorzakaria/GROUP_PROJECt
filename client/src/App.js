import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./Navigation/Nav";
import Products from "./Products/Products";
import Recommended from "./Recommended/Recommended";
import Sidebar from "./Sidebar/Sidebar";
import Card from "./components/Card";
import "./index.css";
import SignUp from "./components/Signup";

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [query, setQuery] = useState("");
  const [apiData, setApiData] = useState([]); // State to store fetched data

  useEffect(() => {
    // Define the API endpoint URL
    const apiUrl = "/products"; // Your Flask API endpoint for fetching products

    // Make the API request
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Handle the API response and update the state with the data
        setApiData(data);
      })
      .catch((error) => {
        // Handle errors if the API request fails
        console.error("Error fetching data:", error);
      });
  }, []); // The empty dependency array ensures the effect runs once when the component mounts

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const filteredItems = apiData.filter(
    (product) =>
      product.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );

  const handleChange = (event) => {
    console.log(event.target.value);
  };

  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  };

  function filteredData(selected, query) {
    let filteredProducts = apiData;

    if (query) {
      filteredProducts = filteredItems;
    }

    if (selected) {
      filteredProducts = filteredProducts.filter(
        ({ category, color, company, newPrice, title }) =>
          category === selected ||
          color === selected ||
          company === selected ||
          newPrice === selected ||
          title === selected
      );
    }

    return filteredProducts.map(
      ({ img, title, star, reviews, prevPrice, newPrice }) => (
        <Card
          key={Math.random()}
          img={img}
          title={title}
          star={star}
          reviews={reviews}
          prevPrice={prevPrice}
          newPrice={newPrice}
        />
      )
    );
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Sidebar handleChange={handleChange} />
              <Navigation query={query} handleInputChange={handleInputChange} />
              <Recommended handleClick={handleClick} />
              <Products result={filteredData(selectedCategory, query)} />
            </>
          }
        />
        <Route path="/signup" element={<SignUp />} />
        {/* ...other routes */}
      </Routes>
    </Router>
  );
}

export default App;

