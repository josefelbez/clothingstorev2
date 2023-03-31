import type { GetStaticProps, NextPage } from 'next/types'

import {api} from "@/utils/api";

const CategoryPage: NextPage< {id: string} > = ( {id} ) => {

    const { data, isFetched } = api.productsByCategory.getProductByCategory.useQuery( {id} );

    const { data: category } = api.category.getCategoryById.useQuery ( {id} );

    return (
      <h1>{id}</h1>
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