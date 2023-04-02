import { TRPCError } from "@trpc/server";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const productsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    
    const products = await ctx.prisma.product.findMany({

      include: {
        category: true,
        size: true,
        sales: true
      },

      orderBy: {
        id: 'desc'
      }
      
    });

    if(!products) throw new TRPCError( {code: "INTERNAL_SERVER_ERROR", message: "No Products Found!" } )
    return products;
  }),
  getBestSellers: publicProcedure.query(async ({ ctx }) => {
    
    const products = await ctx.prisma.product.findMany({

      include: {
        category: true,
        size: true,
        sales: true,
      },

      orderBy: {
        sales: {
          _count: 'desc'
        }
      },

      take: 5
      
    });

    if(!products) throw new TRPCError( {code: "INTERNAL_SERVER_ERROR", message: "No Products Found!" } )
    return products;
  }),
});
