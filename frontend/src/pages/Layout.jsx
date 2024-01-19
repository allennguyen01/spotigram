import React from 'react';
import NavBar from '../components/NavBar.jsx';
import { Outlet } from 'react-router-dom';

export default function Layout() {
	return (
		<div className='flex justify-center flex-col'>
			<NavBar />
			<Outlet />
		</div>
	);
}
