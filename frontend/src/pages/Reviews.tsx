import React, { useEffect } from 'react';
import supabase from '../config/supabaseClient';
import ReviewedAlbumCard from '../components/ReviewedAlbumCard';

type AlbumReview = {
	id: string;
	created_at: Date;
	rating: number;
	review: string;
	album_name: string;
	album_cover_url: string;
	year: number;
};

export default function Reviews() {
	const [reviewedAlbums, setReviewedAlbums] = React.useState<AlbumReview[]>([]);

	useEffect(() => {
		getReviewedAlbums();
	}, []);

	async function getReviewedAlbums() {
		const { data, error } = await supabase.from('reviews').select();
		if (error) {
			console.error('Error fetching reviewed albums:', error);
			setReviewedAlbums([]);
		}

		if (data) {
			setReviewedAlbums(data);
		}
	}

	return (
		<div className='flex flex-col items-center justify-center p-4'>
			<div className='flex w-[1024px] flex-col gap-4'>
				{reviewedAlbums.map((ar: AlbumReview) => (
					<ReviewedAlbumCard
						key={ar.id}
						albumName={ar.album_name}
						albumCoverURL={ar.album_cover_url}
						albumYear={ar.year}
						createDate={ar.created_at}
						rating={ar.rating}
						review={ar.review}
					/>
				))}
			</div>
		</div>
	);
}
