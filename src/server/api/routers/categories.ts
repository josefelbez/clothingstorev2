import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const categoriesRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    
    const categories = await ctx.prisma.category.findMany({     
      include: {
        _count: {
          select: {
            products: true
          }
        }
      },
    });

    if(!categories) throw new TRPCError( {code: "INTERNAL_SERVER_ERROR", message: "No Categories Found!" } )
    return categories;
  }),
});
