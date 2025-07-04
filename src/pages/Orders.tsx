import axios from "axios";
import { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../admin_assets/assets";
import { type Order, type OrderItem } from "../Types/Orders";


type Props = {
  token: string|null;
};
const Orders = ({token}:Props) => {
  const [orders,setOrders]=useState<Order[]>([])

  const fetchAllOrders=async()=>{
if (!token) {
  return null
  
}
try {
  const response=await axios.post(`${backendUrl}/api/order/list`,{},{headers:{token}})
     if(response.data.success){
      console.log(response.data)
      setOrders(response.data.orders.reverse())
     }else{
      toast.error(response.data.message)
     }
  
} catch (error) {
  console.log(error);
       if (error instanceof Error) toast.error(error.message);

  
}
  }

  const statusHandler=async(event:any,orderId:string)=>{
    try {
      const response=await axios.post(`${backendUrl}/api/order/status`,{orderId,status:event.target.value},{headers:{token}})
      if (response.data.success) {
        await fetchAllOrders()
      }
    } catch (error) {
       console.log(error);
       if (error instanceof Error) toast.error(error.message);

    }
  }

useEffect(()=>{
fetchAllOrders()
console.log(orders)
},[token])
  
  return (
    <div>
    <h3>Order Page</h3>
    <div>
      
      {orders.map((order, index) => (
  <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border border-gray-200 p-5 md:p-8 py-3 text-xs sm:text-sm text-gray-700' key={index}>
    <img className="w-12" src={assets.parcel_icon} alt="" />
    <div>
    <div>
      {
      order.items.map((item:OrderItem, index:number) => {
        if (index === order.items.length-1) {
          return <p className="py-0.5" key={index}>{item.name} x {item.quantity} <span>{item.size}</span></p>;
        } else {
          return <p className="py-0.5" key={index}>{item.name} x {item.quantity} <span>{item.size}</span>,</p>;
          
        }
      })}
    </div>
    <p className="mt-1 mb-2 font-medium">{`${order.address.firstName}${order.address.lastName}`}</p>
    <div>
      <p>{`${order.address.street},`}</p>
      <p>{`${order.address.city}, ${order.address.state}, ${order.address.country}, ${order.address.zipcode}`}</p>

    </div>
    <p>{order.address.phone} </p>
  </div>
  <div>
  <p className="text-sm sm:text-[15px]">Items : {order.items.length}</p>
<p className="mt-3">Method : {order.paymentMethod}</p>
<p>Payment : {order.payment ? 'Done' : 'Pending'}</p>
<p>Date : {new Date(order.date).toLocaleDateString()}</p>

  </div>
  <p className="text-sm sm:text-[15px]">{currency}{order.amount}</p>
<select onChange={(event)=>statusHandler(event,order._id)} value={order.status} className="p-2 font-semibold">
  <option value="Order Placed">Order Placed</option>
  <option value="Packing">Packing</option>
  <option value="Shipped">Shipped</option>
  <option value="Out for delivery">Out for delivery</option>
  <option value="Delivered">Delivered</option>
</select>

  </div>
))}
    </div>
    </div>
  )
}
export default Orders
