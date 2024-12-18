"use client";
import { useCart } from "./CartProvider";
import Cta from "./common/Cta";
import Icons from "./icons/Icons";
import { CONTENT_ONE_LIST } from "./utils/Helper"; // Import CONTENT_ONE_LIST

const CartPage = () => {
  const { cart, updateCartItem, totalItems } = useCart();

  const MAX_ITEMS = 6; // Maximum number of items allowed in the cart

  // Check if the item is in CONTENT_ONE_LIST
  const isItemInContentOneList = (tittle: string) =>
    CONTENT_ONE_LIST.some((item) => item.tittle === tittle);

  // Handle increment of item count
  const incrementItem = (tittle: string) => {
    const item = cart.find((cartItem) => cartItem.tittle === tittle);
    if (item) {
      const maxCount = isItemInContentOneList(tittle) ? 2 : Infinity;
      if (totalItems < MAX_ITEMS) {
        updateCartItem(tittle, Math.min(item.count + 1, maxCount));
      } else {
        alert("Cannot add more items. Maximum limit reached."); // Show error message
      }
    }
  };

  // Handle decrement of item count
  const decrementItem = (tittle: string) => {
    const item = cart.find((cartItem) => cartItem.tittle === tittle);
    if (item && item.count > 1) {
      updateCartItem(tittle, item.count - 1);
    }
  };

  // Clear all items from the cart
  const removeItem = (tittle: string) => {
    updateCartItem(tittle, 0);
  };

  return (
    <div className="container max-w-[1172px] px-4">
      <h2 className="text-center text-3xl font-semibold py-6">Today&apos;s Order</h2>
      <h2 className="text-3xl font-semibold">All Products</h2>
      <div className="pt-4">
        {cart.length === 0 ? (
          <p className="text-center text-lg">No items in the cart.</p>
        ) : (
          cart.map((item, index) => (
            <div
              key={item.tittle || index}
              className="flex justify-between items-center border-b border-gray-300 py-2"
            >
              <div>
                <h3 className="text-xl font-medium">{item.tittle}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
              <div className="flex justify-center items-center gap-3">
                <Cta
                  onClick={() => decrementItem(item.tittle)}
                  className="!p-2 w-8 h-8 bg-red-500 border-red-500 flex justify-center items-center group"
                  disabled={item.count <= 1}
                >
                  <Icons
                    icon="minus"
                    pathClass="group-hover:fill-red-500 common-transition"
                  />
                </Cta>
                <span className="text-base text-center font-medium w-5">
                  {item.count}
                </span>
                <Cta
                  onClick={() => incrementItem(item.tittle)}
                  className="!p-2 w-8 h-8 bg-green-500 border-green-500 group flex justify-center items-center"
                  disabled={
                    isItemInContentOneList(item.tittle) && item.count >= 2 || 
                    totalItems >= MAX_ITEMS
                  }
                >
                  <Icons
                    icon="plus"
                    pathClass="group-hover:fill-green-500 common-transition"
                  />
                </Cta>
                <Cta
                  onClick={() => removeItem(item.tittle)}
                  className="bg-white group hover:border-red-500 !p-1 w-8 h-8 flex items-center justify-center"
                >
                  <Icons
                    icon="deleteIcon"
                    className="w-6 h-6"
                    pathClass="group-hover:fill-red-500 common-transition"
                  />
                </Cta>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="relative flex items-center justify-end pt-4">
        {totalItems > 0 && (
          <span className="text-base text-black pe-[92px]">
            Total items: {totalItems}
          </span>
        )}
      </div>
    </div>
  );
};

export default CartPage;
