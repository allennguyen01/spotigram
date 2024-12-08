import React from 'react';
import Layout from './pages/Layout';
import Login from './pages/Login';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import Reviews from './pages/Reviews';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path='/'
					element={<Layout />}
				>
					<Route
						index
						element={<Login />}
					/>
					<Route
						path='/search/:searchInput'
						element={<SearchResults />}
					/>
					<Route
						path='/home'
						element={<Home />}
					/>
					<Route
						path='/reviews'
						element={<Reviews />}
					/>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
