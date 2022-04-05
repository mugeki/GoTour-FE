import Image from 'next/image';
import Link from 'next/link';
import { Rating } from 'react-simple-star-rating';
import AddToWishlistButton from './addToWishlistButton';

export default function CardExplore({
	id,
	img_url,
	name,
    location,
	rating,
}) {
    return (
        <Link href={`/places/${id}`} passHref>
            <div className="rounded shadow-md cursor-pointer">
                <div className='px-4 py-3'>
                    <h1 className="text-base font-bold">{name}</h1>
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
                <div className='relative'>
                    <AddToWishlistButton className="absolute z-10 m-2 right-0" />
                    <Image
                        src={img_url}
                        width={260}
                        height={176}
                        objectFit='cover'
                        quality={100}
                    />
                </div>
            </div>
        </Link>
        
    )
}