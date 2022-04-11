import { Icon } from '@iconify/react';
import { Radio, RadioGroup, TextInput } from '@mantine/core';

export default function SearchEngine() {
	return (
		<form className="shadow-md p-5 text-sm bg-white">
			<div className="relative mb-5">
				<TextInput
					size="md"
					classNames={{ input: 'border-2' }}
					icon={
						<Icon
							icon="ant-design:search-outlined"
							width={19}
							height={19}
							className="absolute top-3 left-3"
						/>
					}
					type="text"
					name="place"
					placeholder="Cari nama tempat"
				/>
			</div>
			<RadioGroup
				label="Sort by"
				size="md"
				orientation="vertical"
				defaultValue="newest"
			>
				<Radio value="newest" label="Newest" />
				<Radio value="rating" label="Highest Rating" />
			</RadioGroup>
		</form>
	);
}
