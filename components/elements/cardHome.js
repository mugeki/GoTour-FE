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
	isWishlishted,
}) {
	return (
		<Link href={`/places/${id}`} passHref>
			<div className="m-auto select-none">
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
					<AddToWishlistButton
						isActive={isWishlishted}
						id={id}
						className="absolute z-10 m-2"
					/>
					<Image
						src={img_urls}
						width={focused ? 250 : 220}
						height={focused ? 450 : 300}
						objectFit="cover"
						className="rounded absolute"
					/>
				</div>
			</div>
		</Link>
	);
}
