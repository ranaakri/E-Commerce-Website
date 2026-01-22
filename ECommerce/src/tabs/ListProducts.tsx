import type { Product } from "../components/ProductCard";
import ProductCard from "../components/ProductCard";
import { NavLink, useOutletContext } from "react-router-dom";

export default function ListProducts() {
    const product: Product[] = useOutletContext();

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
