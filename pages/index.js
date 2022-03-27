import { Icon } from '@iconify/react';
import Link from 'next/link';
import { useState } from 'react';
import { Pagination } from 'swiper';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import CardHome from '../components/elements/cardHome';
import Layout from '../components/layout';
import dataMock from '../mockPlaces.json';

export default function Home() {
	const [focusedItem, setFocusedItem] = useState(0);
	const [data, setData] = useState(dataMock.places);

	return (
		<Layout navbarStyle="dark">
			<div className="absolute top-0 -z-10 bg-black/70 min-w-full min-h-screen"></div>
			<div
				className="absolute top-0 -z-20 min-w-full min-h-screen bg-cover transition-all duration-300"
				style={{ backgroundImage: `url(${data[focusedItem].img_url[0]})` }}
			></div>
			<main className="flex flex-col-reverse lg:flex-row justify-between items-center self-center lg:py-28 px-10 lg:px-20 xl:px-36 text-white">
				<div className="lg:w-3/4 md:mr-10 mt-6 lg:mt-0">
					<h1 className="font-bold text-4xl md:text-6xl mb-3 w-fit">
						{data[focusedItem].name}
					</h1>
					<p className="font-thin text-sm line-clamp-2 sm:line-clamp-5">
						{data[focusedItem].description}
					</p>
					<Link href="/" passHref>
						<a className="bg-teal-800 flex items-center justify-between py-2 px-4 mt-5 w-28 rounded shadow text-sm">
							<span>Explore</span>
							<Icon icon="eva:arrow-right-fill" />
						</a>
					</Link>
				</div>
				<Swiper
					centeredSlides={true}
					slidesPerView={2}
					spaceBetween={10}
					grabCursor={true}
					onSlideChange={(swiper) => setFocusedItem(swiper.activeIndex)}
					modules={[Pagination]}
					className="flex w-full sm:w-2/4"
				>
					{data.map((item, i) => (
						<SwiperSlide key={i} className="self-center">
							<CardHome
								title={item.name}
								rating={item.rating}
								img={item.img_url[0]}
								focused={i === focusedItem}
							/>
						</SwiperSlide>
					))}
				</Swiper>
			</main>
		</Layout>
	);
}
