import Image from 'next/image';
import { Rating } from 'react-simple-star-rating';

export default function CardHome({ img, title, rating, focused = false }) {
	return (
		<div className="m-auto">
			<h1 className={focused ? 'text-sm' : 'text-xs'}>{title}</h1>
			<div>
				<Rating
					initialValue={rating}
					size={focused ? 15 : 10}
					readonly
					className="star-rating"
				/>
			</div>
			<div>
				<Image
					src={img}
					width={focused ? 250 : 220}
					height={focused ? 450 : 350}
					objectFit="cover"
					className="rounded transition ease-in-out delay-150"
					quality={100}
				/>
			</div>
		</div>
	);
}
