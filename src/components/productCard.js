import React from 'react';

const ProductCard = ({ name, price, image }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 bg-white">
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <div className="px-6 py-4">
        <h2 className="font-bold text-xl">{name}</h2>
        <p className="text-gray-700">Price: ${price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductCard;
