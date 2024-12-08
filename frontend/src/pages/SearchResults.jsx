import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AlbumCard from '../components/AlbumCard.jsx';
import { useParams } from 'react-router-dom';

const SPOTIFY_CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

export default function SearchResults() {
	const { searchInput } = useParams();

	const [accessToken, setAccessToken] = useState('');
	const [albumSearch, setAlbumSearch] = useState([]);

	useEffect(() => {
		const headers = {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			auth: {
				username: SPOTIFY_CLIENT_ID,
				password: SPOTIFY_CLIENT_SECRET,
			},
		};

		const data = {
			grant_type: 'client_credentials',
		};

		axios
			.post('https://accounts.spotify.com/api/token', data, headers)
			.then((response) => {
				setAccessToken(response.data.access_token);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	function search() {
		console.log(`Searching ${searchInput}`);

		axios
			.get(`https://api.spotify.com/v1/search?type=album&q=${searchInput}`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${accessToken}`,
				},
			})
			.then((response) => {
				let albums = response.data.albums.items.filter(
					(item) => item.album_type === 'album',
				);
				setAlbumSearch(albums);
			})
			.catch((error) => {
				console.error(error);
			});
	}

	useEffect(search, [searchInput, accessToken]);

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
