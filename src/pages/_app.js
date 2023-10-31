import { SessionProvider } from "next-auth/react"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { ProductProvider } from "@/contexts/ProductContext/product-context";

import Layout from "@/components/layout/layout";

import '@/styles/globals.css'

// export default function App({
//   Component,
//   pageProps: { session, ...pageProps },
// }) {
//   return (
//     <SessionProvider session={session}>
//       <ProductProvider>
//         <Layout>
//           <Component {...pageProps} />
//         </Layout>
//       </ProductProvider>
//       <ToastContainer
//         position='top-center'
//         autoClose={4000}
//         hideProgressBar
//         pauseOnHover={false}
//         pauseOnFocusLoss={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         theme='dark'
//       />
//     </SessionProvider>
//   )
// }

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}