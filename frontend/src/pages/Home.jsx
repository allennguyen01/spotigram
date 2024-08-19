import React, { useEffect } from 'react';
import supabase from '../config/supabaseClient';

export default function Home() {
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
		<div className='flex justify-center flex-col'>
			<p>Home</p>
		</div>
	);
}
