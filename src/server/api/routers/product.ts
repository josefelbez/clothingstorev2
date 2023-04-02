import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const productRouter = createTRPCRouter({
  
    getProductById: publicProcedure.input(z.object({
        id: z.string()
    })).
    query(async ({ctx, input}) => {

        const product = await ctx.prisma.product.findUnique({
            where: {
              id: parseInt(input.id)
            },
            include: {
                category: true,
                size: true,
                sales: true,
            }
        });

        if (!product) {
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "Product not Found",
            })
        }

        return product;
    }),
});
