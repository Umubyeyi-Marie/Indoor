"use client";

import Image from "next/image";
import { useState } from "react";
import { LivingRoomProducts } from "../../../data/living-room";

export default function LivingRoom() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const handleAddToCart = (product: (typeof LivingRoomProducts)[number]) => {
    alert(`Added "${product.name}" to cart!`);
  };

  return (
    <div className="bg-white">
      <div className="text-black">
        <div>
          <h1 className="text-3xl font-bold text-center m-15">
            Living Room Products
          </h1>
          <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {LivingRoomProducts.map((product) => (
              <div key={product.id} className="group text-center relative">
                <div
                  className="relative h-89  rounded-xl overflow-hidden shadow-md"
                  onMouseEnter={() => setHoveredId(product.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={300}
                    height={600}
                    className="object-cover transition-transform duration-300 group-hover:scale-105 w-full h-full"
                  />

                  {hoveredId === product.id && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="px-5 py-2 text-sm font-semibold text-white bg-amber-700 rounded-md hover:bg-amber-500 transition"
                      >
                        Add to Cart
                      </button>
                    </div>
                  )}
                </div>

                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  {product.name}
                </h3>
                <p className="text-sm text-amber-800">{product.price}</p>
                <p className="text-sm text-gray-700">{product.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
