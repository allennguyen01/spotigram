import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { FaMagnifyingGlass } from 'react-icons/fa6';

export default function NavBar() {
	return (
		<section className='navbar justify-center bg-zinc-900'>
			<div className='flex w-[1024px] items-center justify-between'>
				<NavLink to='/'>
					<button className='btn h-full gap-4 bg-transparent'>
						<img
							src='../../public/logo.svg'
							className='h-10'
						/>
						<p className='text-3xl font-bold text-white'>Jukeboxd</p>
					</button>
				</NavLink>
				<div className='flex items-center gap-4'>
					<NavLink
						to='/home'
						className='text-sm font-semibold hover:text-white'
					>
						HOME
					</NavLink>
					<NavLink
						to='/reviews'
						className='text-sm font-semibold hover:text-white'
					>
						REVIEWS
					</NavLink>
					<SearchBox />
				</div>
			</div>
		</section>
	);
}

function SearchBox() {
	const [searchInput, setSearchInput] = useState('');
	const navigate = useNavigate();

	const handleSearch = () => {
		navigate(`/search/${searchInput}`);
	};

	function performSearch() {
		setSearchInput(
			(document.getElementById('search-input') as HTMLInputElement).value,
		);
		handleSearch();
	}

	return (
		<div className='join rounded-full'>
			<input
				id='search-input'
				type='text'
				className='input join-item input-sm w-24 focus:bg-white focus:text-black md:w-auto'
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						performSearch();
					}
				}}
				onChange={(e) => setSearchInput(e.target.value)}
			/>
			<button
				className='btn join-item btn-sm border-0 focus:bg-white'
				onClick={() => {
					performSearch();
				}}
			>
				<FaMagnifyingGlass />
			</button>
		</div>
	);
}
