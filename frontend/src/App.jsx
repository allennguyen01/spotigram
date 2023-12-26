import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AlbumCard from './components/AlbumCard.jsx';
import NavBar from './components/NavBar.jsx';

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
			<NavBar search={search} setSearchInput={setSearchInput} />
			<div>
				{albumSearch.map((album, i) => {
					return <AlbumCard key={i} album={album} />;
				})}
			</div>
		</>
	);
}

export default App;
