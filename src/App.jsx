import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupPage from './components/SignupPage';
import SearchPage from './components/SearchPage';
import FavoritesPage from './components/FavoritesPage';
import MatchPage from './components/MatchPage';
// import './App.css'

function App() {

  return (
    <Router>
			<div>  
				<Routes>
					<Route path="/" element={<SignupPage />} />
					<Route path="/search" element={<SearchPage />} />
					{/* <Route path="/favorites" element={<FavoritesPage />} /> */}
					{/* <Route path="/match" element={<MatchPage />} /> */}
				</Routes>
			</div>
			
		
    </Router>
  )
}

export default App
