import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.min.css'

import { api } from '@/utils/api';
import type {RouterOutputs} from '@/utils/api';
import Link from 'next/link';

type Category = RouterOutputs["categories"]["getAll"][number];

type Props = {
    data: Category[],
    isFilter?: boolean
}

export const SlideshowCategories = ( { data, isFilter }: Props ) => {

    return (
        <Swiper slidesPerView={2} breakpoints={{640: {slidesPerView: 4}, 1024: {slidesPerView: 6}}} spaceBetween={20}>
            {data.filter((item) => item._count.products > 0).sort((a,b) => a._count.products > b._count.products ? -1 : 1).map((category) => (
                <SwiperSlide key={category.id}>
                    <div className='border hover:bg-black hover:text-white ease-linear duration-75 w-full p-2'>
                        {isFilter ? <div  className='border hover:border-white justify-center items-center flex flex-col md:flex-row p-4 rounded-sm gap-2'>
                            <span className='font-bold'>{category.title}</span> ({category._count.products} Product{category._count.products > 1 && 's'})
                        </div> : <Link href={`/shop/category/${category.id}`} className='border hover:border-white justify-center items-center flex flex-col md:flex-row p-4 rounded-sm gap-2'>
                            <span className='font-bold'>{category.title}</span> ({category._count.products} Product{category._count.products > 1 && 's'})
                        </Link>}
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}