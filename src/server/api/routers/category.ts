import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const categoryRouter = createTRPCRouter({
  
    getCategoryById: publicProcedure.input(z.object({
        id: z.string()
    })).
    query(async ({ctx, input}) => {

        const category = await ctx.prisma.category.findUnique({
            where: {
              id: parseInt(input.id)
            },
        });

        if (!category) {
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "Product not Found",
            })
        }

        return category;
    }),
});
