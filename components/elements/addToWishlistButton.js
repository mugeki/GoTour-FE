import { Icon } from '@iconify/react';

export default function AddToWishlistButton({ className }) {
	return (
		<button
			className={
				`flex items-center bg-white p-3 rounded-full shadow-md w-[44px] h-[44px] ` +
				className
			}
		>
			<Icon icon="bi:bookmark-fill" color="#B1B1B1" />
		</button>
	);
}
