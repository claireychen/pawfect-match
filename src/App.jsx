import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupPage from './components/SignupPage';
import FavoritesPage from './components/FavoritesPage';
import MatchModal from './components/MatchModal';
import ResponsiveAppBar from './components/AppBar';

function App() {

	const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (dog) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.some((fav) => fav.id === dog.id)) {
        return prevFavorites; // Prevent duplicates
      }
      return [...prevFavorites, dog];
    });
  };

	const removeFromFavorites = (dogId) => {
    setFavorites((prevFavorites) => prevFavorites.filter((dog) => dog.id !== dogId));
  };

  return (
    <Router>
			<div>  
				<Routes>
					<Route path="/" element={<SignupPage />} />
					<Route path="/search" element={<ResponsiveAppBar favorites={favorites} setFavorites={setFavorites} addToFavorites={addToFavorites} removeFromFavorites={removeFromFavorites} />} />
					<Route path="/favorites" element={<FavoritesPage favorites={favorites} setFavorites={setFavorites} removeFromFavorites={removeFromFavorites} />} />
					<Route path="/match" element={<MatchModal />} />
				</Routes>
			</div>
			
		
    </Router>
  )
}

export default App
