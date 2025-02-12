import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
// import { Button } from "@material-tailwind/react";
import DogList from './DogList';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function SearchPage({ addToFavorites }) {
	const [breeds, setBreeds] = useState([]);
	const [selectedBreed, setSelectedBreed] = useState('');
	const [age, setAge] = useState('');
	const [location, setLocation] = useState('');

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
					<TextField id="filled-basic" label="Age" variant="outlined" />
					<TextField id="filled-basic" label="ZIP Code" variant="outlined" />
					<Button variant="contained">Search</Button>
				</Box>

				{/* <Select
          className="mt-4 border p-2 rounded"
					label="Age"
          onChange={(e) => setSelectedBreed(e.target.value)}
          value={selectedBreed}
        >
          <option value="">All Breeds</option>
          {breeds.map((breed) => (
            <option key={breed} value={breed}>
              {breed}
            </option>
          ))}
        </Select> */}
			</FormControl>			
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