import { ActionIcon } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import { Edit, Trash } from 'tabler-icons-react';
import AddToWishlistButton from './addToWishlistButton';
import ModalConfirmation from './modalConfirmation';

export default function CardExplore({
	id,
	img_urls,
	name,
	location,
	rating,
	openEdit,
	isWishlishted,
	handleDelete,
}) {
	const router = useRouter();
	const editable = router.pathname.includes('/my-places');
	const [isOpen, setIsOpen] = useState(false);
	return (
		<>
			<ModalConfirmation
				opened={isOpen}
				setOpened={setIsOpen}
				data={{ id, name }}
				handleDelete={handleDelete}
			/>
			<div className="rounded shadow-md bg-white">
				<div className="px-4 py-3">
					<Link href={`/places/${id}`} passHref>
						<h1 className="w-[170px] text-base font-bold cursor-pointer hover:text-teal-600 truncate">
							{name}
						</h1>
					</Link>
					<h2 className="text-sm font-light">{location}</h2>
					<div>
						<Rating
							initialValue={rating}
							size={16}
							readonly
							className="star-rating"
						/>
					</div>
				</div>

				{editable && (
					<div className="flex px-4 mb-4">
						<ActionIcon color="red" className="mr-2" onClick={() => setIsOpen(true)}>
							<Trash strokeWidth={1.5} />
						</ActionIcon>
						<ActionIcon color="yellow" className="mr-2" onClick={openEdit}>
							<Edit strokeWidth={1.5} />
						</ActionIcon>
					</div>
				)}
				<div className="relative">
					<AddToWishlistButton isActive={isWishlishted} id={id} className="absolute z-10 m-2 right-0" />
					<Image
						src={img_urls}
						width={245}
						height={176}
						objectFit="cover"
						quality={100}
					/>
				</div>
			</div>
		</>
	);
}
