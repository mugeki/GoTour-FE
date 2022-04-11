import { Button } from '@mantine/core';
import { useState } from 'react';
import { Plus } from 'tabler-icons-react';
import CardExplore from '../../components/elements/cardExplore';
import ModalPlace from '../../components/elements/modalPlace';
import Layout from '../../components/layout';
import dataMock from '../../mockPlaces.json';

export default function SubmittedPlaces() {
	const [isOpen, setIsOpen] = useState(false);
	const [isEdit, setIsEdit] = useState(false);
	const [editData, setEditData] = useState({});
	const dataOri = dataMock.places;
	const data = [...dataOri, ...dataOri];

	return (
		<Layout>
			<ModalPlace
				opened={isOpen}
				setOpened={setIsOpen}
				title="Add Place"
				isEdit={isEdit}
				data={isEdit ? editData : {}}
			/>
			<main className="px-20 py-10">
				<div className="flex items-center justify-between mb-8">
					<h1 className="font-bold text-2xl md:text-3xl ">Submitted Places</h1>
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
