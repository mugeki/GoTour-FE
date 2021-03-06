import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import { toast } from 'react-toastify';
import 'swiper/css';
import AddToWishlistButton from '../../../components/elements/addToWishlistButton';
import Layout from '../../../components/layout';
import { generateAxiosConfig, isLoggedIn } from '../../../utils/helper';
import Head from 'next/head';

export default function Place() {
	const [data, setData] = useState();
	const [bgImage, setBgImage] = useState();
	const [highlightedImageIndex, setHighlightedImageIndex] = useState(0);
	const router = useRouter();
	const { id } = router.query;

	useEffect(() => {
		axios
			.get(`${process.env.BE_API_URL}/place/${id}`)
			.then((res) => {
				const place = res.data.data;
				setBgImage(place.img_urls[0]);
				if (isLoggedIn()) {
					axios
						.get(`${process.env.BE_API_URL}/wishlist`, generateAxiosConfig())
						.then((resWishlist) => {
							const wishlistedPlaces = resWishlist.data.data;
							const resWithWishlist = {
								...place,
								wishlist: wishlistedPlaces.some((e) => e.id === place.id),
							};
							setData(resWithWishlist);
						})
						.catch((err) => {
							console.log(err);
						});
				} else {
					setData(place);
				}				
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const handleRating = (rating) => {
		axios({
			method: 'put',
			url: `${process.env.BE_API_URL}/place/${id}/rate`,
			headers: generateAxiosConfig().headers,
			data: {
				rating: rating / 20,
			},
		})
			.then((res) => {
				const newData = { ...data };
				newData.rating = res.data.data.rating;
				console.log('newData', newData);
				setData(newData);
				toast.success('Place rated!', {
					position: 'top-center',
					autoClose: 2000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleChangeImage = (index) => {
		setHighlightedImageIndex(index);
	};

	return (
		<Layout navbarStyle="dark">
			{data && (			
				<main>
					<Head>
						<title>{data.name} - GoTour</title>
					</Head>
					<div className="absolute top-0 -z-10 bg-black/70 min-w-full h-64 sm:h-[390px]"></div>
					<div
						className="absolute top-0 -z-20 min-w-full bg-cover h-64 sm:h-[390px]"
						style={{ backgroundImage: `url(${bgImage})` }}
					></div>
					<article className="grid md:grid-cols-2 px-8 py-5 md:px-20 md:py-12">
						<div className="ml-auto">
							<Image
								src={data.img_urls[highlightedImageIndex]}
								width={600}
								height={410}
								objectFit="cover"
								className="rounded shadow"
							/>

							<div className={'flex gap-3 flex-wrap max-w-[600px] justify-center'}>
								{data.img_urls.map((img, j) => {									
									return (
										<div
											key={j}
											className={`${j === highlightedImageIndex ? "border-[#009994] border-[3px]" : ""} rounded relative w-[80px] h-[50px] lg:w-[150px] lg:h-[100px] xl:w-[190px] xl:h-[110px] 2xl:w-[200px] 2xl:h-[120px] cursor-pointer hover:translate-x-1.5 hover:translate-y-1.5 transition-all`}
											onClick={() => handleChangeImage(j)}
										>
											<Image
												key={j}
												src={img}
												objectFit="cover"
												className="rounded"
												layout="fill"
											/>
										</div>
									);
								})}
							</div>
						</div>

						<div className="text-gray-900 md:text-white md:ml-10 md:mt-20">
							<div className="flex items-center mb-2">
								<AddToWishlistButton isActive={data.wishlist} id={data.id} />
								<Rating
									initialValue={data.rating}
									size={15}
									readonly={!isLoggedIn()}
									onClick={handleRating}
									className="star-rating ml-3 mr-2"
								/>
								<span className="text-xs">({data.rated_by_count})</span>
							</div>
							<h1 className="text-2xl lg:text-4xl xl:text-5xl font-bold truncate">
								{data.name}
							</h1>
							<p className="text-md mt-2 xl:text-lg md:font-thin truncate">
								{data.location}
							</p>
							<p className="text-gray-900 mt-5 text-sm md:mt-14">{data.description}</p>
						</div>
					</article>
				</main>
			)}
		</Layout>
	);
}
