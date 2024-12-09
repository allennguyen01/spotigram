import ReviewRatingStars from './ReviewRatingStars';

type ReviewedAlbumCardProps = {
	albumName: string;
	albumCoverURL: string;
	albumYear: number;
	createDate: Date;
	rating: number;
	review: string;
};

export default function ReviewedAlbumCard({
	albumName,
	albumCoverURL,
	albumYear,
	createDate,
	rating,
	review,
}: ReviewedAlbumCardProps) {
	return (
		<div className='card card-side gap-4 rounded-none border-b-[1px] border-neutral-600 pb-4'>
			<figure className='flex-none self-start'>
				<img
					src={albumCoverURL}
					alt={`${albumName} album cover`}
					className='size-28 rounded-sm'
				/>
			</figure>
			<div className='card-body overflow-hidden text-ellipsis p-0'>
				<h2 className='card-title items-baseline font-semibold text-white'>
					{albumName}
					<span className='font-sans text-lg font-thin text-neutral-content'>
						{albumYear}
					</span>
				</h2>

				<div className='flex items-center gap-2'>
					<ReviewRatingStars
						albumName={albumName}
						readOnly={true}
						rating={rating}
					/>
					<p className='text-sm'>
						Reviewed on{' '}
						{new Date(createDate).toLocaleDateString(undefined, {
							year: 'numeric',
							month: 'short',
							day: 'numeric',
						})}
					</p>
				</div>
				<p className=''>{review}</p>
			</div>
		</div>
	);
}
