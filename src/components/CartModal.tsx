 "use client";
 "use client";
import { useCartStore } from "@/hooks/useCartStore";
import Image from "next/image";
import { media as wixMedia } from "@wix/sdk";
import { useWixClient } from "@/hooks/useWixclient";
import Link from "next/link";
import { currentCart } from "@wix/ecom";

const CartModal = () => {
  const wixClient = useWixClient();
  const { cart, isLoading, removeItem } = useCartStore();

  const handleCheckout = async () => {
    try {
      const checkout =
        await wixClient.currentCart.createCheckoutFromCurrentCart({
          channelType: currentCart.ChannelType.WEB,
        });
      const { redirectSession } =
        await wixClient.redirects.createRedirectSession({
          ecomCheckout: { checkoutId: checkout.checkoutId },
          callbacks: {
            postFlowUrl: window.location.origin,
            thankYouPageUrl: `${window.location.origin}/success`,
          },
        });
      if (redirectSession?.fullUrl) {
        window.location.href = redirectSession.fullUrl;
      }
    } catch (error) {
      console.error(error);
    }
  };
  // @ts-ignore
  const subtotal = parseFloat(cart.subtotal?.amount ?? '0'); // Convert to number

  function formatINR(x: number): string {
    return x.toLocaleString("en-IN");
  }

  return (
    <div className="w-max absolute p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white top-12 right-0 flex flex-col gap-6 z-20">
      {!cart.lineItems ? (
        <div>Cart is Empty</div>
      ) : (
        <>
          <h2>Shopping Cart</h2>
          <div className="flex flex-col gap-8">
            {cart.lineItems.map((item) => (
              <div key={item._id} className="flex gap-4">
                {item.image && (
                  <Link href={`/product/${item.url}`}>
                    <Image
                      src={wixMedia.getScaledToFillImageUrl(
                        item.image,
                        72,
                        96,
                        {}
                      )}
                      alt=""
                      width={72}
                      height={96}
                      className="object-cover rounded-md"
                    />
                  </Link>
                )}
                <div className="flex flex-col justify-between w-full text-xs">
                  <div className="">
                    <div className="flex items-center justify-between gap-8">
                      <h3 className="font-semibold w-36">
                        {item.productName?.original?.slice(0, 20)}
                      </h3>
                      <div className="p-1 bg-gray-50 rounded-sm flex items-center gap-2">
                        {item.quantity && item.quantity > 1 && (
                          <div className=" text-green-500">
                            {item.quantity} x
                          </div>
                        )}
                        ₹{formatINR(parseFloat(item.price?.amount ?? '0'))
                        }
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      {item.availability?.status}
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">
                        Qty. {item.quantity}
                      </span>
                      <span
                        className="text-blue-500"
                        style={{
                          cursor: isLoading ? "not-allowed" : "pointer",
                        }}
                        onClick={() => removeItem(wixClient, item._id!)}
                      >
                        Remove
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div>
            <div className="flex items-center justify-between font-semibold">
              <span>Subtotal</span>
              <span>₹{formatINR(subtotal)}</span>
            </div>
            <p className="text-gray-500 text-sm mt-2 mb-4">
              taxes and shipping calculated at checkout
            </p>
            <div className="flex justify-between text-sm">
              <button className="rounded-md py-3 px-4 ring-1 ring-green-300">
                View Cart
              </button>
              <button
                onClick={handleCheckout}
                disabled={isLoading}
                className="disabled:opacity-75 disabled:cursor-not-allowed rounded-md py-3 px-4 bg-black text-white"
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartModal;

// import { useCartStore } from "@/hooks/useCartStore";
// import Image from "next/image";
// import { media as wixMedia } from "@wix/sdk";
// import { useWixClient } from "@/hooks/useWixclient";
// import Link from "next/link";
// import { currentCart } from "@wix/ecom"; 

// const CartModal = () => {
//   const wixClient = useWixClient();
//   const { cart, isLoading, removeItem } = useCartStore();

//   const handleCheckout = async () => {
//     try {
//       const checkout =
//         await wixClient.currentCart.createCheckoutFromCurrentCart({
//           channelType: currentCart.ChannelType.WEB,
//         });
//       const { redirectSession } =
//         await wixClient.redirects.createRedirectSession({
//           ecomCheckout: { checkoutId: checkout.checkoutId },
//           callbacks: {
//             postFlowUrl: window.location.origin,
//             thankYouPageUrl: `${window.location.origin}/success`,
//           },
//         });
//       if (redirectSession?.fullUrl) {
//         window.location.href = redirectSession.fullUrl;
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   //@ts-ignore
//  const subtotal = cart.subtotal?.amount;
//  function formatINR(x: number): string {
//   return x.toLocaleString("en-IN");
// }


//   return (
//     <div className="w-max absolute p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white top-12 right-0 flex flex-col gap-6 z-20">
//       {!cart.lineItems ? (
//         <div>Cart is Empty</div>
//       ) : (
//         <>
//           <h2>Shopping Cart</h2>
//           <div className="flex flex-col gap-8">
//             {cart.lineItems.map((item) => (
//               <div key={item._id} className="flex gap-4">
//                 {item.image && (
//                   <Link href={`/product/${item.url}`}>
//                     <Image
//                       src={wixMedia.getScaledToFillImageUrl(
//                         item.image,
//                         72,
//                         96,
//                         {}
//                       )}
//                       alt=""
//                       width={72}
//                       height={96}
//                       className="object-cover rounded-md"
//                     />
//                   </Link>
//                 )}
//                 <div className="flex flex-col justify-between w-full text-xs">
//                   <div className="">
//                     <div className="flex items-center justify-between gap-8">
//                       <h3 className="font-semibold w-36">
//                         {item.productName?.original?.slice(0, 20)}
//                       </h3>
//                       <div className="p-1 bg-gray-50 rounded-sm flex items-center gap-2">
//                         {item.quantity && item.quantity > 1 && (
//                           <div className=" text-green-500">
//                             {item.quantity} x
//                           </div>
//                         )}
//                         ₹{formatINR(item.price?.amount ?? 0)}
//                       </div>
//                     </div>
//                     <div className="text-xs text-gray-500">
//                       {item.availability?.status}
//                     </div>
//                   </div>
//                   <div>
//                     <div className="flex justify-between text-xs">
//                       <span className="text-gray-500">
//                         Qty. {item.quantity}
//                       </span>
//                       <span
//                         className="text-blue-500"
//                         style={{
//                           cursor: isLoading ? "not-allowed" : "pointer",
//                         }}
//                         onClick={() => removeItem(wixClient, item._id!)}
//                       >
//                         Remove
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div>
//             <div className="flex items-center justify-between font-semibold">
//               <span>Subtotal</span>
//               <span>₹{formatINR(subtotal ?? 0)}</span>
//             </div>
//             <p className="text-gray-500 text-sm mt-2 mb-4">
//               taxes and shipping calculated at checkout
//             </p>
//             <div className="flex justify-between text-sm">
//               <button className="rounded-md py-3 px-4 ring-1 ring-green-300">
//                 View Cart
//               </button>
//               <button
//                 onClick={handleCheckout}
//                 disabled={isLoading}
//                 className="disabled:opacity-75 disabled:cursor-not-allowed rounded-md py-3 px-4 bg-black text-white"
//               >
//                 Checkout
//               </button>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default CartModal;


// "use clinent";
// import { useCartStore } from "@/hooks/useCartStore";
// import Image from "next/image";
// import { media as wixMedia } from "@wix/sdk";
// import { useWixClient } from "@/hooks/useWixclient";
// import Link from "next/link";
// import { currentCart } from "@wix/ecom";
// const CartModal = () => {
//   const wixClient = useWixClient();
//   const { cart, isLoading, removeItem } = useCartStore();

//   const handleCheckout = async () => {
//     try {
//       const checkout =
//         await wixClient.currentCart.createCheckoutFromCurrentCart({
//           channelType: currentCart.ChannelType.WEB,
//         });
//       const { redirectSession } =
//         await wixClient.redirects.createRedirectSession({
//           ecomCheckout: { checkoutId: checkout.checkoutId },
//           callbacks: {
//             postFlowUrl: window.location.origin,
//             thankYouPageUrl: `${window.location.origin}/success`,
//           },
//         });
//         if(redirectSession?.fullUrl){
//           window.location.href = redirectSession.fullUrl
//         }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="w-max absolute p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white top-12 right-0 flex flex-col gap-6 z-20">
//       {!cart.lineItems ? (
//         <div className="">Cart is Empty</div>
//       ) : (
//         <>
//           <h2>Shopping Cart</h2>
//           <div className="flex flex-col gap-8">
//             {cart.lineItems.map((item) => (
//               <div key={item._id} className="flex gap-4">
//                 {item.image && (
//                   <Link href={`/product/${item.url}`}>
//                     <Image
//                       src={wixMedia.getScaledToFillImageUrl(
//                         item.image,
//                         72,
//                         96,
//                         {}
//                       )}
//                       alt=""
//                       width={72}
//                       height={96}
//                       className="object-cover rounded-md"
//                     />
//                   </Link>
//                 )}
//                 <div className="flex flex-col justify-between w-full">
//                   {/* top */}
//                   <div>
//                     {/* titel */}
//                     <div className="flex  items-center justify-between gap-8">
//                       <h3 className="font-semibold">
//                         {item.productName?.original}
//                       </h3>
//                       <div className="p-1 bg-gray-50 rounded-sm flex items-center gap-2">
//                         {item.quantity && item.quantity > 1 && (
//                           <div className="text-xs text-green-500">
//                             {item.quantity} x
//                           </div>
//                         )}
//                         ${item.price?.amount}
//                       </div>
//                     </div>
//                     {/* desc */}
//                     <div className=" text-sm text-gray-500">
//                       {item.availability?.status}
//                     </div>
//                   </div>
//                   <div>
//                     {/* button */}
//                     <div className=" flex justify-between text-sm">
//                       <span className="text-gray-500">
//                         Qty. {item.quantity}
//                       </span>
//                       <span
//                         className="text-blue-500"
//                         style={{
//                           cursor: isLoading ? "not-allowed" : "pointer",
//                         }}
//                         onClick={() => removeItem(wixClient, item._id!)}
//                       >
//                         Remove
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="">
//             <div className="flex items-center justify-between font-semibold">
//               <span className="">Subtotal</span>
//               <span className="">${cart.subtotal.amount}</span>
//             </div>
//             <p className="text-gray-500 text-sm mt-2 mb-4">
//               taxes and shipping calculated at checkout
//             </p>
//             <div className="flex justify-between text-sm">
//               <button className="rounded-md py-3 px-4 ring-1 ring-green-300">
//                 View Cart
//               </button>
//               <button
//               onClick={handleCheckout}
//                 disabled={isLoading}
//                 className="disabled:opacity-75 disabled:cursor-not-allowed rounded-md py-3 px-4 bg-black text-white"
//               >
//                 Checkout
//               </button>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default CartModal;
