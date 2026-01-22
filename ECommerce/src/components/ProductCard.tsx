
export interface Product{
    id: string;
    description: string;
    title: string;
    category: string;
    price: number;
    discountPercentage:number;
    stock:number;
    images: string[];
}

interface Props {
  item: Product;
}

export default function ProductCard({ item }: Props) {

  return (
    <div
      className={`max-w-2xl border rounded-md shadow-md "bg-black text-white bg-black border-black" `}
    >
      <div className="flex items-center justify-center bg-white rounded-md">
        <img src={item.images[0]} className="w-48 h-48 object-cover" />
      </div>
      <div className="p-4 rounded-md h-fit">
        <h2 className={`font-semibold`}>{item.title}</h2>
        <br />
        <hr />
        <p>Description: {item.description}</p>
        <hr />
        <br />
        <div className="grid grid-cols-2">
          <p>&#8377;{item.price*84}</p>
          {(item.price*84) > 500 && (
            <p className="bg-yellow-300 text-black border rounded-full text-center">
              Expencive
            </p>
          )}
        </div>
        <p>Catagory: {item.category}</p>
        <div className="grid grid-cols-2">
          <p>Quentity: {item.stock}</p>
          {item.stock <= 5 && (
            <p className="bg-yellow-300 text-black border rounded-full text-center">
              Limited
            </p>
          )}
        </div>
      </div>
    </div>
  );
}