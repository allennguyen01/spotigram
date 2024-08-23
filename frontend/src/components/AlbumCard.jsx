import PropTypes from 'prop-types';
import ReviewModalForm from './ReviewModalForm';

export default function AlbumCard({ album }) {
	const albumID = album.id;
	const albumName = album.name;
	const albumArtists = album.artists.map((artist) => artist.name).join(', ');
	const albumCoverURL = album.images[0].url;
	const albumReleaseDate = new Date(album.release_date);
	const albumReleaseYear = albumReleaseDate.getFullYear();

	return (
		<div>
			<div
				className='card card-side items-center bg-zinc-900 w-full h-full py-4 px-6 hover:cursor-pointer'
				onClick={() =>
					document.getElementById(`review-modal-${albumName}`).showModal()
				}
			>
				<img
					src={albumCoverURL}
					alt={`${albumName} album cover`}
					className='w-28 h-28 rounded-lg'
				/>
				<div className='card-body'>
					<h2 className='card-title font-semibold text-white flex items-end'>
						{albumName}
						<span className='font-sans font-thin text-neutral-content'>
							{albumReleaseYear}
						</span>
					</h2>

					<p>
						<span className='font-thin'>Performed by </span>
						{albumArtists}
					</p>
				</div>
			</div>

			<ReviewModalForm
				albumID={albumID}
				albumName={albumName}
				albumCoverURL={albumCoverURL}
			/>

			<div className='divider'></div>
		</div>
	);
}

AlbumCard.propTypes = {
	album: PropTypes.object,
};
