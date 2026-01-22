import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../ApiCalls/apiCalls";
import { useMemo, } from "react";
import type { Product } from "../components/ProductCard";
import ProductCard from "../components/ProductCard";
import { NavLink } from "react-router-dom";

export default function ListProducts() {

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["fetchingProducts"],
    queryFn: fetchProducts,
  });

  const product = useMemo<Product[]>(() => data?.products ? data.products : [], [data])

  if (isError) return <div className="flex justify-center">Error: {error.message}</div>;
  if (isLoading) return <div className="flex justify-center">Loading...</div>;
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {
        product?.map((item) => (
            <NavLink to={""+item.id} key={item.id}>
                <ProductCard item={item}/>
            </NavLink>
        ))
      }
    </div>
  );
}
