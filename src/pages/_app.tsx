import { type AppType } from "next/app";

import { api } from "@/utils/api";

import "@/styles/globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartProvider } from "react-use-cart";
import { WishlistProvider } from "react-use-wishlist";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
    <CartProvider>
      <WishlistProvider>
        <div className="flex flex-col h-screen">
          <Header />
          <Component {...pageProps} />
          <Footer />
        </div>
      </WishlistProvider>
    </CartProvider>
    </>
  ) 
    
};

export default api.withTRPC(MyApp);
