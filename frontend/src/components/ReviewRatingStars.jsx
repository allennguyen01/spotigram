import PropTypes from 'prop-types';

export default function ReviewRatingStars({
	albumName,
	rating,
	readOnly = false,
}) {
	const ratingValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

	return (
		<div className='flex flex-col gap-1 py-2'>
			{!readOnly && <p className='font-normal'>Rating</p>}
			<div className='rating rating-md rating-half'>
				{ratingValues.map((value) => (
					<input
						key={value}
						type='radio'
						name={`rating-10-${albumName}`}
						disabled={readOnly}
						className={`mask mask-star-2 bg-green-500 
							${readOnly && value > rating ? 'bg-opacity-20' : ''}
              ${value % 2 === 1 ? 'mask-half-1' : 'mask-half-2'}
              ${readOnly ? 'cursor-auto' : ''}`}
						value={value}
					/>
				))}
			</div>
		</div>
	);
}

ReviewRatingStars.propTypes = {
	albumName: PropTypes.string,
	rating: PropTypes.number,
	readOnly: PropTypes.bool,
};
