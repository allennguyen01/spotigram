import { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function NavBar() {
	return (
		<section className='navbar justify-center bg-zinc-900'>
			<div className='flex w-[1024px] items-center justify-between'>
				<NavLink to='/'>
					<button className='btn h-full gap-4 bg-transparent'>
						<img
							src='../../public/logo.svg'
							className='h-10'
						/>
						<p className='text-3xl font-bold text-white'>Jukeboxd</p>
					</button>
				</NavLink>
				<div className='flex items-center gap-6'>
					<SignInDialog />
					<NavLink
						to='/albums'
						className='text-sm font-semibold text-neutral-300 hover:text-white'
					>
						ALBUMS
					</NavLink>
					<NavLink
						to='/reviews'
						className='text-sm font-semibold text-neutral-300 hover:text-white'
					>
						REVIEWS
					</NavLink>
					<SearchBox />
				</div>
			</div>
		</section>
	);
}

function SearchBox() {
	const [searchInput, setSearchInput] = useState('');
	const navigate = useNavigate();

	const handleSearch = () => {
		navigate(`/search/${searchInput}`);
	};

	function performSearch() {
		setSearchInput(
			(document.getElementById('search-input') as HTMLInputElement).value,
		);
		handleSearch();
	}

	return (
		<div className='join rounded-full'>
			<input
				id='search-input'
				type='text'
				className='input join-item input-sm w-24 focus:bg-white focus:text-black md:w-auto'
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						performSearch();
					}
				}}
				onChange={(e) => setSearchInput(e.target.value)}
			/>
			<button
				className='btn join-item btn-sm border-0 focus:bg-white'
				onClick={() => {
					performSearch();
				}}
			>
				<FaMagnifyingGlass />
			</button>
		</div>
	);
}

function SignInDialog() {
	const inputs = [
		{
			label: 'Email',
			type: 'email',
			id: 'email',
		},
		{
			label: 'Password',
			type: 'password',
			id: 'password',
		},
	];

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className='p-0 text-neutral-300 hover:text-white'>
					SIGN IN
				</Button>
			</DialogTrigger>
			<DialogContent className='border-0 bg-slate-700 sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle className='font-light'>SIGN IN TO JUKEBOXD</DialogTitle>
				</DialogHeader>
				<div className='grid gap-6 py-4'>
					{inputs.map(({ label, type, id }) => (
						<div className='flex flex-col gap-2'>
							<Label
								htmlFor={id}
								className='font-normal text-white'
							>
								{label}
							</Label>
							<Input
								id={id}
								type={type}
								className='focus:border-1 col-span-3 rounded-sm bg-slate-300 text-slate-600 focus:bg-white focus:text-black'
							/>
						</div>
					))}
				</div>
				<DialogFooter>
					<Button
						type='submit'
						className='bg-primary-600 hover:bg-primary-800 h-8 rounded-sm py-2 font-semibold'
					>
						SIGN IN
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
