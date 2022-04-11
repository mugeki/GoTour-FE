import axios from 'axios';
import { useEffect, useState } from 'react';
import CardExplore from '../../components/elements/cardExplore';
import SearchEngine from '../../components/elements/searchEngine';
import Layout from '../../components/layout';

export default function Explore() {
	const [data, setData] = useState([]);

	useEffect(() => {
		axios
			.get(`${process.env.BE_API_URL}/place`)
			.then((response) => {
				setData(response.data.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<Layout>
			<main className="px-20 py-10">
				<h1 className="font-bold text-2xl md:text-3xl mb-4">Explore Places</h1>
				<div className="flex flex-col lg:flex-row items-start">
					<div className="w-full mb-10 lg:w-1/4">
						<SearchEngine />
					</div>
					<div className="lg:w-3/4 flex flex-row flex-wrap justify-center">
						{data?.map((item, i) => (
							<div key={i} className="w-full sm:w-auto sm:mx-5 mb-10">
								<CardExplore
									id={item.id}
									name={item.name}
									location={item.location}
									rating={item.rating}
									img_urls={item.img_urls[0]}
								/>
							</div>
						))}
					</div>
				</div>
			</main>
		</Layout>
	);
}
