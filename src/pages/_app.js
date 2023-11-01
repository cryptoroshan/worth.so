import '@/styles/globals.css'

import { ThemeProvider } from "@material-tailwind/react";

import Layout from "@/components/layout/layout";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}
