import { type AppType } from "next/app";

import { api } from "@/utils/api";

import "@/styles/globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartProvider } from "react-use-cart";
import { WishlistProvider } from "react-use-wishlist";
import { ToastBar, Toaster } from "react-hot-toast";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
    <CartProvider>
      <WishlistProvider>
        <div className="flex flex-col h-screen">
          <Header />
          <div className='absolute top-0 left-0 right-0'> <Toaster>
            {(t) => (
              <ToastBar
                
                toast={t}
                style={{
                  ...t.style,
                  animation: t.visible ? 'custom-enter 1s ease' : 'custom-exit 1s ease',
                }}
              />
            )}
          </Toaster> </div>
          <Component {...pageProps} />
          <Footer />
        </div>
      </WishlistProvider>
    </CartProvider>
    </>
  ) 
    
};

export default api.withTRPC(MyApp);
