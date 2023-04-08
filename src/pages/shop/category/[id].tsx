import type { GetStaticProps, NextPage } from 'next/types'

import {api} from "@/utils/api";

const CategoryPage: NextPage< {id: string} > = ( {id} ) => {

    const { data } = api.productsByCategory.getProductByCategory.useQuery( {id} );

    const { data: category } = api.category.getCategoryById.useQuery ( {id} );
    const { data: categories } = api.categories.getAll.useQuery();

    if(!data) return <div className="p-4 flex w-full items-center justify-center h-[calc(100vh_-_80px)] my-auto"> <LoadingSpinner size={64}/> </div>
    if(!category) return <div className="p-4 flex w-full items-center justify-center h-[calc(100vh_-_80px)] my-auto"> <LoadingSpinner size={64}/> </div>
    if(!categories) return  <div className="p-4 flex w-full items-center justify-center h-[calc(100vh_-_80px)] my-auto"> <LoadingSpinner size={64}/> </div>

    return (
      <main className="grow">
        <section className="p-4 space-y-5">
            <h2 className="text-4xl uppercase font-bold pb-1 border-b-4 border-b-black w-fit">{category?.title}</h2>
            <Suspense fallback={<p>Loading...</p>}>
            {data.length > 0 ? 
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                <>
                  {data.map((product) => (
                    <div key={product.id}>
                      <ProductCard data={product} />
                    </div>
                  ))}
                </>
              </div>
              :
              <>
              <div className='space-y-5'>
                <p>No products added to this category</p>
                <Link className='hover:bg-black inline-flex hover:text-white border rounded-full px-6 py-3 ease-linear duration-75 gap-5' href="/shop"> <ArrowLongLeftIcon width={25} /> <span>Return to the shop</span> </Link>
              </div>
            </>
               }
            </Suspense>
          </section>
          <section className='w-full space-y-5 p-4'>
            <h2 className='text-4xl uppercase font-bold pb-1 border-b-4 border-b-black w-fit'>Categories</h2>
            <h3>Check out our categories!</h3>
            <SlideshowCategories data={categories}/>
          </section>
      </main>
    )
}

import { createProxySSGHelpers } from '@trpc/react-query/ssg'
import { appRouter } from '@/server/api/root';
import { prisma } from '@/server/db';
import superjson from "superjson";
import { ProductCard } from '@/components/ProductCard';
import { Suspense } from 'react';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import Link from 'next/link';
import { Slideshow } from '@/components/Slideshow';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SlideshowCategories } from '@/components/SlideshowCategories';
import { ArrowLongLeftIcon } from '@heroicons/react/24/outline';

export const getStaticProps: GetStaticProps = async (context) => {
  
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: { prisma },
    transformer: superjson,
  })

  const id = context.params?.id;

  if (typeof id !== "string" ) throw new Error("no id");

  await ssg.productsByCategory.getProductByCategory.prefetch({ id: id });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
  }
}

export const getStaticPaths = () => {

  return {paths: [], fallback: "blocking"}
}

export default CategoryPage