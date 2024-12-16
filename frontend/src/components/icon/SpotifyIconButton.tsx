import { FaSpotify } from 'react-icons/fa';

export default function SpotifyIconButton({
	spotifyURL,
}: {
	spotifyURL: string;
}) {
	return (
		<a
			href={spotifyURL}
			target='_blank'
			rel='noreferrer noopener'
			onClick={(e) => e.stopPropagation()}
		>
			<FaSpotify
				size={16}
				className='fill-neutral-500 hover:fill-white'
			/>
		</a>
	);
}
