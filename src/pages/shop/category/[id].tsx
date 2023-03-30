import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next/types'

import {api} from "@/utils/api";
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Suspense, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductCard } from '@/components/ProductCard';

const CategoryPage: NextPage< {id: string} > = ( {id} ) => {

    const { data, isFetched } = api.productsByCategory.getProductByCategory.useQuery( {id} );

    const { data: category } = api.category.getCategoryById.useQuery ( {id} );

    const [filterOpen, setFilterOpen] = useState(false)

    const toggleFilter = () => {
      setFilterOpen(prev => !prev)
    }

    return (
      <section className="px-5 my-5 space-y-5">
      <div className="flex gap-5 items-end justify-between">
        <h2 className="font-bold uppercase border-b-2 border-black w-fit"> {category?.title} </h2> 
        <motion.div whileTap={{scale: 1.12}} onClick={() => toggleFilter()} className="select-none flex items-center justify-between gap-2 border px-3 py-1 text-xs bg-zinc-100 uppercase cursor-pointer"> 
          <span>Filters</span> {filterOpen ? <MinusIcon width={12} /> : <PlusIcon width={12} /> } 
        </motion.div>
      </div>
      <AnimatePresence>
        {filterOpen && (
          
            <motion.div key={'menu-filter'} initial={{opacity: 0, y: 100}} animate={{opacity: 1, y: 0}} exit={{ opacity: 0, }} className="bg-gray-100 px-4 py-2">
              a
            </motion.div>
        )}
      </AnimatePresence>

      <Suspense fallback={<p>Loading...</p>}>
        <AnimatePresence>
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'>
            {isFetched && (
              data?.map((product) => (
                <ProductCard key={product.id} data={product} className={''} hasUtilities={false} />
              ))
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