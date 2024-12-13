import { useState, useEffect } from 'react';
import AlbumCard from '../components/AlbumCard.jsx';
import { useParams } from 'react-router-dom';
import spotifyClient from '../config/spotifyClient';

export default function SearchResults() {
	const { searchInput = '' } = useParams();
	const [albumSearch, setAlbumSearch] = useState([]);

	useEffect(() => {
		async function search() {
			try {
				const res = await spotifyClient.get(
					`https://api.spotify.com/v1/search?type=album&q=${searchInput}`,
				);
				const albums = res.data.albums.items.filter(
					(item: { album_type: string }) => item.album_type === 'album',
				);
				setAlbumSearch(albums);
			} catch (error) {
				console.error(error);
			}
		}

		search();
	}, [searchInput]);

	return (
		<div className='flex flex-col items-center justify-center'>
			<div className='w-[1024px]'>
				<p className='mt-4'>
					FOUND {albumSearch.length} ALBUMS MATCHING &quot;
					{searchInput.toUpperCase()}&quot;
				</p>

				<div className='divider mb-4 mt-0 h-2 before:bg-neutral-600 after:bg-neutral-600'></div>

				<div className='flex flex-col gap-4'>
					{albumSearch.map((album, i) => {
						return (
							<AlbumCard
								key={i}
								album={album}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
}
