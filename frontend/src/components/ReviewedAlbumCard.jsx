import PropTypes from 'prop-types';
import ReviewRatingStars from './ReviewRatingStars';

export default function ReviewedAlbumCard({
	albumName,
	albumCoverURL,
	rating,
	review,
}) {
	return (
		<div className='card card-side bg-zinc-900 p-4 rounded gap-4'>
			<figure className='flex-none self-start'>
				<img
					src={albumCoverURL}
					alt={`${albumName} album cover`}
					className='size-28 rounded'
				/>
			</figure>
			<div className='card-body p-0 text-ellipsis overflow-hidden'>
				<h2 className='card-title'>{albumName}</h2>
				<ReviewRatingStars
					albumName={albumName}
					readOnly={true}
					rating={rating}
				/>
				<p className=''>{review}</p>
			</div>
		</div>
	);
}

ReviewedAlbumCard.propTypes = {
	albumName: PropTypes.string.isRequired,
	albumCoverURL: PropTypes.string,
	rating: PropTypes.number,
	review: PropTypes.string,
};
