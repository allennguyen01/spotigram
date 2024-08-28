import React, { useEffect } from 'react';
import supabase from '../config/supabaseClient';
import ReviewedAlbumCard from '../components/ReviewedAlbumCard';

export default function Reviews() {
	const [reviewedAlbums, setReviewedAlbums] = React.useState([]);

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
		<div className='flex justify-center items-center flex-col p-4'>
			<div className='flex flex-col w-[1024px] gap-4'>
				{reviewedAlbums.map((album) => (
					<ReviewedAlbumCard
						key={album.id}
						albumName={album.album_name}
						albumCoverURL={album.album_cover_url}
						albumYear={album.year}
						createDate={album.created_at}
						rating={album.rating}
						review={album.review}
					/>
				))}
			</div>
		</div>
	);
}
