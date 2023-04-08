'use client';

import React from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';
import { LoadingSpinner } from './LoadingSpinner';
import Image from 'next/image';
import Link from 'next/link';
import type { RouterOutputs } from '@/utils/api';

type Product = RouterOutputs["products"]["getAll"][number];
type Category = RouterOutputs["categories"]["getAll"][number];

const SlideshowHero = ( {data, categories}: {data: Product[], categories: Category[]} ) => {

    if(!data) return <div className="p-4 flex w-full items-center justify-center h-[calc(100svh_-_80px)] my-auto"> <LoadingSpinner size={64}/> </div>
    if(!categories) return <div className="p-4 flex w-full items-center justify-center h-[calc(100svh_-_80px)] my-auto"> <LoadingSpinner size={64}/> </div>

    return (
        <Swiper className='h-[calc(100svh_-_62.8px)]'>
            {categories.filter((category) => category._count.products > 0).map((item) => (
                <SwiperSlide key={item.id} className='p-4'>
                    <div className='relative border border-zinc-900 rounded-sm h-full p-2'>
                        <Link href={`/shop/category/${item.id}`}> <h2 className='text-3xl bg-zinc-900 pb-2 w-fit uppercase text-white'> {item.title} </h2> </Link>
                        <div className='flex flex-col gap-2 justify-evenly items-center h-full '>
                            {data.filter((product) => product.category.id === item.id).slice(0,1).map((product) => (
                                <>
                                <div key={product.id} className='flex flex-col md:flex-row gap-5'>
                                    <div className='relative p-4'>
                                        <span className='absolute right-0 top-0 bg-zinc-900 z-20 text-white uppercase text-lg font-extralight'>Best Seller</span>
                                        <Link href={`/shop/${product.id}`}>
                                            <Image className='bg-white border hover:border-zinc-900 rounded-md  p-4 mix-blend-multiply object-contain h-fit max-h-[250px] md:max-h-[350px] max-w-[250px] md:max-w-[350px] w-full sm:w-full mx-auto aspect-square' src={product.image} width={350} height={350} alt={product.title} priority />
                                        </Link>
                                    </div>
                                    <div className='flex flex-col h-full items-start justify-center  text-center sm:justify-start'>
                                        <h2 className='font-black text-md sm:text-2xl uppercase'>{product.title}</h2>
                                        <hgroup className='flex justify-center sm:justify-start w-full gap-2'>
                                            <div className='flex items-center justify-center gap-2'>
                                                <Link href={`/shop/category/${item.id}`}> <h3 className='font-light text-zinc-600'>{item.title}</h3> </Link>
                                                -
                                                <h3>{product.size.title}</h3>
                                            </div>
                                            -
                                            <h3 className='font-bold text-zinc-600'>$ {product.discountPercentage !== 0 ? product.discountPercentage : product.price}</h3>
                                        </hgroup>
                                    </div>
                                </div>
                                <Link href={`/shop/${product.id}`} className='border border-zinc-900 p-4 px-8 uppercase font-light rounded-full text-zinc-900 hover:bg-zinc-900 hover:text-white duration-75 ease-linear'>Check Product</Link>
                                </>
                            ))}
                            
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default SlideshowHero