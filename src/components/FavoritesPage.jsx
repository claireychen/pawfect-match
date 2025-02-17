import PropTypes from "prop-types";
import { Button } from "@material-tailwind/react";
import { useState } from 'react';
import MatchModal from "./MatchModal";

function FavoritesPage({ favorites, setFavorites, removeFromFavorites }) {
	const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRemove = (dogId) => {
    removeFromFavorites(dogId);
    const updatedFavorites = favorites.filter(dog => dog.id !== dogId);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
		<header className="bg-pink shadow-sm">
			<div className="text-center">
				<h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">🐾 Your Favorite Dogs</h1>
				{favorites.length === 0 ? (
					<p>No favorites found. Start searching your paw friends!</p>
				) : (
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
						{favorites.map((dog) => (
							<div key={dog.id} className="border rounded-lg p-4 shadow-md">
								<img
									src={dog.img}
									alt={dog.name}
									className="w-full h-48 object-cover rounded-md"
								/>
								<h3 className="text-lg font-bold mt-2">{dog.name}</h3>
								<p>Breed: {dog.breed}</p>
								<p>Age: {dog.age}</p>
								<p>Location: {dog.zip_code}</p>

								<Button variant="destructive" onClick={() => handleRemove(dog.id)}>
									❌ Remove
								</Button>
							</div>
						))}
						<MatchModal
							favoriteDogs={favorites} 
							open={isModalOpen} 
							onClose={() => setIsModalOpen(false)} 
						/>
						<Button
							variant="default"
							className="mt-4 w-full"
							onClick={() => setIsModalOpen(true)}
						>
							🐶 Find My Match
						</Button>
					</div>
				)}
			</div>
		</header>
  );
}

FavoritesPage.propTypes = {
  favorites: PropTypes.array.isRequired,
	setFavorites: PropTypes.func.isRequired,
  removeFromFavorites: PropTypes.func.isRequired,
};


export default FavoritesPage;
