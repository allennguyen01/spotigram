import React from 'react';
import NavBar from '../components/NavBar.jsx';
import { Outlet } from 'react-router-dom';

export default function Layout() {
	return (
		<div className='flex flex-col justify-center items-center font-inter'>
			<NavBar />
			<Outlet />
		</div>
	);
}
