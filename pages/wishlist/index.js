import { Loader, Text } from '@mantine/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
import CardExplore from '../../components/elements/cardExplore';
import Layout from '../../components/layout';
import { generateAxiosConfig } from '../../utils/helper';

export default function Wishlist() {
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState([]);

	useEffect(() => {
		setIsLoading(true);
		axios
			.get(`${process.env.BE_API_URL}/wishlist`, generateAxiosConfig())
			.then((res) => {
				setData(res.data.data);
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	return (
		<Layout>
			<main className="px-20 py-10">
				<h1 className="font-bold text-2xl md:text-3xl mb-8">My Wishlist</h1>
				{isLoading && <Loader className="m-auto" />}
				{!isLoading && data.length === 0 && (
					<Text size="xl" className="text-center">
						Nothing found.
					</Text>
				)}
				{!isLoading && data.length > 0 && (
					<div className="flex flex-row flex-wrap">
						{data.map((item, i) => (
							<div key={i} className="w-full sm:w-auto sm:mr-5 mb-10">
								<CardExplore
									id={item.id}
									name={item.name}
									location={item.location}
									rating={item.rating}
									rated_by_count={item.rated_by_count}
									img_urls={item.img_urls[0]}
									isWishlishted={true}
								/>
							</div>
						))}
					</div>
				)}
			</main>
		</Layout>
	);
}
