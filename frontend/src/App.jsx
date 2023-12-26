import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AlbumCard from './components/AlbumCard.jsx';
import SearchBox from './components/Searchbox.jsx';

const CLIENT_ID = '8715abaf5e9647dd8f0ad679270917f0';
const CLIENT_SECRET = '2588feebe46742a7961bac64f5cc1a4e';

function App() {
	const [searchInput, setSearchInput] = useState('');
	const [accessToken, setAccessToken] = useState('');
	const [albumSearch, setAlbumSearch] = useState([]);

	useEffect(() => {
		const headers = {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			auth: {
				username: CLIENT_ID,
				password: CLIENT_SECRET,
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
			.get(
				`https://api.spotify.com/v1/search?type=album&q=${searchInput}`,
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${accessToken}`,
					},
				},
			)
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

	return (
		<>
			<section className='navbar bg-zinc-900'>
				<div className='flex-1'>
					<a className='btn btn-ghost font-bold text-2xl text-white'>
						Musicboxd
					</a>
				</div>
				<SearchBox search={search} setSearchInput={setSearchInput} />
			</section>
			<div>
				{albumSearch.map((album, i) => {
					return <AlbumCard key={i} album={album} />;
				})}
			</div>
		</>
	);
}

export default App;
