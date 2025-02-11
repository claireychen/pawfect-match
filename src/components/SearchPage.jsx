import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button } from "@material-tailwind/react";
import DogList from './DogList';

function SearchPage({ addToFavorites }) {
	const [breeds, setBreeds] = useState([]);
	const [isBreedVisible, setIsBreedVisible] = useState(false);
	const [selectedBreed, setSelectedBreed] = useState('');

	useEffect(() => {
		async function fetchBreeds() {
			try {
				const response = await fetch(`https://frontend-take-home-service.fetch.com/dogs/breeds`, {
					method: "GET",
					credentials: "include", 
				})
	
				if (!response.ok) {
					throw new Error('Failed to fetch dog breed')
				}

				const data = await response.json();
				// console.log("**** data: ", data)
				setBreeds(data);
			} catch (error) {
				console.error("Error in fetching dogs: ", error)
			}
		}

		fetchBreeds();
	}, []);

	return (
		<header className="bg-pink shadow-sm">
		<div className="text-center">
			<h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">Find Your Paw Friend</h1>
			<div className="flex w-max items-end gap-4">
				<Button variant="outlined" onClick={() => setIsBreedVisible(!isBreedVisible)}>{isBreedVisible ? "Hide Breeds" : "Click to see dog breeds"}</Button>
			</div>

			{isBreedVisible && (
        <select
          className="mt-4 border p-2 rounded"
          onChange={(e) => setSelectedBreed(e.target.value)}
          value={selectedBreed}
        >
          <option value="">All Breeds</option>
          {breeds.map((breed) => (
            <option key={breed} value={breed}>
              {breed}
            </option>
          ))}
        </select>
      )}
			<DogList selectedBreed={selectedBreed} addToFavorites={addToFavorites} />
			{/* <FilterBar /> */}
		</div>
		</header>
	)
}

SearchPage.propTypes = {
  addToFavorites: PropTypes.func.isRequired,
};

export default SearchPage;