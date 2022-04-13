import { Group, Text, useMantineTheme } from '@mantine/core';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { useEffect, useState } from 'react';
import { Photo, Upload, X } from 'tabler-icons-react';

function getIconColor(status, accepted, files, theme) {
	return status.accepted || (accepted && files.length > 0)
		? theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]
		: status.rejected || (!accepted && files.length > 0)
		? theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]
		: theme.colorScheme === 'dark'
		? theme.colors.dark[0]
		: theme.colors.gray[7];
}

function ImageUploadIcon({ status, accepted, files, ...props }) {
	if (status.accepted || (accepted && files.length > 0)) {
		return <Upload {...props} />;
	}

	if (status.rejected || (!accepted && files.length > 0)) {
		return <X {...props} />;
	}

	return <Photo {...props} />;
}

export const dropzoneChildren = (status, accepted, files, error, theme) => {
	return (
		<Group
			position="center"
			align="center"
			className="flex flex-col"
			style={{ minHeight: 220, pointerEvents: 'none' }}
		>
			<ImageUploadIcon
				status={status}
				accepted={accepted}
				files={files}
				style={{ color: getIconColor(status, accepted, files, theme) }}
				size={100}
			/>
			<div>
				<Text
					size="xl"
					inline
					className="text-center"
					color={error !== '' ? 'red' : ''}
				>
					{accepted && files.length > 0
						? 'Selected files:'
						: !accepted && files.length > 0
						? 'Invalid file type'
						: error !== ''
						? error
						: 'Drag images here or click to select files'}
				</Text>
				<Text size="sm" color="dimmed" inline mt={7} className="text-center">
					{accepted && files.length > 0
						? files?.map((item) => item.name).join(', ')
						: !accepted && files.length > 0
						? 'Accepted file types: png, jpg, jpeg'
						: 'Attach as many files as you like, each file should not exceed 5mb'}
				</Text>
			</div>
		</Group>
	);
};

export default function ImageDropzone({ files, setFiles, error, setError }) {
	const theme = useMantineTheme();
	const [accepted, setAccepted] = useState(true);
	const handleAccept = (files) => {
		setAccepted(true);
		setFiles(files);
		setError('');
	};
	const handleReject = () => {
		setError('File invalid');
		setAccepted(false);
	};

	useEffect(() => {
		return () => {
			setAccepted(true);
			setFiles([]);
		};
	}, []);

	return (
		<Dropzone
			onDrop={(files) => handleAccept(files)}
			onReject={() => handleReject()}
			maxSize={3 * 1024 ** 2}
			multiple
			accept={[MIME_TYPES.png, MIME_TYPES.jpeg]}
		>
			{(status) => dropzoneChildren(status, accepted, files, error, theme)}
		</Dropzone>
	);
}
