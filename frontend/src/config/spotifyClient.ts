import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';
const SPOTIFY_CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

async function getAccessToken() {
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

	const response = await axios.post(
		'https://accounts.spotify.com/api/token',
		data,
		headers,
	);
	return response.data.access_token;
}

async function createSpotifyClient() {
	const accessToken = await getAccessToken();

	const instance = axios.create({
		baseURL: 'https://api.spotify.com/v1/',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`,
		},
	});

	return instance;
}

function useAlbum(id: string): UseQueryResult<SpotifyApi.SingleAlbumResponse> {
	function getAlbum() {
		return spotifyClient.get(`albums/${id}`).then((res) => res.data);
	}

	return useQuery({
		queryKey: ['album', id],
		queryFn: getAlbum,
	});
}

function useAlbumGenres(
	album: SpotifyApi.SingleAlbumResponse,
): UseQueryResult<string[]> {
	function getAlbumGenres(album: SpotifyApi.SingleAlbumResponse) {
		const artistsList = album.artists.map((artist) => artist.id).join(',');

		const artistGenres = spotifyClient
			.get(`artists?ids=${artistsList}`)
			.then((res) =>
				res.data.artists
					.map((artist: SpotifyApi.ArtistObjectFull) => artist.genres)
					.flat()
					.join(', '),
			);

		return artistGenres;
	}

	return useQuery({
		queryKey: ['albumGenres', album.id],
		queryFn: () => {
			return getAlbumGenres(album);
		},
	});
}

const spotifyClient = await createSpotifyClient();
export default spotifyClient;
export { useAlbum, useAlbumGenres };
