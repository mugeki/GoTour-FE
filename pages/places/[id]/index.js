import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import AddToWishlistButton from '../../../components/elements/addToWishlistButton';
import Layout from '../../../components/layout';
import dataMock from '../../../mockPlaces.json';

export default function Place() {
	const [data, setData] = useState();
	const [focusedImage, setFocusedImage] = useState(0);
	const router = useRouter();
	useEffect(() => {
		const { id } = router.query;
		setData(dataMock.places.filter((place) => place.id == id)[0]);
	}, [router]);
	return (
		<Layout navbarStyle="dark">
			{data && (
				<main>
					<div className="absolute top-0 -z-10 bg-black/70 min-w-full h-64 sm:h-[390px]"></div>
					<div
						className="absolute top-0 -z-20 min-w-full bg-cover h-64 sm:h-[390px]"
						style={{ backgroundImage: `url(${data.img_url[0]})` }}
					></div>
					<article className="grid md:grid-cols-2 px-8 py-5 md:px-20 md:py-12">
						<div className="ml-auto">
							<Image
								src={data.img_url[focusedImage]}
								width={650}
								height={410}
								objectFit="cover"
								className="rounded shadow"
							/>
							<div className="flex justify-between">
								{data.img_url
									.filter((_, i) => i !== focusedImage)
									.map((img, j) => (
										<div className="cursor-pointer" onClick={() => setFocusedImage(j)}>
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
								<AddToWishlistButton />
								<Rating
									initialValue={data.rating}
									size={15}
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
