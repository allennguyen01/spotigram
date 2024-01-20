import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaMagnifyingGlass } from 'react-icons/fa6';

export default function NavBar() {
	return (
		<section className='navbar bg-zinc-900 justify-center'>
			<div className='flex justify-between w-[950px]'>
				<NavLink to='/'>
					<btn className='font-bold text-3xl text-white'>
						Musicboxd
					</btn>
				</NavLink>
				<SearchBox />
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
				placeholder='Search for album'
				className='join-item bg-white text-black input input-sm w-24 md:w-auto'
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						performSearch();
					}
				}}
				onChange={(e) => setSearchInput(e.target.value)}
			/>
			<button
				className='join-item bg-white btn btn-sm border-0'
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
