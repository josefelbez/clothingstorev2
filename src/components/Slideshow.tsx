import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.min.css'

import { api } from '@/utils/api';
import type {RouterOutputs} from '@/utils/api';
import { ProductCard } from './ProductCard';

type Product = RouterOutputs["products"]["getAll"][number];

type Props = {
    isBestSellers?: boolean,
    isBestDeals?: boolean,
    isNewestProducts?: boolean,
    data: Product[]
}

export const Slideshow = ( { data, isBestSellers, isBestDeals, isNewestProducts }: Props ) => {


    return (
        <Swiper slidesPerView={2} breakpoints={{640: {slidesPerView: 4}, 1024: {slidesPerView: 6}}} spaceBetween={20}>
            {isBestSellers && 
                data && data?.sort((a, b) => a.sales.length > b.sales.length ? -1 : 1).slice(0,5).map((product: Product, index) => (
                <SwiperSlide key={product.id} className='h-auto z-auto'>
                    <ProductCard data={product} />
                </SwiperSlide>
            ))}
            {isBestDeals && 
                data && data?.sort((a, b) => a.discountPercentage > b.discountPercentage ? -1 : 1).filter((item) => item.discountPercentage > 0).map((product: Product) => (
                <SwiperSlide key={product.id} className='h-auto z-auto'>
                    <ProductCard data={product} />
                </SwiperSlide>
            ))}
            {isNewestProducts && 
                data?.map((product: Product) => (
                <SwiperSlide key={product.id} className='h-auto z-auto'>
                    <ProductCard data={product}/>
                </SwiperSlide>
            ))} 
        </Swiper>
    )
}