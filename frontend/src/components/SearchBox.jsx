import PropTypes from 'prop-types';

export default function SearchBox({ search, setSearchInput }) {
	return (
		<div className='join'>
			<input
				type='text'
				placeholder='Search for album'
				className='join-item input input-sm input-bordered w-24 rounded-full md:w-auto'
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						search();
					}
				}}
				onChange={(e) => setSearchInput(e.target.value)}
			/>
			<button
				className='join-item btn btn-sm'
				onClick={() => {
					search();
				}}
			>
				Search
			</button>
		</div>
	);
}

SearchBox.propTypes = {
	search: PropTypes.func,
	setSearchInput: PropTypes.func,
};
