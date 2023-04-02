import { type AppType } from "next/app";

import { api } from "@/utils/api";

import "@/styles/globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <div className="flex flex-col h-screen">
        <Header />
        <Component {...pageProps} />
        <Footer />
      </div>
    </>
  ) 
    
};

export default api.withTRPC(MyApp);
