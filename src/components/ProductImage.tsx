"use client";

import { Product } from "@/type";
import Image from "next/image";
import { useEffect, useState } from "react";

const ProductImage = ({ product }: { product: Product }) => {
  const [imgUrl, setImgUrl] = useState("");

  // Debug logs
  useEffect(() => {
    console.log('=== ProductImage Debug ===');
    console.log('product:', product);
    console.log('product?.images:', product?.images);
    console.log('typeof product?.images:', typeof product?.images);
    console.log('Array.isArray(product?.images):', Array.isArray(product?.images));
    console.log('product?.images?.length:', product?.images?.length);
    console.log('=== End Debug ===');

    if (product && product?.images && product.images.length > 0) {
      console.log('Setting imgUrl to:', product.images[0]);
      setImgUrl(product.images[0]); // ✅ Set to first image (string), not the array
    } else {
      console.log('No images available - conditions failed');
    }
  }, [product]);

  if (!product || !product?.images || product.images.length === 0) {
    return (
      <div className="flex flex-start">
        <div className="bg-gray-100 rounded-md w-full max-h-[550px] flex items-center justify-center">
          <div className="text-gray-500 text-center">
            <p>No product images available</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-start">
      <div>
        {product.images.map((item, index) => (
          <Image
            src={item}
            alt="productImage"
            width={200}
            height={200}
            priority
            key={index}
            className={"w-24 h-24 object-contain cursor-pointer opacity-80 hover:opacity-100 duration-300 border border-gray-200 mb-1 " +
            (imgUrl === item ? "border-gray-500 rounded-sm opacity-100" : "")}
            onClick={() => setImgUrl(item)}
          />
        ))}
      </div>
      <div className="bg-gray-100 rounded-md ml-5 w-full max-h-[550px]">
        {imgUrl && (
          <Image
            src={imgUrl}
            alt="mainImage"
            width={500}
            height={500}
            priority
            className="w-full h-full object-contain"
          />
        )}
      </div>
    </div>
  );
};

export default ProductImage;
