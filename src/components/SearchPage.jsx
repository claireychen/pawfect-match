import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import DogList from './DogList';
import { Box, Button, FormControl, TextField } from '@mui/material';

function SearchPage({ addToFavorites }) {
	const [breeds, setBreeds] = useState([]);
	const [selectedBreed, setSelectedBreed] = useState('');
	const [ageMin, setAgeMin] = useState('');
	const [ageMax, setAgeMax] = useState('');
	const [zipCode, setZipCode] = useState('');
	const [dogIds, setDogIds] = useState([]);

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
				setBreeds(data);
			} catch (error) {
				console.error("Error in fetching dogs: ", error)
			}
		}

		fetchBreeds();
	}, []);

	const handleSearch = async () => {

		try {
			const queryParams = new URLSearchParams();

			if (selectedBreed) {
				queryParams.append('breeds', selectedBreed);
			}

			if (ageMin) {
				queryParams.append('ageMin', ageMin);
			}

			if (ageMax) {
				queryParams.append('ageMax', ageMax);
			}

			if (zipCode) {
				queryParams.append('zipCodes', zipCode);
			}

			const queryString = queryParams.toString();
			const url = `https://frontend-take-home-service.fetch.com/dogs/search?${queryString}`;

			const response = await fetch(url, {
				method: "GET",
				credentials: "include",
			})
			console.log("aaaaaa response: ", response)
			if (!response.ok) {
				throw new Error("Failed to fetch dog data");
			}

			const data = await response.json();
			setDogIds(data.resultIds);
			console.log("aaaaaa data: ", data)

		} catch (error) {
			console.error("Error in fetching dog data: ", error)
		}
	}

	return (
		<header className="bg-pink shadow-sm">
		<div className="text-center pt-20" >
			<h1 className="text-5xl font-extrabold tracking-tight text-transparent sm:text-7xl mt-12 mb-8 bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text">Find Your Paw Friend</h1>
			<div>
			<FormControl>
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
				<Box
					component="form"
					sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
					noValidate
					autoComplete="off"
				>
					<TextField type="number" id="min-age" label="Min Age" variant="outlined" value={ageMin} onChange={(e) => setAgeMin(e.target.value)} />
					<TextField type="number" id="max-age" label="Max Age" variant="outlined" value={ageMax} onChange={(e) => setAgeMax(e.target.value)} />
					{/* <TextField type="text" id="zip-code" label="ZIP Code" variant="outlined" value={zipCode} onChange={(e) => setZipCode(e.target.value)} /> */}
					<Button size="large" variant="contained" onClick={handleSearch}>Search</Button>
				</Box>
			</FormControl>			
			
			<DogList 
				dogIds={dogIds}
				selectedBreed={selectedBreed} 
				ageMin={ageMin}
        ageMax={ageMax}
        location={location} 
				addToFavorites={addToFavorites} 
			/>
			</div>
		</div>
		</header>
	)
}

SearchPage.propTypes = {
  addToFavorites: PropTypes.func.isRequired,
};

export default SearchPage;