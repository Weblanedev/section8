"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { Product } from "@/types";
import { productsData } from "@/data/products";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");

  useEffect(() => {
    const foundProduct = productsData.find((p) => p.id === params.id);
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedColor(foundProduct.availableColors[0]);
      if (
        foundProduct.availableSizes &&
        foundProduct.availableSizes.length > 0
      ) {
        setSelectedSize(foundProduct.availableSizes[0]);
      }
    }
  }, [params.id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-white py-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Product Not Found
          </h1>
          <button
            onClick={() => router.push("/products")}
            className="bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    const productToAdd = {
      ...product,
      selectedColor: selectedColor || product.color,
      selectedSize: selectedSize || product.spec,
    };
    addToCart(productToAdd);
    // Redirect to checkout page after adding to cart
    setTimeout(() => {
      router.push("/checkout");
    }, 500); // Small delay to show the toast notification
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => router.back()}
          className="mb-8 text-primary hover:text-accent transition-all duration-300 hover:scale-105 flex items-center animate-slideInLeft"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative animate-slideInLeft">
            <div className="relative h-[600px] rounded-lg overflow-hidden bg-secondary shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="animate-slideInRight">
            <h1 className="text-4xl font-bold text-primary mb-4">
              {product.name}
            </h1>
            <p className="text-2xl font-bold text-accent mb-6">
              ₦{product.price.toLocaleString("en-NG")}
            </p>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-primary mb-4">
                Description
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {product.detailedDescription || product.description}
              </p>
            </div>

            {/* Color Selection */}
            {product.availableColors && product.availableColors.length > 1 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-primary mb-3">
                  Color: <span className="font-normal">{selectedColor}</span>
                </h3>
                <div className="flex flex-wrap gap-3">
                  {product.availableColors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-6 py-2 rounded-lg border-2 transition-all duration-300 hover:scale-110 active:scale-95 ${
                        selectedColor === color
                          ? "border-accent bg-accent text-white shadow-lg scale-105"
                          : "border-gray-300 bg-white text-primary hover:border-accent"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.availableSizes && product.availableSizes.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-primary mb-3">
                  Size: <span className="font-normal">{selectedSize}</span>
                </h3>
                <div className="flex flex-wrap gap-3">
                  {product.availableSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-2 rounded-lg border-2 transition-all duration-300 hover:scale-110 active:scale-95 ${
                        selectedSize === size
                          ? "border-accent bg-accent text-white shadow-lg scale-105"
                          : "border-gray-300 bg-white text-primary hover:border-accent"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Spec */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-primary mb-2">
                Specification
              </h3>
              <p className="text-gray-700">{product.spec}</p>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-accent text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-opacity-90 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
