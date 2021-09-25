import React, {useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";

import Categories from "../components/Categories";
import SortPopup from "../components/SortPopup";
import PizzaBlock from "../components/PizzaBlock";
import {setCategory} from "../redux/actions/filters";

const categoryNames = ['Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
const sortItems = [
  {name: 'популярности', type: 'popular'},
  {name: 'цене', type: 'price'},
  {name: 'алфавиту', type: 'alphabet'}
];

function Home() {
  const dispatch = useDispatch();
  const items = useSelector(({pizzas}) => pizzas.items);

  const onSelectCategory = useCallback((index) => {
    dispatch(setCategory(index));
  }, []);

  return (
    <div className="container">
      <div className="content__top">
        <Categories onClickItem={onSelectCategory} items={categoryNames} />

        <SortPopup items={sortItems} />
      </div>

      <h2 className="content__title">Все пиццы</h2>

      <div className="content__items">
        {items && items.map(obj =>
          <PizzaBlock
            name={obj.name}
            price={obj.price}
            imageUrl={obj.imageUrl}
            types={obj.types}
            sizes={obj.sizes}
            key={obj.id}
          />)}
      </div>
    </div>
  );
}

export default Home;