import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const productsByCategory = createTRPCRouter({

    getProductByCategory: publicProcedure.input(z.object({
        id: z.string()
    }))
    .query(async ({ ctx, input }) => {
    
    const products = await ctx.prisma.product.findMany({
      where: {
        categoryId: parseInt(input.id)
      },
      include: {
        category: true
      }
    });

    if(!products) throw new TRPCError( {code: "INTERNAL_SERVER_ERROR", message: "No Products Found!" } )
    return products;
  }),
});
