import React, {useEffect, useState} from "react";
import axios from "axios";
import Header from "./components/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import {Route} from "react-router-dom";

function App() {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/db.json').then(({data}) => {
      setPizzas(data.pizzas);
    })
  }, []);

  return (
    <div className="wrapper">
      <Header />

      <div className="content">
        <Route exact path="/" render={() => <Home items={pizzas} />} />
        <Route exact path="/cart" component={Cart} />
      </div>
    </div>
  );
}

export default App;
