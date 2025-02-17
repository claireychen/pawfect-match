import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button } from "@material-tailwind/react";

function DogList({ selectedBreed, ageMin, ageMax, location, addToFavorites }) {
	const [dogIds, setDogIds] = useState([]);
	const [dogs, setDogs] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalDogs, setTotalDogs] = useState(0);
	const [zipCodes, setZipCodes] = useState([]);
  const pageSize = 60;

	// async function fetchLocationDetails(zip) {
	// 	console.log("fetchLocationDetails called with ZIP:", zip);
	
	// 	if (!zip || typeof zip !== "string") {
	// 		console.error("Invalid ZIP passed to fetchLocationDetails:", zip);
	// 		return;
	// 	}
	
	// 	try {
	// 		const response = await fetch(`https://frontend-take-home-service.fetch.com/locations`, {
	// 			method: "POST",
	// 			credentials: "include",
	// 			headers: {
	// 				"Content-Type": "application/json",
	// 				"Accept": "application/json"
	// 			},
	// 			body: JSON.stringify([zip]),
	// 		});
	
	// 		console.log("Response Status: ", response.status); 
	
	// 		if (!response.ok) {
	// 			throw new Error("Failed to fetch location details");
	// 		}
	
	// 		const data = await response.json();
	// 		console.log("Location Data: ", data);
	
	// 		if (data.length > 0) {
	// 			console.log("Setting ZipCodes: ", data[0].zip_code);
	// 			// Set as an array
	// 			setZipCodes([data[0].zip_code]);
	// 		} else {
	// 			setZipCodes([]);
	// 		}
	
	// 	} catch (error) {
	// 		console.error("Error in fetching location details: ", error);
	// 	}
	// }
	
	// useEffect(() => {
	// 	console.log("Location state changed: ", location);
		
	// 	if (location) {
	// 		console.log("Fetching location details for:", location);
	// 		fetchLocationDetails(location);
	// 	}
	// }, [location]);

	useEffect(() => {
		async function fetchDogIds() {
      try {
        const queryParams = new URLSearchParams({
          size: pageSize,
          from: (currentPage - 1) * pageSize,
          sort: `breed:${sortOrder}`,
        });

        if (selectedBreed) {
          queryParams.append("breeds", selectedBreed);
        }

				if (ageMin) {
					queryParams.append("ageMin", ageMin);
				}
				if (ageMax) {
					queryParams.append("ageMax", ageMax);
				}
				// if (zipCodes.length > 0) {
				// 	queryParams.append("zipCodes", zipCodes.join(","));
				// }

				if (location && /^[0-9]{5}$/.test(location)) { 
          // Ensure location is a 5-digit ZIP code
          queryParams.append("zipCodes", location);
        }

				const response = await fetch(
          `https://frontend-take-home-service.fetch.com/dogs/search?${queryParams.toString()}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch dog IDs");
        }

        const data = await response.json();
        setDogIds(data.resultIds);
        setTotalDogs(data.total);
      } catch (error) {
        console.error("Error fetching dog IDs:", error);
      }
    }

    fetchDogIds();
	}, [selectedBreed, ageMin, ageMax, zipCodes, sortOrder, currentPage])

	useEffect(() => {
		async function fetchDogDetails() {
			if (!dogIds || dogIds.length === 0) return; 

			try {
				const response = await fetch(`https://frontend-take-home-service.fetch.com/dogs`, {
					method: "POST",
					credentials: "include",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(dogIds),
				})

				if (!response.ok) {
					throw new Error('Failed to fetch dog details')
				}
				const data = await response.json();
				setDogs(data);
			} catch (error) {
				console.error("Error in fetching dog details: ", error);
			}
		}
		
		fetchDogDetails();
	}, [dogIds])

	return (
		<div>
			<div className="flex justify-between items-center">
        {/* <h2 className="text-5xl font-semibold tracking-tight text-balance text-gray-200 sm:text-7sm">Available Dogs</h2> */}
        <Button variant="outlined" onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
          Sort by Breed ({sortOrder === "asc" ? "A-Z" : "Z-A"})
        </Button>
      </div>

			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {dogs.map((dog) => (
          <div key={dog.id} className="border rounded-lg p-4 shadow-md">
            <img src={dog.img} alt={dog.name} className="w-full h-72 object-cover rounded-md" />
            <h3 className="text-lg font-bold mt-2">{dog.name}</h3>
            <p>Breed: {dog.breed}</p>
            <p>Age: {dog.age}</p>
            <p>Location: {dog.zip_code}</p>
            <Button variant="contained" color="blue" onClick={() => addToFavorites(dog)}>
              ❤️ Add to Favorites
            </Button>
          </div>
        ))}	
      </div>

			{/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <Button
          variant="outlined"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span>
          Page {currentPage} of {Math.ceil(totalDogs / pageSize)}
        </span>
        <Button
          variant="outlined"
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage * pageSize >= totalDogs}
        >
          Next
        </Button>
      </div>
		</div>
	)
}

DogList.propTypes = {
	selectedBreed: PropTypes.string,  //array.isRequired,
	ageMin: PropTypes.string,
	ageMax: PropTypes.string,
	location: PropTypes.string,
	addToFavorites: PropTypes.func.isRequired,
};

export default DogList;