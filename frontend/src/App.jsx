import React from 'react';
import Layout from './pages/Layout';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<Home />} />
					<Route path='/search' element={<SearchResults />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
