import React, {memo} from 'react';
import PropTypes from "prop-types";

const Categories = memo(function Categories({activeCategory, items, onClickCategory}) {
  return (
    <div className="categories">
      <ul>
        <li className={activeCategory === null ? 'active' : ''}
            onClick={() => onClickCategory(null)}
        >All</li>

        {items && items.map((item, index) => (
          <li className={activeCategory === index ? 'active' : ''}
              onClick={() => onClickCategory(index)}
              key={item}
          >{item}</li>
        ))}
      </ul>
    </div>
  );
});

Categories.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClickCategory: PropTypes.func.isRequired
};

Categories.defaultProps = {activeCategory: null, items: []};

export default Categories;