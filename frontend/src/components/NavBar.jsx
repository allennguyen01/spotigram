import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaMagnifyingGlass } from 'react-icons/fa6';

export default function NavBar() {
	return (
		<section className='navbar bg-zinc-900 justify-center'>
			<div className='flex justify-between items-center w-[1024px]'>
				<NavLink to='/'>
					<button className='btn bg-transparent h-full gap-4'>
						<img
							src='../../public/logo.svg'
							className='h-10'
						/>
						<p className='font-bold text-3xl text-white'>Jukeboxd</p>
					</button>
				</NavLink>
				<div className='flex items-center gap-4'>
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
		setSearchInput(document.getElementById('search-input').value);
		handleSearch();
	}

	return (
		<div className='join rounded-full'>
			<input
				id='search-input'
				type='text'
				className='join-item input input-sm w-24 focus:bg-white focus:text-black md:w-auto'
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						performSearch();
					}
				}}
				onChange={(e) => setSearchInput(e.target.value)}
			/>
			<button
				className='join-item focus:bg-white btn btn-sm border-0'
				onClick={() => {
					performSearch();
				}}
			>
				<FaMagnifyingGlass />
			</button>
		</div>
	);
}

NavBar.propTypes = {
	search: PropTypes.func,
	setSearchInput: PropTypes.func,
};

SearchBox.propTypes = {
	search: PropTypes.func,
	setSearchInput: PropTypes.func,
	setSearched: PropTypes.func,
};
