import { Button, Modal, Text } from '@mantine/core';
import { useState } from 'react';

export default function ModalConfirmation({ opened, setOpened, data, handleDelete }) {
	const [fetchError, setFetchError] = useState('');

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
				<Button onClick={() => {
					handleDelete(data.id)
					setOpened(false)	
				}} variant="filled">Yes</Button>
			</div>
		</Modal>
	);
}
