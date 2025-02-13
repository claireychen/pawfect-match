import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';


function MatchPage({ favoriteDogs, open, onClose }) {

  const [match, setMatch] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMatch() {
      try {
        const matchResponse = await fetch('https://frontend-take-home-service.fetch.com/dogs/match', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(favoriteDogs.map(dog => dog.id)),
        });

        if (!matchResponse.ok) {
          throw new Error('Failed to get dog match');
        }

        const matchData = await matchResponse.json();
        const matchedDogId = matchData.match;

        // Fetch the matched dog's details
        const dogResponse = await fetch("https://frontend-take-home-service.fetch.com/dogs", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify([matchedDogId]),
        });

        if (!dogResponse.ok) {
          throw new Error("Failed to fetch matched dog details");
        }

        const dogData = await dogResponse.json();
        setMatch(dogData[0]);
      } catch (err) {
        setError(err.message);
      }
    }

		if (favoriteDogs.length > 0) {
      fetchMatch();
    }
  }, [favoriteDogs]);

  return (
		<Modal open={open} onClose={onClose}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 2, maxWidth: 400 }}>
        <h2 className="text-3xl font-bold text-center">My Best Match</h2>
        {match ? (
          <div className="text-center">
            <img src={match.img} alt={match.name} className="w-full h-48 object-cover rounded-md mt-4" />
            <h3 className="text-2xl font-bold mt-2">{match.name}</h3>
            <p className="text-lg">Breed: {match.breed}</p>
            <p className="text-lg">Age: {match.age}</p>
            <p className="text-lg">Location: {match.zip_code}</p>
          </div>
        ) : (
          <p>Loading your pawfect match...</p>
        )}
      </Box>
    </Modal>
  );
}

export default MatchPage;

MatchPage.propTypes = {
	favoriteDogs: PropTypes.func.isRequired,
	open: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
};