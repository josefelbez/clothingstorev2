import { ArrowLongRightIcon, Bars3BottomLeftIcon, ChevronDownIcon, HeartIcon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon } from "@heroicons/react/24/outline"
import Link from "next/link"

import { api } from "@/utils/api"
import Image from "next/image"

import { useRouter } from 'next/router'
import { useEffect, useState } from "react"

import { AnimatePresence, motion } from 'framer-motion'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { LoadingSpinner } from "./LoadingSpinner"

import { useCart } from "react-use-cart";
import { useWishlist} from 'react-use-wishlist';

export const Header = () => {

    const router = useRouter();

    const pathname = router.asPath;

    // Fetches Categories from API
    const { data } = api.categories.getAll.useQuery();
    
    const [searchBar, setSearchBar] = useState(false);
    
    const searchBarHandler = () => {
        setSearchBar(prev => !prev)
    }

    useEffect(() => (
        setSearchBar(false)
    ), [])

    const [mobileMenu, setMobileMenu] = useState(false);
    
    const mobileMenuHandler = () => {
        setMobileMenu(prev => !prev)
    }

    useEffect(() => (
        setMobileMenu(false)
    ), [])

    const [categoriesMenu, setCategoriesMenu] = useState(false);
    
    const categoriesMenuHandler = () => {
        setCategoriesMenu(prev => !prev)
    }

    const closeCategoryMenu = () => {
        setCategoriesMenu(false)
    }

    useEffect(() => (
        setCategoriesMenu(false)
    ), [])

    const [shopMenu, setShopMenu] = useState(false);
    
    const openShopMenu = () => {
        setShopMenu(true)
    }

    const closeShopMenu = () => {
        setShopMenu(false)
    }

    useEffect(() => (
        setShopMenu(false)
    ), [])

    const closeSearchBar = () => {
        setSearchBar(false)
    }

    const { isEmpty, totalItems } = useCart();

    const [ cartItems, setCartItems ] = useState(0);

    useEffect(() => (
        setCartItems(totalItems)
    ), [totalItems]);

    
    const { isWishlistEmpty, totalWishlistItems } = useWishlist();

    const [ wishlistItems, setwishlistItems ] = useState(0);

    useEffect(() => (
        setwishlistItems(totalWishlistItems)
    ), [totalWishlistItems]);

    return (
        
       <header>
            <div className="border-b">
                <nav className="container mx-auto p-4 flex justify-between items-center">
                    <div>
                        <ul className="relative flex gap-10 children:hidden first:children:flex first:children:sm:hidden children:sm:flex font-light first:hover:children-li:border-black first:children-li:border-0 children-li:py-1 first:children-li:py-0 children-li:border-b children-li:border-b-transparent">
                            <li className="cursor-pointer" onClick={() => [mobileMenuHandler(), closeSearchBar()]}> <Bars3BottomLeftIcon width={20} className="stroke-1"/> </li>
                            <li onClick={() => closeSearchBar()} className={`${pathname === '/' ? 'font-normal' : 'font-light'}`}> <Link href="/"> Home </Link> </li>
                            <li onMouseOver={openShopMenu} onMouseOut={closeShopMenu} className={pathname === '/shop' || pathname.match(`/shop/category/`) ? 'font-normal' : 'font-light'}> <Link href="/shop"> Shop </Link> </li>
                        
                            
                            {shopMenu && (
                                <motion.div  onClick={() => closeSearchBar()} initial={{opacity:0}} animate={{opacity: 1}} exit={{opacity: 0}} onMouseOver={openShopMenu} onMouseOut={closeShopMenu} className="absolute top-8 w-[fit] pt-2 left-[calc(100%_-_33px)] text-white z-50">
                                    <div className="bg-white text-black w-full min-w-[200px] border border-t-black">
                                        <motion.ul className="children:children-li:p-4 hover:children:children-li:bg-black hover:children:children-li:text-white">
                                            <motion.li initial={{opacity: 0, y: -20}} animate={{opacity: 1, y: 0}} exit={{opacity: 0}} key="browseAllCategory"> <Link href="/shop" className="flex justify-between gap-10 items-center"> <span>Browse All</span> <ArrowLongRightIcon width={20} /> </Link> </motion.li>
                                            
                                            {data ? data?.map((category) => (
                                                <motion.li initial={{opacity: 0, y: -20}} animate={{opacity: 1, y: 0}} exit={{opacity: 0}} key={category.id}> <Link href={`/shop/category/${category.id}`} className="flex justify-between gap-10 items-center"> <span>{category.title}</span> <ArrowLongRightIcon width={20} /> </Link> </motion.li>
                                            ))
                                            :
                                                <div className="p-4"> <Skeleton /> </div>
                                            }
                                        </motion.ul>
                                    </div>
                                </motion.div>
                            )}
                        </ul>
                    </div>
                    <div>
                        <Link onClick={() => closeSearchBar()} href="/"> <Image src="/icon.png" alt="Company Logo" width={30} height={30} priority /> </Link>
                    </div>
                    <div>
                        <ul className="flex gap-5 children:cursor-pointer">
                            <li onClick={() => searchBarHandler()}> <MagnifyingGlassIcon width={20} className="stroke-1"/> </li>
                            <li onClick={() => closeSearchBar()}> <Link href="/wishlist" className="relative"> <HeartIcon width={20} className="stroke-1"/> {wishlistItems > 0 && <span className="absolute bottom-3 text-xs left-2 right-0 bg-black w-5 flex items-center justify-center aspect-square text-white rounded-full">{wishlistItems}</span>} </Link> </li>
                            <li onClick={() => closeSearchBar()}> <Link href="/cart" className="relative"> <ShoppingBagIcon width={20} className="stroke-1"/> {cartItems > 0 && <span className="absolute bottom-3 text-xs left-2 right-0 bg-black w-5 flex items-center justify-center aspect-square text-white rounded-full">{cartItems}</span>} </Link> </li>
                        </ul>
                    </div>
                </nav>
            </div>
            
            <AnimatePresence>
            {searchBar && (
                <>
                    <motion.div key="searchBox" initial={{opacity: 0, y:-100}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: -20}} className="bg-white hover:border-zinc-900 focus-within:border-zinc-900 absolute cursor-pointer  flex justify-between items-center w-fit border mx-auto inset-x-0 rounded-full my-5 z-20">
                        <input type="text" className="py-2 pl-4 pr-2 outline-none bg-transparent z-50 peer" placeholder="Search"/>
                        <MagnifyingGlassIcon className="stroke-1 stroke-gray-300 mx-2 peer-focus-within:stroke-black peer-hover:stroke-zinc-900" width={20}/>
                    </motion.div>
                    <span key="searchOverlay" onClick={() => searchBarHandler()} className={`w-full h-[calc(100%_-_68px)] absolute inset-x-0`}></span>
                </>
            )}
            </AnimatePresence>
            
            <AnimatePresence>
                {mobileMenu && (
                    <motion.div initial={{opacity: 0, x:-100}} animate={{opacity: 1, x: 0}} exit={{ x: -100, opacity: 0 }} className="absolute w-full h-screen bg-white top-0 left-0 m-0 z-50">
                        <div className="flex items-center justify-between p-4 border-b">
                            <span className="cursor-pointer" onClick={() => mobileMenuHandler()}> <XMarkIcon width={20} /> </span>
                        </div>
                        <div className="p-4 pt-0">
                            <ul className="children:children:py-4 children:children:flex children:children:items-center children:children:justify-between">
                                <li onClick={() => [mobileMenuHandler(), closeCategoryMenu()]}> <Link href="/"> <span>Home</span> <ArrowLongRightIcon width={20} /> </Link> </li>
                                <li onClick={() => [mobileMenuHandler(), closeCategoryMenu()]}> <Link href="/shop"> <span>Shop</span> <ArrowLongRightIcon width={20} /> </Link> </li>
                            </ul>
                            <div>
                                <div onClick={() => categoriesMenuHandler()} className="flex justify-between items-center">
                                    <h2 className="py-4">Categories</h2> <span> {data ? (categoriesMenu ? <motion.div animate={{rotate: 0}}> <ChevronDownIcon width={20} /> </motion.div> : <motion.div animate={{rotate: -90}}> <ChevronDownIcon width={20} /> </motion.div>) : <div> <LoadingSpinner /> </div>} </span>
                                </div>
                                <AnimatePresence>
                                    {categoriesMenu && (
                                        <motion.ul className="children:children:py-4 children:font-light">
                                            {data?.map((category) => (
                                                <motion.li onClick={() => [mobileMenuHandler(), categoriesMenuHandler()]} initial={{opacity: 0, y: -50}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: -10}} key={category.id}> <Link href={`/shop/category/${category.id}`} className="flex justify-between items-center"> <span>{category.title}</span> <ArrowLongRightIcon width={20} /> </Link> </motion.li>
                                            ))}
                                        </motion.ul>
                                    )}
                                </AnimatePresence>
                            </div>                                            
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            
        </header>
    )
}