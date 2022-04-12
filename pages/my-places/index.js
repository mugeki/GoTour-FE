import { Button } from '@mantine/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Plus } from 'tabler-icons-react';
import CardExplore from '../../components/elements/cardExplore';
import ModalPlace from '../../components/elements/modalPlace';
import Layout from '../../components/layout';
import { generateAxiosConfig, isLoggedIn } from "../../utils/helper";

export default function MyPlaces() {
	const [isOpen, setIsOpen] = useState(false);
	const [isEdit, setIsEdit] = useState(false);
	const [editData, setEditData] = useState({});
	const [data, setData] = useState([]);
    useEffect(() => {
		axios.get(`${process.env.BE_API_URL}/my-places`, generateAxiosConfig())
			.then(res => {
                if (isLoggedIn()) {
                    axios.get(`${process.env.BE_API_URL}/wishlist`, generateAxiosConfig())
                        .then(resWishlist => {
                            const wishlistedPlaces = resWishlist.data.data;
                            const resWithWishlist = res.data.map((place) => {
                                return {
                                    ...place,
                                    wishlist: wishlistedPlaces.some(e => e.id === place.id),
                                }
                            })
                            setData(resWithWishlist);
                        })
                        .catch(err => {
                            console.log(err);
                            alert(JSON.stringify(err.res.data));
                        })
				} else {
					setData(res.data);
				}
			})
			.catch(err => {
				console.log(err);
                // alert(err.res.data.meta.message);
                alert(JSON.stringify(err.res.data));
			})
	}, []);

	const handleDelete = (id) => {
		axios
			.delete(`${process.env.BE_API_URL}/place/${id}`, generateAxiosConfig())
			.then((res) => {
				const newData = data.filter((place) => {
					return place.id != id;
				})
				setData(newData);
			})
			.catch((err) => {
				console.log(err);
			})
	}

	return (
		<Layout>
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

				<div className="flex flex-row flex-wrap">
					{data.map((item, i) => (
						<div key={i} className="w-full sm:w-auto sm:mr-5 mb-10">
							<CardExplore
								id={item.id}
								name={item.name}
								location={item.location}
								rating={item.rating}
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
			</main>
		</Layout>
	);
}
