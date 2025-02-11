import PropTypes from "prop-types";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

function FavoritesPage({ favorites, removeFromFavorites }) {
  const navigate = useNavigate();

  return (
    <div>

      <h1>🐾 Your Favorite Dogs</h1>

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

              <Button variant="destructive" onClick={() => removeFromFavorites(dog.id)}>
                ❌ Remove
              </Button>
            </div>
          ))}
          <Button
            variant="default"
            className="mt-4 w-full"
            onClick={() => navigate("/match", { state: { favoriteDogs: favorites }})}
          >
            🐶 Find My Match
          </Button>
        </div>
      )}
    </div>
  );
}

FavoritesPage.propTypes = {
  favorites: PropTypes.array.isRequired,
  removeFromFavorites: PropTypes.func.isRequired,
};


export default FavoritesPage;
