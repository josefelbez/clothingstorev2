import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ProductCard } from "@/components/ProductCard";
import { Slideshow } from "@/components/Slideshow";
import SlideshowHero from "@/components/SlideshowHero";
import { api } from "@/utils/api";
import { type NextPage } from "next";
import Head from "next/head";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";

const Home: NextPage = () => {

  const { data } = api.products.getAll.useQuery();

  const { data: categories } = api.categories.getAll.useQuery();

  if(!data) return <div className="p-4 flex w-full items-center justify-center h-[calc(100vh_-_80px)] my-auto"> <LoadingSpinner size={64}/> </div>
  if(!categories) return <div className="p-4 flex w-full items-center justify-center h-[calc(100vh_-_80px)] my-auto"> <LoadingSpinner size={64}/> </div>

  return (
    <>
      <Head>
        <title>Home - My Store</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className="grow">

        <section>
          <SlideshowHero data={data} categories={categories} />
        </section>

        <section className="p-4 space-y-5">
          <h2 className="text-4xl uppercase font-bold pb-1 border-b-4 border-b-black w-fit">Best Sellers</h2>
          <Suspense fallback={<div className="p-4 flex w-full items-center justify-center my-auto h-auto"> <LoadingSpinner size={64}/> </div>}>
            <Slideshow isBestSellers data={data}/>
          </Suspense>
        </section>

        <section className="p-4">
          <div className="w-full bg-black p-2 text-white">
            <div className="flex flex-col md:flex-row gap-5 text-center md:justify-between items-center border p-2">
              <h2 className="uppercase text-3xl font-black">Subscribe to our Newsletter</h2> <button className="border border-white hover:bg-white hover:text-black ease-linear duration-75 p-4 px-8">SIGN UP</button>
            </div>
          </div>
        </section>

        <section className="p-4 space-y-5">
          <h2 className="text-4xl uppercase font-bold pb-1 border-b-4 border-b-black w-fit">Last Added</h2>
          <Suspense fallback={<div className="p-4 flex w-full items-center justify-center my-auto h-auto"> <LoadingSpinner size={64}/> </div>}>
            <Slideshow isNewestProducts data={data}/>
          </Suspense>
        </section>

        <section className="p-4 space-y-5">
          
          <Suspense fallback={<div className="p-4 flex w-full items-center justify-center my-auto h-auto"> <LoadingSpinner size={64}/> </div>}>
            <Slideshow isBestDeals data={data}/>
          </Suspense>
        </section>

        <section className="p-4 space-y-5">
          <h2 className="text-4xl uppercase font-bold pb-1 border-b-4 border-b-black w-fit">Categories</h2>
          <div className="flex flex-col sm:flex-row gap-5">
          {categories && categories.filter((category) => category._count.products > 0).map((category) => (
            <Link key={category.id} href={`shop/category/${category.id}`} className="px-4 border rounded-sm hover:bg-zinc-900 hover:text-white duration-75 ease-linear">
              <div className="flex gap-2 p-4">
                <h2>{category.title}</h2> - <h2>({category._count.products} Product{category._count.products > 1 && 's'})</h2>
              </div>
            </Link>
          ))}              
          </div>
        </section>

      </main>
    </>
  );
};

export default Home;
