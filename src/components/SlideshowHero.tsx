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

    if(!data) return <div className="p-4 flex w-full items-center justify-center h-[calc(100vh_-_80px)] my-auto"> <LoadingSpinner size={64}/> </div>
    if(!categories) return <div className="p-4 flex w-full items-center justify-center h-[calc(100vh_-_80px)] my-auto"> <LoadingSpinner size={64}/> </div>

    return (
        <Swiper className='h-[calc(100vh_-_62.8px)]' direction={"vertical"}>
            {categories.filter((category) => category._count.products > 0).map((item) => (
                <SwiperSlide key={item.id} className='p-4'>
                    <div className='relative border border-zinc-900 rounded-sm h-full p-4'>
                        <h2 className='text-3xl bg-zinc-900 pb-2 w-fit uppercase text-white absolute top-2 left-2'> {item.title} </h2>
                        <div className='flex flex-col gap-2 justify-evenly items-center h-full '>
                            {data.filter((product) => product.category.id === item.id).slice(0,1).map((product) => (
                                <>
                                <div key={product.id} className='flex flex-col md:flex-row gap-5'>
                                    <div className='relative p-4'>
                                        <span className='absolute right-0 top-0 bg-zinc-900 text-white uppercase text-lg font-extralight'>Best Seller</span>
                                        <Image className='bg-white border rounded-md  p-4 mix-blend-multiply object-contain h-fit max-h-[250px] md:max-h-[350px] max-w-[250px] md:max-w-[350px] aspect-square' src={product.image} width={350} height={350} alt={product.title} priority />
                                    </div>
                                    <div className='flex flex-col h-full items-start justify-center'>
                                        <h2 className='font-black text-md sm:text-2xl uppercase'>{product.title}</h2>
                                        <hgroup className='flex justify-between w-full'>
                                            <div className='flex items-center justify-center gap-2'>
                                                <h3 className='font-light text-zinc-600'>{item.title}</h3> 
                                                -
                                                <h3>{product.size.title}</h3>
                                            </div>
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