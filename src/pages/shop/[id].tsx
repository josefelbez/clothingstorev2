import type { GetStaticProps, NextPage } from 'next/types'

import {api} from "@/utils/api";

const ProductPage: NextPage< {id: string} > = ( {id} ) => {

    const { data } = api.product.getProductById.useQuery( {id} );

    if(!data) return <div className="p-4 flex w-full items-center justify-center h-[calc(100vh_-_80px)] my-auto"> <LoadingSpinner size={64}/> </div>

    return (
      <section className='mt-10'>
        <Suspense fallback={<p>Loading...</p>}>
          <ProductCard data={data} hasUtilities/>
        </Suspense>
      </section>
    )
}

import { createProxySSGHelpers } from '@trpc/react-query/ssg'
import { appRouter } from '@/server/api/root';
import { prisma } from '@/server/db';
import superjson from "superjson";
import { ProductCard } from '@/components/ProductCard';
import { Suspense } from 'react';
import { LoadingSpinner } from '@/components/LoadingSpinner';

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