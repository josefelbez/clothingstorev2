import { Slideshow } from "@/components/Slideshow";
import { api } from "@/utils/api";
import { type NextPage } from "next";
import Head from "next/head";
import { Suspense } from "react";
import ProductPage from "./[id]";
import { ProductCard } from "@/components/ProductCard";
import { LoadingSpinner } from "@/components/LoadingSpinner";

const Home: NextPage = () => {

  const { data } = api.products.getAll.useQuery();

  if(!data) return <p>Loading ...</p>

  return (
    <>
      <Head>
        <title>Home - My Store</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className="grow">
        <section className="p-4 space-y-5 h-auto">
            <h2 className="text-4xl uppercase font-bold pb-1 border-b-4 border-b-black w-fit">Shop</h2>
            <Suspense fallback={<div className="p-4 flex w-full items-center justify-center my-auto h-auto"> <LoadingSpinner size={64}/> </div>}>
              <div className="grid grid-cols-5 gap-2">
                {data.map((product) => (
                  <div key={product.id}>
                    <ProductCard data={product} />
                  </div>
                ))}
              </div>
            </Suspense>
          </section>
      </main>
    </>
  );
};

export default Home;
