import { createTRPCRouter } from "@/server/api/trpc";
import { categoriesRouter } from "./routers/categories";
import { categoryRouter } from "./routers/category";
import { productRouter } from "./routers/product";
import { productsRouter } from "./routers/products";
import { productsByCategory } from "./routers/productsByCategory";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  product: productRouter,
  products: productsRouter,
  categories: categoriesRouter,
  productsByCategory: productsByCategory,
  category: categoryRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
