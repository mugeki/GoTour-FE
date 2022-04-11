import Image from 'next/image';
import Link from 'next/link';
import { Rating } from 'react-simple-star-rating';
import AddToWishlistButton from './addToWishlistButton';

export default function CardHome({
	id,
	img_urls,
	name,
	rating,
	focused = false,
}) {
	return (
		<Link href={`/places/${id}`} passHref>
			<div className="m-auto">
				<h1 className={(focused ? 'text-sm' : 'text-xs') + ' truncate'}>{name}</h1>
				<div>
					<Rating
						initialValue={rating}
						size={focused ? 15 : 10}
						readonly
						className="star-rating"
					/>
				</div>
				<div>
					<AddToWishlistButton className="absolute z-10 m-2" />
					{/* <ActionIcon
						size="xl"
						radius="xl"
						variant="filled"
						className="absolute z-10 m-2"
					>
						<Bookmark />
					</ActionIcon> */}
					<Image
						src={img_urls}
						width={focused ? 250 : 220}
						height={focused ? 450 : 300}
						objectFit="cover"
						className="rounded absolute"
						quality={100}
					/>
				</div>
			</div>
		</Link>
	);
}
