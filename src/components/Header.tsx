import { ArrowLongRightIcon, Bars3BottomRightIcon, HeartIcon, ShoppingBagIcon, UserIcon, XMarkIcon } from "@heroicons/react/24/outline"
import Link from "next/link"

import { useEffect, useState } from "react"
import { api } from "@/utils/api"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"

import { useRouter } from 'next/router'

export const Header = () => {

    const router = useRouter();

    const routername = router.asPath;

    // Fetches Categories from API
    const { data } = api.categories.getAll.useQuery();

    const [categoriesList, setCategoriesList] = useState(data)

    useEffect(() => (
        setCategoriesList(data)
    ), [data])

    // Splits Categories with the three categories with the most products Added
    const categoriesFiltered = categoriesList?.sort((a, b) => a._count.products > b._count.products ? -1 : 1 ).slice(0,3)

    // Menu Mobile Handler
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => (
        setMenuOpen(false)
    ), [])

    
    return (
        
        <header className={`px-5 py-4 border-b bg-white`}>

            <nav className="flex items-center">

                <div> 
                    <Link href="/" className="uppercase"> <Image src="/icon.png" alt="logo" width={36} height={36}/> </Link>
                </div>

                <div className="grow flex justify-end items-center sm:justify-center">
                    <ul className={`flex items-center gap-10 first:children:flex first:children:sm:hidden children:hidden children:sm:flex children:py-1 children:border-b children:border-transparent hover:children:border-black`}>
                        <li onClick={() => setMenuOpen(true)} className="cursor-pointer"> <Bars3BottomRightIcon width={20} /> </li>
                        <li className={`${routername === '/' ? 'font-bold' : 'font-light'}`} > <Link href="/"> Home </Link> </li>
                        <li className={`${routername === '/shop' ? 'font-bold' : 'font-light'}`}> <Link href="/shop"> Shop </Link> </li>
                        {categoriesFiltered?.map((category) => (
                            <li className ={`${routername === `/shop/category/${category.id}` ? 'font-bold': 'font-normal'} `} key={category.id}> <Link href={`/shop/category/${category.id}`}> {category.title} </Link> </li>
                        ))}
                    </ul>
                </div>

                <div className="hidden sm:flex">
                    <ul className="flex gap-5 children:cursor-pointer">
                        <li> <ShoppingBagIcon width={20} /> </li>
                        <li> <HeartIcon width={20} /> </li>
                        <li> <Link href=""> <UserIcon width={20} /> </Link> </li>
                    </ul>
                </div>

                <AnimatePresence>
                    {menuOpen && (
                        <motion.div initial={{x:-100, opacity: 0}} animate={{x:0, opacity: 1}} exit={{x: -20, opacity: 0}} className="absolute top-0 left-0 w-full h-screen bg-white z-50">
                        <div className="flex items-center p-5 justify-between border-b border-dashed">
                            <h2 className="uppercase">Menu</h2> 
                            <span onClick={() => setMenuOpen(false)}> <XMarkIcon width={25} /> </span>
                        </div>

                        <div className="p-5">
                            <ul className="children-li:py-2 children:children:flex children:children:items-center children:children:justify-between">
                                <li onClick={() => setMenuOpen(false)}> <Link href="/"> <span> Home </span> <ArrowLongRightIcon width={20} /> </Link> </li>
                                <li onClick={() => setMenuOpen(false)}> <Link href="/shop"> <span> Shop </span> <ArrowLongRightIcon width={20} /> </Link> </li>
                                {categoriesFiltered?.map((category) => (
                                    <li onClick={() => setMenuOpen(false)} key={category.id}> <Link href={`/shop/category/${category.id}`}> <span>{category.title} - ({category._count.products})</span> <ArrowLongRightIcon width={20} /> </Link> </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                    )}
                </AnimatePresence>

            </nav>

        </header>
    )
}