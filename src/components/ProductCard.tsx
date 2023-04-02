import Image from 'next/image'
import {motion} from "framer-motion"
import type { RouterOutputs } from '@/utils/api';
import Link from 'next/link';
import { HeartIcon, ShoppingBagIcon, TrashIcon } from '@heroicons/react/24/outline';

import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'

TimeAgo.addDefaultLocale(en)

import { useCart } from 'react-use-cart'
import { useWishlist } from 'react-use-wishlist'


type Product = RouterOutputs["products"]["getAll"][number];

type Props = {
    data: Product,
    className?: string,
    hasUtilities?: boolean,
}

export const ProductCard = ( {data, className, hasUtilities} : Props ) => {

    const { id, title, image, category, price, discountPercentage, size } = data; 

    const discountedPrice = Math.round(((price - (price * discountPercentage / 100)) + Number.EPSILON) * 100) / 100;   

    if(!className) className = '';

    const { addItem, removeItem, inCart } = useCart();
    const { addWishlistItem, removeWishlistItem, inWishlist } = useWishlist();

    const product = {
        id: id.toString(),
        price: price
    }

    return (
        <motion.div className={`${hasUtilities ? 'children:space-y-2 md:grid md:grid-cols flex flex-col children:text-center children:md:justify-center children:md:items-center children:md:text-start justify-center items-center gap-10 first:children:col-span-12 first:md:children:col-span-8 children:col-span-12 children:md:col-span-4 last:children:col-span-12 children:items-center children:justify-center' : className}`} initial={{opacity: 0, x: -20}} animate={{opacity: 1, x: 0}}>
                    {!hasUtilities && (<motion.div className='absolute top-0 right-0 p-2 gap-2 flex flex-col z-20'>
                        <motion.div whileTap={{scale: 0.8}} onClick={() => inWishlist(id.toString()) ? removeWishlistItem(id.toString()) : addWishlistItem(product)} className={`${inWishlist(id.toString()) ? 'p-2 shadow-md rounded-md border children:stroke-red-700 children:fill-red-700' : 'bg-white p-2 shadow-md rounded-md border  '} cursor-pointer duration-75 ease-linear text-zinc-300 hover:bg-zinc-100 children:hover:fill-red-800 children:hover:stroke-red-800`}> <HeartIcon width={20} /> </motion.div>
                        <motion.div whileTap={{scale: 0.8}} onClick={() => inCart(id.toString()) ? removeItem(id.toString()) : addItem(product)} className={`${inCart(id.toString()) ? 'bg-zinc-900 text-white p-2 shadow-md rounded-md border border-zinc-900' : 'bg-white p-2 shadow-md rounded-md border'} cursor-pointer duration-75 ease-linear hover:text-zinc-600 text-zinc-300`}> {inCart(id.toString()) ? <TrashIcon width={20} /> : <ShoppingBagIcon width={20} /> } </motion.div>
                    </motion.div>)}
                    <motion.div className='ease-linear duration-100 select-none bg-zinc-100 flex items-center justify-center w-auto rounded-t-md'>
                        <Link className="aspect-square relative" href={`/shop/${id}`}>
                            {discountPercentage !== 0 && <span className='border uppercase border-dashed absolute left-0 top-0  rounded-br-md rounded-tl-md px-1 font-light bg-green-500 text-white z-20'>{discountPercentage}% OFF</span>}
                            <Image className="p-4 mix-blend-darken object-contain w-full max-w-[300px] aspect-square" placeholder='blur' blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII=' src={image} alt={title} width={200} height={200} priority />
                        </Link>
                    </motion.div>
                    <div className='p-2 text-sm lg:text:md flex flex-col'>
                        <Link className="w-fit" href={`/shop/${id}`}>{title}</Link>
                        <Link href={`/shop/category/${category.id}`} className='text-slate-500 font-light'>{category.title}</Link>
                        <h2>Size: {size && size.title}</h2>
                        {discountPercentage !== 0 ?
                        <div className='flex gap-2'>
                            <h3 className='line-through text-zinc-400'>$ {price}</h3>
                            <h3 className='text-green-500'>$ {discountedPrice}</h3>
                        </div>
                        : <h3>$ {price}</h3>}
                    </div>
                    {hasUtilities && (
                        <div className='col-span-12 flex gap-5 items-center space-y-0 justify-center'>
                            <button onClick={ ()=> inWishlist(id.toString()) ? removeWishlistItem(id.toString()) : addWishlistItem(product) } className={`${inWishlist(id.toString()) ? 'bg-zinc-900 text-white' : 'bg-transparent text-zinc-900'} border rounded-md hover:border-zinc-900 duration-100 ease-linear p-2 text-xs child:stroke-1 flex items-center gap-2`}> <HeartIcon width={15   } /> {inWishlist(id.toString()) ? <span>Remove from Wishlist</span> : <span>Add to Wishlist</span>} </button>
                            <button onClick={ ()=> inCart(id.toString()) ? removeItem(id.toString()) : addItem(product) } className={`${inCart(id.toString()) ? 'bg-zinc-900 text-white' : 'bg-transparent text-zinc-900'} border rounded-md hover:border-zinc-900 duration-100 ease-linear p-2 text-xs child:stroke-1 flex items-center gap-2`}> <ShoppingBagIcon width={15 } /> {inCart(id.toString()) ? <span>Remove from cart</span> : <span>Add to Cart</span>} </button>
                        </div>
                    )}
                </motion.div>
    )
}