import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.min.css'

import { api } from '@/utils/api';
import type {RouterOutputs} from '@/utils/api';
import Link from 'next/link';

type Category = RouterOutputs["categories"]["getAll"][number];

type Props = {
    data: Category[]
}

export const SlideshowCategories = ( { data }: Props ) => {

    return (
        <Swiper slidesPerView={2} breakpoints={{640: {slidesPerView: 4}, 1024: {slidesPerView: 6}}} spaceBetween={20}>
            {data.filter((item) => item._count.products > 0).map((category) => (
                <SwiperSlide key={category.id}>
                    <Link href={`/shop/category/${category.id}`} className='hover:bg-black hover:text-white ease-linear duration-75 w-full justify-center items-center flex flex-col md:flex-row p-4 border rounded-sm gap-2'>
                        <span className='font-bold'>{category.title}</span> ({category._count.products} Product{category._count.products > 1 && 's'})
                    </Link>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}