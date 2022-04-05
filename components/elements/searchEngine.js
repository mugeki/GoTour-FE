import { Icon } from '@iconify/react';

export default function SearchEngine() {
    return (
        <form action="" className="shadow-md p-5 text-sm">
            <div className='relative mb-5'>
                <Icon icon="ant-design:search-outlined" color="#888888" width={19} height={19} className='absolute top-3 left-3' />
                <input type="text" name="place" id="" placeholder="Cari nama tempat" className="w-full border border-slate-400 rounded px-1 py-2 pl-10" />
            </div>
            <p className='font-bold mb-4'>Sort By</p>
            <div>
                <input type="radio" id="newest" name="sort" value="newest" className='accent-teal-200'
                        checked/>
                <label for="newest" className='ml-3'>Newest</label>
            </div>
            <div>
                <input type="radio" id="highest" name="sort" value="highest" className='accent-teal-200'
                        checked/>
                <label for="highest" className='ml-3'>Highest Rating</label>
            </div>
        </form>
    )
}