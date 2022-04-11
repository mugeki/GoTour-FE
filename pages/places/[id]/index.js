import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import AddToWishlistButton from '../../../components/elements/addToWishlistButton';
import Layout from '../../../components/layout';
import { generateAxiosConfig, isLoggedIn } from "../../../utils/helper";

export default function Place() {
	const [data, setData] = useState();
	const [focusedImage, setFocusedImage] = useState(0);
	const router = useRouter();
	const { id } = router.query;

	useEffect(() => {
		axios.get(`${process.env.BE_API_URL}/place/${id}`)
			.then(res => {
				const place = res.data.data;
				if (isLoggedIn()) {
					axios.get(`${process.env.BE_API_URL}/wishlist`, generateAxiosConfig())
						.then(resWishlist => {
							const wishlistedPlaces = resWishlist.data.data;
							const resWithWishlist = {
								...place,
								wishlist: wishlistedPlaces.some(e => e.id === place.id),
							}
							setData(resWithWishlist);
						})
						.catch(err => {
							console.log(err);
							// alert(JSON.stringify(err.res.data));
						})
				} else {
					setData(place);
				}
			})
			.catch(err => {
				console.log(err);
				// alert(JSON.stringify(err.res.data));
			})
	}, [router]);
	
	const handleRating = (rating) => {
		axios({
			method: "put",
			url: `${process.env.BE_API_URL}/place/${id}/rate`,
			headers: generateAxiosConfig().headers,
			data: {
				rating: rating/20,
			}
		})
			.then(res => {
				// console.log(rating);
				// const newData = data;
				// newData.rating = res.data.data.rating;
				// console.log(newData)
				// setData(newData);
				router.reload(window.location.pathname)
			})
			.catch(err => {
				console.log(err);
			})
	}

	return (
		<Layout navbarStyle="dark">
			{data && (
				<main>
					<div className="absolute top-0 -z-10 bg-black/70 min-w-full h-64 sm:h-[390px]"></div>
					<div
						className="absolute top-0 -z-20 min-w-full bg-cover h-64 sm:h-[390px]"
						style={{ backgroundImage: `url(${data.img_urls[0]})` }}
					></div>
					<article className="grid md:grid-cols-2 px-8 py-5 md:px-20 md:py-12">
						<div className="ml-auto">
							<Image
								src={data.img_urls[focusedImage]}
								width={650}
								height={410}
								objectFit="cover"
								className="rounded shadow"
							/>
							<div className="flex justify-between">
								{data.img_urls
									.filter((_, i) => i !== focusedImage)
									.map((img, j) => (
										<div key={j} className="cursor-pointer" onClick={() => setFocusedImage(j)}>
											<Image
												key={j}
												src={img}
												width={203}
												height={133}
												objectFit="cover"
												className="rounded mx-2"
											/>
										</div>
									))}
							</div>
						</div>

						<div className="text-gray-900 md:text-white md:ml-10 md:mt-20">
							<div className="flex items-cetner mb-2">
								<AddToWishlistButton isActive={data.wishlist} id={data.id} />
								<Rating
									initialValue={data.rating}
									size={15}
									readonly={!isLoggedIn()}
									onClick={handleRating}
									className="star-rating ml-3 "
								/>
							</div>
							<h1 className="text-2xl md:text-5xl font-bold break-all">{data.name}</h1>
							<p className="text-lg md:text-xl md:font-thin break-all">
								{data.location}
							</p>
							<p className="text-gray-900 mt-5 md:mt-16">{data.description}</p>
						</div>
					</article>
				</main>
			)}
		</Layout>
	);
}
