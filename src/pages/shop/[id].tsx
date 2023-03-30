import type { GetStaticProps, NextPage } from 'next/types'

import {api} from "@/utils/api";
import { Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ProductCard } from '@/components/ProductCard';

const ProductPage: NextPage< {id: string} > = ( {id} ) => {

    const { data } = api.product.getProductById.useQuery( {id} );

    return (
      <section className="px-5 mt-10 ">

      <Suspense fallback={<p>Loading...</p>}>
        <AnimatePresence>
            <div className='md:max-w-lg mx-auto'>
                {data && (
                  
                  <ProductCard hasUtilities={true} className="flex flex-col md:flex-row items-center gap-10 children:space-y-5 justify-center children:text-center children:items-center" 
                    key={data.id} data={data} />
                )}
            </div>
        </AnimatePresence>
      </Suspense>
    </section>
    )
}

import { createProxySSGHelpers } from '@trpc/react-query/ssg'
import { appRouter } from '@/server/api/root';
import { prisma } from '@/server/db';
import superjson from "superjson";

export const getStaticProps: GetStaticProps = async (context) => {
  
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: { prisma },
    transformer: superjson,
  })

  const id = context.params?.id;

  if (typeof id !== "string" ) throw new Error("no id");

  await ssg.product.getProductById.prefetch({ id: id });

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

export default ProductPage