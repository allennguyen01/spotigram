import PropTypes from 'prop-types';
import { FaMagnifyingGlass } from 'react-icons/fa6';

export default function SearchBox({ search, setSearchInput }) {
	function performSearch() {
		setSearchInput(document.getElementById('search-input').value);
		search();
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

SearchBox.propTypes = {
	search: PropTypes.func,
	setSearchInput: PropTypes.func,
	setSearched: PropTypes.func,
};
