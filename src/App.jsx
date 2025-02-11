import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignupPage from './components/SignupPage';
import SearchPage from './components/SearchPage';
import FavoritesPage from './components/FavoritesPage';
import MatchPage from './components/MatchPage';
import ResponsiveAppBar from './components/AppBar';

function App() {
	// const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [favorites, setFavorites] = useState([]);

  const addToFavorites = (dog) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.some((fav) => fav.id === dog.id)) {
        return prevFavorites; // Prevent duplicates
      }
      return [...prevFavorites, dog];
    });
  };

	function removeFromFavorites(dogId) {
    setFavorites(favorites.filter((dog) => dog.id !== dogId));
  }

  return (
    <Router>
			<div>  
				<Routes>
					{/* <Route path="/" element={isAuthenticated ? <Navigate to="/search" /> : <SignupPage setIsAuthenticated={setIsAuthenticated} />} /> */}
					{/* <Route path="/search" element={isAuthenticated ? <SearchPage /> : <Navigate to="/" />} /> */}

					<Route path="/" element={<SignupPage />} />
					<Route path="/search" element={<ResponsiveAppBar favorites={favorites} addToFavorites={addToFavorites} />} />
					<Route path="/favorites" element={<FavoritesPage favorites={favorites} removeFromFavorites={removeFromFavorites} />} />

					{/* <Route path="/search" element={<SearchPage />} /> */}
					{/* <Route path="/favorites" element={<FavoritesPage />} /> */}
					{/* <Route path="/match" element={<MatchPage />} /> */}
				</Routes>
			</div>
			
		
    </Router>
  )
}

export default App
