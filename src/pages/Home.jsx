import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import Categories from "../components/Categories";
import SortPopup from "../components/SortPopup";
import PizzaBlock from "../components/PizzaBlock";
import {setCategory, setSortBy} from "../redux/actions/filters";
import {fetchPizzas} from "../redux/actions/pizzas";
import LoadingBlock from "../components/PizzaBlock/LoadingBlock";

const categoryNames = ['Meat', 'Vegan', 'Grill', 'Spicy', 'Calzone'];
const sortItems = [
  {name: 'popular', type: 'popular', order: 'desc'},
  {name: 'price', type: 'price', order: 'desc'},
  {name: 'alphabet', type: 'name', order: 'asc'}
];

function Home() {
  const dispatch = useDispatch();
  const items = useSelector(({pizzas}) => pizzas.items);
  const cartItems = useSelector(({cart}) => cart.items);
  const isLoaded = useSelector(({pizzas}) => pizzas.isLoaded);
  const {category, sortBy} = useSelector(({filters}) => filters);

  const onSelectCategory = useCallback((index) => {
    dispatch(setCategory(index));
  }, []);

  const onSelectSortType = useCallback((type) => {
    dispatch(setSortBy(type));
  }, []);

  const handleAddPizzaToCart = (obj) => {
    dispatch({
      type: 'ADD_PIZZA_CART',
      payload: obj
    });
  }

  useEffect(() => {
      dispatch(fetchPizzas(sortBy, category));
  }, [category, sortBy]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          onClickCategory={onSelectCategory}
          items={categoryNames}
          activeCategory={category}
        />

        <SortPopup
          activeSortType={sortBy.type}
          items={sortItems}
          onClickSortType={onSelectSortType}
        />
      </div>

      <h2 className="content__title">All pizzas</h2>

      <div className="content__items">
        {isLoaded
          ? items.map(obj =>
              <PizzaBlock
                id={obj.id}
                name={obj.name}
                price={obj.price}
                imageUrl={obj.imageUrl}
                types={obj.types}
                sizes={obj.sizes}
                key={obj.id}
                onClickAddPizza={handleAddPizzaToCart}
                addedCount={cartItems[obj.id] && cartItems[obj.id].items.length}
              />)
          : Array(12)
            .fill(0)
            .map((_, index) => <LoadingBlock key={index} />)}
      </div>
    </div>
  );
}

export default Home;