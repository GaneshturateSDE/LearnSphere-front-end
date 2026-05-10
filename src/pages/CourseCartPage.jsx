import React, { useState } from "react";
import { FaTrash, FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../store/cart/cartSlice";
import { paymentService } from "../services/payment.service";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CourseCartPage = () => {
const dispatch=useDispatch();
const {items,totalAmount,totalItems}=useSelector(state=>state.cart);
  const [cart, setCart] = useState(items);
const navigation=useNavigate();
  console.log("Cart items from Redux:", cart);
  // Remove course
  const removeCart = (id) => {
    removeFromCart(id)
  };
  const {user}= useAuth();

const [payload,setPayload]=useState({
    amount:totalAmount,
    currency:"INR",
    courseId:cart.map(item=>item.id),
    userId:user?.id || undefined,
  });

  // Total
 

  const handlePurchase = async() => {
         if(user==null) 
          toast.error("Please login to proceed with the purchase");
          return navigation("/login");
      const data=await paymentService.createPayment(payload);
  };

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="max-w-6xl mx-auto px-4 py-10">

        {/* Title */}
        <h1 className="text-3xl font-bold text-blue-700 mb-8 flex items-center gap-3">
          <FaShoppingCart />
          My Cart
        </h1>

        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty</p>
        ) : (

          <div className="grid md:grid-cols-3 gap-8">

            {/* LEFT: CART ITEMS */}
            <div className="md:col-span-2 space-y-6">

              {cart.map(item => (
                <div
                  key={item.id}
                  className="
                    bg-white rounded-xl shadow
                    flex flex-col sm:flex-row
                    overflow-hidden
                  "
                >

                  {/* Image */}
                  <img
                    src={item.thumbnailUrl}
                    alt={item.title}
                    className="w-full sm:w-40 h-40 object-cover"
                  />

                  {/* Details */}
                  <div className="flex-1 p-4 flex flex-col justify-between">

                    <div>
                      <h2 className="font-semibold text-lg">
                        {item.title}
                      </h2>
                    </div>
                    <div>
                        <h3>{item.description}</h3>
                    </div>

                    <div className="flex items-center justify-between mt-4">

                      <span className="text-blue-700 font-bold">
                        ₹{item.price}
                      </span>

                      <button
                        onClick={() => removeCart(item.id)}
                        className="
                          text-red-500 hover:text-red-700
                          flex items-center gap-2
                        "
                      >
                        <FaTrash />
                        Remove
                      </button>

                    </div>

                  </div>

                </div>
              ))}

            </div>

            {/* RIGHT: SUMMARY */}
            <div>

              <div className="
                bg-white rounded-xl shadow p-6 sticky top-10
              ">

                <h2 className="text-xl font-bold mb-4">
                  Cart Summary
                </h2>

                <div className="flex justify-between mb-3">
                  <span>Total Items</span>
                  <span>{cart.length}</span>
                </div>

                <div className="flex justify-between text-lg font-bold mb-6">
                  <span>Total Amount</span>
                  <span className="text-blue-700">
                    ₹{totalAmount}
                  </span>
                </div>

                <button
                  onClick={handlePurchase}
                  className="
                    w-full bg-blue-700 text-white
                    py-3 rounded-lg
                    hover:bg-blue-800 transition
                  "
                >
                  Proceed to Purchase
                </button>

              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
};

export default CourseCartPage;