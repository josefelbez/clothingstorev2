import Image from 'next/image'
import {motion} from "framer-motion"
import type { RouterOutputs } from '@/utils/api';
import Link from 'next/link';
import { HeartIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';

type Product = RouterOutputs["products"]["getAll"][number];

type Props = {
    data: Product,
    className: string,
    hasUtilities: boolean
}

export const ProductCard = ( {data, className, hasUtilities}: Props ) => {

    const { id, title, image, category, price } = data; 

    return (
        <motion.div className={`${hasUtilities ? 'children:space-y-5 md:grid md:grid-cols flex flex-col children:text-center children:md:justify-center children:md:items-center children:md:text-start justify-center items-center gap-10 first:children:col-span-12 first:md:children:col-span-8 children:col-span-12 children:md:col-span-4 last:children:col-span-12 children:items-cter children:justify-center' : className}`} initial={{opacity: 0, x: -20}} animate={{opacity: 1, x: 0}}>
            <motion.div whileHover={{scale: 1.1}} className='ease-linear duration-100 select-none bg-zinc-100 flex items-center justify-center p-4 w-auto rounded-t-md'>
                <Link className="aspect-square" href={`/shop/${id}`}>
                    <Image className="mix-blend-darken object-contain w-full h-full" src={image} alt={title} width={200} height={200} priority />
                </Link>
            </motion.div>
            <div className='p-2 text-sm lg:text:md flex flex-col'>
                <Link className="w-fit" href={`/shop/${id}`}>{title}</Link>
                <Link href={`/shop/category/${category.id}`} className='text-slate-500 font-light'>{category.title}</Link>
                <h3>$ {price}</h3>
            </div>
            {hasUtilities && (
                <div className='col-span-12 flex gap-5 items-center space-y-0 justify-center'>
                    <button className='border rounded-md hover:border-zinc-900 duration-100 ease-linear py-3 px-6 child:stroke-1 flex items-center gap-2'> <HeartIcon width={25} /> <span>Add to Wishlist</span> </button>
                    <button className='border rounded-md hover:border-zinc-900 duration-100 ease-linear py-3 px-6 child:stroke-1 flex items-center gap-2'> <ShoppingBagIcon width={25} /> <span>Add to Cart</span> </button>
                </div>
            )}
        </motion.div>
    )
}