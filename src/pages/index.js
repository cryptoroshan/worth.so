import { useState, useEffect } from "react"
import { useRouter } from 'next/router'
import { toast } from "react-toastify"

// import { useProduct } from "@/hooks/use-product";

export default function Home() {
  // const router = useRouter();
  // const { reload, confirmReload } = useProduct();

  // const [productData, setProductData] = useState(null);

  // useEffect(() => {
  //   getProduct();
  // }, [])

  // useEffect(() => {
  //   if (reload === true)
  //     reLoad();
  // }, [reload])

  // const reLoad = async () => {
  //   getProduct();
  //   await confirmReload();
  // }

  // const getProduct = async () => {
  //   try {
  //     const response = await fetch('/api/product/get_product', {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       }
  //     });
  //     const res = await response.json();

  //     if (res.status === true)
  //       setProductData(res.data);
  //     else
  //       toast.error("error!");
  //   } catch (err) {
  //     toast.error(err);
  //   }
  // }

  // return (
  //   <main
  //     className="min-h-screen flex flex-col px-2 md:px-[33px] mx-auto"
  //   >
  //     <div className="mt-20 mx-auto">
  //       {productData?.length === 0 && (
  //         <p className="text-xl text-center">No product</p>
  //       )}
  //       <div className="grid grid-cols-4 gap-4 mx-auto">
  //         {productData !== null && (
  //           productData.map((item, index) => {
  //             return (
  //               <div key={index} className="relative hover:opacity-50 cursor-pointer" onClick={() => router.push(`/product/${item._id}`)}>
  //                 <img src={item.image_list[1]}
  //                   alt={item.app_name}
  //                 />
  //                 <div className="mt-4 flex justify-between">
  //                   <div>
  //                     <h3 className="text-sm text-gray-700">
  //                       <a href="#">
  //                         {item.app_name}
  //                       </a>
  //                     </h3>
  //                   </div>
  //                   <p className="text-sm font-medium text-gray-900">${item.app_now_price}</p>
  //                 </div>
  //               </div>
  //             )
  //           })
  //         )}
  //       </div>
  //     </div>
  //   </main>
  // )
  return (
    <main
      className="min-h-screen flex flex-col px-2 md:px-[33px] mx-auto"
    >
      <div className="mt-20 mx-auto">
        <p className="text-xl text-center">No product</p>
      </div>
    </main>
  )
}
