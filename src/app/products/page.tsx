import React from "react";
import ProductCard from "../components/product_cards";
import { getProducts } from "../../../sanity/sanity-utils";
import BackgroundSlider from "../components/slider";

export default async function Page({ params }: { params: { slug: string } }) {
  const projects = await getProducts();

  return (
    <div className="bg-orange-100 font-serif">
      <title>Our Products</title>
      <div
        style={{ position: "relative", width: "100%", height: "350px" }}
        className="bg-brown"
      >
        <BackgroundSlider
          bg1="/pro1.jpg"
          bg2="/pro2.jpg"
          bg3="/pro3.jpg"
          bg4="/pro4.jpg"
        />
        <div
          style={{ position: "relative", zIndex: 1 }}
          className="lg:py-20 xl:py-32 md:py-16 px-4 flex flex-col space-y-2 lg:space-y-3 text-orange-100 xl:space-y-3 md:space-y-3 items-center justify-center"
        >
          <h1 className="font-extrabold lg:text-7xl xl:text-6xl md:text-7xl text-4xl text-center text-orange-50">
            Taste the Magic
          </h1>
          <p className="md:mx-44 lg:mx-72 xl:mx-96 mx-4 text-center text-lg text-orange-50">
            Journey through Our Mouthwatering Baked Offerings
          </p>
        </div>
      </div>
      <div>
        <div className="mrgn py-20 grid lg:grid-cols-4 md:grid-cols-2 xl:grid-cols-4 grid-cols-1 gap-5">
          {projects.map((project) => (
            <ProductCard
              key={project.name}
              name={project.name}
              image={project.image}
              rating={project.rating}
              inStock={project.avaliability}
              price={project.price}
              productid={project._id}
              btn={`/products/productDetail/${project._id}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}