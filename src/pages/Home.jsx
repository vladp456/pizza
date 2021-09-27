import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import Categories from "../components/Categories";
import SortPopup from "../components/SortPopup";
import PizzaBlock from "../components/PizzaBlock";
import {setCategory, setSortBy} from "../redux/actions/filters";
import {fetchPizzas} from "../redux/actions/pizzas";
import LoadingBlock from "../components/PizzaBlock/LoadingBlock";

const categoryNames = ['Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
const sortItems = [
  {name: 'популярности', type: 'popular', order: 'desc'},
  {name: 'цене', type: 'price', order: 'desc'},
  {name: 'алфавиту', type: 'name', order: 'asc'}
];

function Home() {
  const dispatch = useDispatch();
  const items = useSelector(({pizzas}) => pizzas.items);
  const isLoaded = useSelector(({pizzas}) => pizzas.isLoaded);
  const {category, sortBy} = useSelector(({filters}) => filters);

  const onSelectCategory = useCallback((index) => {
    dispatch(setCategory(index));
  }, []);

  const onSelectSortType = useCallback((type) => {
    dispatch(setSortBy(type));
  }, []);

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

      <h2 className="content__title">Все пиццы</h2>

      <div className="content__items">
        {isLoaded
          ? items.map(obj =>
              <PizzaBlock
                name={obj.name}
                price={obj.price}
                imageUrl={obj.imageUrl}
                types={obj.types}
                sizes={obj.sizes}
                key={obj.id}
                isLoading={true}
              />)
          : Array(12)
            .fill(0)
            .map((_, index) => <LoadingBlock key={index} />)}
      </div>
    </div>
  );
}

export default Home;