import { useState, useEffect } from 'react';
import AlbumCard from '../components/AlbumCard.jsx';
import { useParams } from 'react-router-dom';
import spotifyClient from '../config/spotifyClient';
import HeaderDivider from '@/components/typography/HeaderDivider.js';

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
				<HeaderDivider
					text={`FOUND ${albumSearch.length} ALBUMS MATCHING "${searchInput.toUpperCase()}"`}
					className={'mb-4'}
				/>

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
