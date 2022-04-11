import { Button, Modal, Text } from '@mantine/core';
import { useState } from 'react';

export default function ModalConfirmation({ opened, setOpened, data }) {
	const [fetchError, setFetchError] = useState('');
	const handleYes = () => {
		axios
			.delete(`${process.env.BE_API_URL}/places/${data.id}`)
			.then((res) => {})
			.catch((err) => {})
			.finally(() => {});
	};

	return (
		<Modal
			opened={opened}
			onClose={() => setOpened(false)}
			centered
			withCloseButton={false}
			title="Are you sure to delete this data?"
			classNames={{
				title: 'text-lg font-medium',
			}}
			styles={{ close: { backgroundColor: '#fff !important' } }}
		>
			<Text size="md">
				The place <b>"{data.name}"</b> will be deleted forever and removed from the
				Explore page.
			</Text>
			<div className="flex justify-end mt-5">
				<Button className="mx-3" variant="outline" onClick={() => setOpened(false)}>
					No
				</Button>
				<Button variant="filled">Yes</Button>
			</div>
		</Modal>
	);
}
