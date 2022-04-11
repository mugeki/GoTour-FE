import { Icon } from '@iconify/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { generateAxiosConfig, isLoggedIn } from '../../utils/helper';

export default function AddToWishlistButton({ className, id, isActive }) {
	const router = useRouter();
	const [active, setActive] = useState(isActive);

	const handleWishlist = (id) => {
		if (isLoggedIn()) {
			axios({
				method: active ? "delete" : "post",
				url: `${process.env.BE_API_URL}/wishlist/${id}`,
				headers: generateAxiosConfig().headers,
			})
				.then(resp => {
					setActive(!active);
					console.log(resp.data.meta.message);
				})
				.catch(err => {
					console.log(err);
					// alert(JSON.stringify(err.res));
				})
		} else {
			router.push('/login');
		}
	}

	return (
		<button
			className={
				`flex items-center bg-white p-3 rounded-full shadow-md w-[44px] h-[44px] ` +
				className
			}
			onClick={(e) => {
				e.stopPropagation();
				handleWishlist(id);
			}}
		>
			<Icon icon="bi:bookmark-fill" color={active ? "#FFC32B" : "#B1B1B1"} />
		</button>
	);
}
