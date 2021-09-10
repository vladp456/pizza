import React, {useEffect, useState} from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import {Route} from "react-router-dom";

function App() {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/db.json').then((res) => res.json()).then(json => {
      setPizzas(json.pizzas);
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
