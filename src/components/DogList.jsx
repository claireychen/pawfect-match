import { useState, useEffect } from 'react';
import { Button } from "@material-tailwind/react";

function DogList({ selectedBreed, addToFavorites }) {
	const [dogIds, setDogIds] = useState([]);
	const [dogs, setDogs] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalDogs, setTotalDogs] = useState(0);
  const pageSize = 10;

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
	}, [selectedBreed, sortOrder, currentPage])

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
        <h2>Available Dogs</h2>
        <Button variant="outlined" onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
          Sort by Breed ({sortOrder === "asc" ? "A-Z" : "Z-A"})
        </Button>
      </div>

			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {dogs.map((dog) => (
          <div key={dog.id} className="border rounded-lg p-4 shadow-md">
            <img src={dog.img} alt={dog.name} className="w-full h-48 object-cover rounded-md" />
            <h3 className="text-lg font-bold mt-2">{dog.name}</h3>
            <p>Breed: {dog.breed}</p>
            <p>Age: {dog.age}</p>
            <p>Location: {dog.zip_code}</p>
            <Button variant="contained" onClick={() => addToFavorites(dog)}>
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

export default DogList;