import React from 'react';
import Layout from './pages/Layout';
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
						element={<Home />}
					/>
					<Route
						path='/search/:searchInput'
						element={<SearchResults />}
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
