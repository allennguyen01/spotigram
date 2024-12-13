import { useEffect, useState } from 'react';
import spotifyClient from '../config/spotifyClient';

type NewAlbumCards = {
	id: string;
	images: { url: string }[];
	name: string;
	artists: { name: string }[];
	release_date: string;
};

export default function Home() {
	const [newAlbums, setNewAlbums] = useState([]);

	useEffect(() => {
		async function getAlbums() {
			const response = await spotifyClient.get('/browse/new-releases?limit=12');
			setNewAlbums(response.data.albums.items);
		}
		getAlbums();
	}, []);

	return (
		<div>
			{newAlbums.map((album: NewAlbumCards) => (
				<div key={album.id}>
					<img
						src={album.images[0].url}
						alt={album.name}
					/>
					<p>{album.name}</p>
					<p>{album.artists.map((artist) => artist.name).join(', ')}</p>
					<p>{album.release_date}</p>
				</div>
			))}
		</div>
	);
}
