import PropTypes from 'prop-types';

export default function AlbumCard({ album }) {
	const albumName = album.name;
	const albumArtists = album.artists.map((artist) => artist.name).join(', ');
	const albumCoverArt = album.images[0].url;
	const albumReleaseDate = new Date(album.release_date);
	const albumReleaseYear = albumReleaseDate.getFullYear();

	return (
		<>
			<div className='card card-side bg-base-100 w-3/4'>
				<figure>
					<img
						src={albumCoverArt}
						alt={`${albumName} album cover`}
						className='w-28'
					/>
				</figure>
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
			<div className='divider'></div>
		</>
	);
}

AlbumCard.propTypes = {
	album: PropTypes.object,
};
