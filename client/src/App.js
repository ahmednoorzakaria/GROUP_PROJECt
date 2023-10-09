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
  const [apiData, setApiData] = useState([]); 

  useEffect(() => {
    const apiUrl = "/products"; 

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setApiData(data);
        console.log(data)
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); 
  const handleInputChange = (event) => {
    setQuery(event.target.value);
    console.log(event.target.value)
  };

  const filteredItems = apiData.filter(
    (product) =>
      product.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
    console.log(selectedCategory)
  };

  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  };

  function filteredData(selectedCategory, selectedColor, query) {
    let filteredProducts = apiData;
  
    if (query) {
      filteredProducts = filteredItems;
    }
  
    if (selectedCategory) {
      // Filter by category name
      filteredProducts = filteredProducts.filter(({ category }) => category.name === selectedCategory);
    }
  
    if (selectedColor) {
      filteredProducts = filteredProducts.filter(({ color }) => color === selectedColor);
    }
    
    return filteredProducts.map(
      ({
        img,
        title,
        star,
        reviews,
        prevPrice,
        newPrice,
        category,
        color,
        company,
      }) => (
        <Card
          key={Math.random()}
          img={img}
          title={title}
          star={star}
          reviews={reviews}
          prevPrice={prevPrice}
          newPrice={newPrice}
          color={color}
          company={company}
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

