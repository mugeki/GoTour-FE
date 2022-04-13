import { Button, Loader, Text } from '@mantine/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
import CardExplore from '../../components/elements/cardExplore';
import SearchEngine from '../../components/elements/searchEngine';
import Layout from '../../components/layout';
import { generateAxiosConfig, isLoggedIn } from '../../utils/helper';

export default function Explore() {
	const [isLoading, setIsLoading] = useState(true);
	const [isLoadingMore, setIsLoadingMore] = useState(false);
	const [data, setData] = useState([]);
	const [keyword, setKeyword] = useState('');
	const [sortBy, setsortBy] = useState('');

	useEffect(() => {
		setIsLoading(true);
		axios
			.get(`${process.env.BE_API_URL}/place`)
			.then((res) => {
				if (isLoggedIn()) {
					axios
						.get(`${process.env.BE_API_URL}/wishlist`, generateAxiosConfig())
						.then((resWishlist) => {
							const wishlistedPlaces = resWishlist.data.data;
							const resWithWishlist = res.data.data.data.map((place) => {
								return {
									...place,
									wishlist: wishlistedPlaces.some((e) => e.id === place.id),
								};
							});
							console.log(resWithWishlist);
							setData(resWithWishlist);
							setIsLoading(false);
						})
						.catch((err) => {
							console.log(err);
							alert(JSON.stringify(err.res.data));
						})						
				} else {
					setData(res.data.data.data);
					setIsLoading(false);
				}
			})
			.catch((err) => {
				console.log(err);
			})			
	}, []);

	const handleSearchSubmit = (keywordSubmit, sortBySubmit) => {
		setKeyword(keywordSubmit);
		setsortBy(sortBySubmit);
		setIsLoading(true);
		axios
			.get(
				`${process.env.BE_API_URL}/place?keyword=${keywordSubmit}&sort_by=${sortBySubmit}`
			)
			.then((res) => {
				if (isLoggedIn()) {
					axios
						.get(`${process.env.BE_API_URL}/wishlist`, generateAxiosConfig())
						.then((resWishlist) => {
							const wishlistedPlaces = resWishlist.data.data;
							const resWithWishlist = res.data.data.data.map((place) => {
								return {
									...place,
									wishlist: wishlistedPlaces.some((e) => e.id === place.id),
								};
							});
							setData(resWithWishlist);
							setIsLoading(false);
						})
						.catch((err) => {
							console.log(err);
							alert(JSON.stringify(err.res.data));
						})						
				} else {
					setData(res.data.data.data);
					setIsLoading(false);
				}
			})
			.catch((err) => {
				console.log('err', err);
			})			
	};

	const handleLoadMore = () => {
		setIsLoadingMore(true);
		axios
			.get(
				`${process.env.BE_API_URL}/place?page=${
					data.length / 9 + 1
				}&keyword=${keyword}&sort_by=${sortBy}`
			)
			.then((res) => {
				if (isLoggedIn()) {
					axios
						.get(`${process.env.BE_API_URL}/wishlist`, generateAxiosConfig())
						.then((resWishlist) => {
							const wishlistedPlaces = resWishlist.data.data;
							const resWithWishlist = res.data.data.data.map((place) => {
								return {
									...place,
									wishlist: wishlistedPlaces.some((e) => e.id === place.id),
								};
							});
							setData([...data, ...resWithWishlist]);
							setIsLoadingMore(false);
						})
						.catch((err) => {
							console.log(err);
							alert(JSON.stringify(err.res.data));
						})						
				} else {
					setData([...data, ...res.data.data.data]);
					setIsLoadingMore(false);
				}
			})
			.catch((err) => {
				console.log('err', err);
			})			
	};

	return (
		<Layout>
			<main className="px-20 py-10">
				<h1 className="font-bold text-2xl md:text-3xl mb-4">Explore Places</h1>
				<div className="flex flex-col lg:flex-row items-start">
					<div className="w-full mb-10 lg:w-1/4">
						<SearchEngine handleSearchSubmit={handleSearchSubmit} />
					</div>
					<div className="lg:w-3/4 ">
						{isLoading && <Loader className="m-auto" />}
						{!isLoading && data.length === 0 && (
							<Text size="xl" className="text-center">
								Nothing found.
							</Text>
						)}
						{!isLoading && data.length > 0 && (
							<div className="flex flex-row flex-wrap justify-center">
								{data?.map((item, i) => (
									<div key={i} className="w-full sm:w-auto sm:mx-5 mb-10">
										<CardExplore
											id={item.id}
											name={item.name}
											location={item.location}
											rating={item.rating}
											rated_by_count={item.rated_by_count}
											img_urls={item.img_urls[0]}
											isWishlishted={item.wishlist}
										/>
									</div>
								))}
							</div>
						)}

						{data.length % 9 === 0 && data.length !== 0 && (
							<Button
								variant="filled"
								onClick={handleLoadMore}
								loading={isLoadingMore}
								className="text-center m-auto block"
							>
								Load more
							</Button>
						)}
					</div>
				</div>
			</main>
		</Layout>
	);
}
