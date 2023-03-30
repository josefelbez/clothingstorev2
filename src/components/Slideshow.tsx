import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.min.css'

import { api } from '@/utils/api';
import type {RouterOutputs} from '@/utils/api';
import { ProductCard } from './ProductCard';

type Product = RouterOutputs["products"]["getAll"][number];

export const Slideshow = ( ) => {

    const { data, isFetched } = api.products.getAll.useQuery();

    return (
        <Swiper slidesPerView={2} breakpoints={{640: {slidesPerView: 4}, 1024: {slidesPerView: 6}}} spaceBetween={20}>
            {isFetched && data?.map((product: Product) => (
                <SwiperSlide key={product.id} className='h-auto'>
                    <ProductCard data={product} className={""} hasUtilities={false} />
                </SwiperSlide>
            ))}
        </Swiper>
    )
}