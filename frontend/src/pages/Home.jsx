import React from 'react';
import { useEffect } from 'react';

export default function Home() {
	return (
		<div
			className='hero min-h-screen'
			style={{
				backgroundImage:
					'url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)',
			}}
		>
			<div className='hero-overlay bg-opacity-60'></div>
			<div className='hero-content text-neutral-content text-center'>
				<div className='max-w-md'>
					<p className='mb-5'>
						Track albums you&apos;ve listened to.
						<br />
						Save those you want to hear.
						<br />
						Tell your friends what&apos;s good.
					</p>
					<button className='btn btn-primary'>Get Started</button>
				</div>
			</div>
		</div>
	);
}
