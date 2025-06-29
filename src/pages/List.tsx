import axios from "axios";
import { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

type Product = {
  _id: string;
  images: string[];
  name: string;
  category: string;
  price: number;
};

type Props = {
  token: string | null;
};

const List = ({ token }: Props) => {
  const [list, setList] = useState<Product[]>([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      if (error instanceof Error) toast.error(error.message);
    }
  };

  const removeProduct = async (id: string) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/product/remove`,
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        console.log(response.data);
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      if (error instanceof Error) toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);
  return (
    <>
      <p className="mb-2">All Products List</p>
      <div className="flex flex-col gap-2">
        {/* List Table Title */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>
        {/* ---------Product List --------- */}
        {list.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[60px_1fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-2 px-4 border text-sm"
          >
            <img
              src={item.images?.[0]}
              alt={item.name}
              className="h-10 w-12 object-cover rounded"
            />
            <p>{item.name}</p>
            <p>{item.category}</p>

            <p>
              {currency}
              {item.price}
            </p>
            <p
              onClick={() => removeProduct(item._id)}
              className="text-right md:text-center cursor-pointer text-red-600 hover:scale-110 transition-transform duration-150 text-base font-bold"
            >
              X
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
