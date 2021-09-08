import React from 'react';

function Categories({items, onClick}) {
  return (
    <div className="categories">
      <ul>
        <li className="active">Все</li>
        {items.map((item) => {
          return <li onClick={() => onClick(item)} key={item}>{item}</li>
        })}
      </ul>
    </div>
  );
}

export default Categories;