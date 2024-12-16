import { useEffect, useState } from 'react';
import spotifyClient from '../config/spotifyClient';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel';
import SpotifyIconButton from '@/components/icon/SpotifyIconButton';
import HeaderDivider from '@/components/typography/HeaderDivider';

type NewAlbumCards = {
	id: string;
	images: { url: string }[];
	name: string;
	artists: { name: string }[];
	release_date: string;
	external_urls: { spotify: string };
};

export default function Home() {
	const [newAlbums, setNewAlbums] = useState([]);

	useEffect(() => {
		async function getAlbums() {
			const response = await spotifyClient.get('/browse/new-releases?limit=20');
			setNewAlbums(response.data.albums.items);
		}
		getAlbums();
	}, []);

	return (
		<div className='p-4'>
			<HeaderDivider
				text='NEW ALBUM RELEASES'
				className='mx-3 mb-2'
			/>
			<Carousel
				className='w-full max-w-5xl'
				opts={{ slidesToScroll: 4 }}
			>
				<CarouselContent>
					{newAlbums.map((album: NewAlbumCards) => (
						<CarouselItem
							key={album.id}
							className='flex basis-1/4 flex-col items-center gap-2 py-1 text-center'
						>
							<img
								src={album.images[0].url}
								alt={album.name}
								className='box-border h-56 max-w-56 rounded transition duration-150 hover:cursor-pointer hover:shadow-white'
							/>
							<div className='flex max-w-56 flex-col'>
								<span className='inline-flex items-center gap-1 font-semibold'>
									{album.name}
									<SpotifyIconButton spotifyURL={album.external_urls.spotify} />
								</span>
								<p className='text-sm'>
									{album.artists.map((artist) => artist.name).join(', ')}
								</p>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
		</div>
	);
}
