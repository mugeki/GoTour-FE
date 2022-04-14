import { Button, Loader, Text } from '@mantine/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Plus } from 'tabler-icons-react';
import CardExplore from '../../components/elements/cardExplore';
import ModalPlace from '../../components/elements/modalPlace';
import Layout from '../../components/layout';
import { generateAxiosConfig, isLoggedIn } from '../../utils/helper';
import Head from 'next/head';

export default function MyPlaces() {
	const [isLoading, setIsLoading] = useState(true);
	const [isOpen, setIsOpen] = useState(false);
	const [isEdit, setIsEdit] = useState(false);
	const [editData, setEditData] = useState({});
	const [data, setData] = useState([]);
	useEffect(() => {
		setIsLoading(true);
		axios
			.get(`${process.env.BE_API_URL}/my-places`, generateAxiosConfig())
			.then((res) => {
				if (isLoggedIn()) {
					axios
						.get(`${process.env.BE_API_URL}/wishlist`, generateAxiosConfig())
						.then((resWishlist) => {
							const wishlistedPlaces = resWishlist.data.data;
							const resWithWishlist = res.data.map((place) => {
								return {
									...place,
									wishlist: wishlistedPlaces.some((e) => e.id === place.id),
								};
							});
							setData(resWithWishlist);
						})
						.catch((err) => {
							console.log(err);
						})
						.finally(() => {
							setIsLoading(false);
						});
				} else {
					setData(res.data);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const handleDelete = (id) => {
		setIsLoading(true);
		axios
			.delete(`${process.env.BE_API_URL}/place/${id}`, generateAxiosConfig())
			.then(() => {
				const newData = data.filter((place) => {
					return place.id != id;
				});
				setData(newData);
				toast.success('Place deleted!', {
					position: 'top-center',
					autoClose: 2000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			})
			.catch(() => {
				toast.error('Something went wrong', {
					position: 'top-center',
					autoClose: 2000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	return (
		<Layout>
			<Head>
				<title>My Places - GoTour</title>
			</Head>
			<ModalPlace
				opened={isOpen}
				setOpened={setIsOpen}
				title="Add Place"
				isEdit={isEdit}
				data={isEdit ? editData : {}}
				placeData={data}
				setData={setData}
			/>
			<main className="px-20 py-10">
				<div className="flex items-center justify-between mb-8">
					<h1 className="font-bold text-2xl md:text-3xl ">My Places</h1>
					<Button
						variant="outline"
						rightIcon={<Plus size={15} />}
						onClick={() => {
							setIsEdit(false);
							setIsOpen(true);
						}}
					>
						Add Place
					</Button>
				</div>

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
									isWishlishted={item.wishlist}
									handleDelete={handleDelete}
									openEdit={() => {
										setIsEdit(true);
										setEditData({ ...item });
										setIsOpen(true);
									}}
								/>
							</div>
						))}
					</div>
				)}
			</main>
		</Layout>
	);
}
