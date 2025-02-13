# Pawfect Match 🐾
The ultimate dog search application designed for dog lovers looking to find their pawfect match! 
- Browse through a vast collection of adorable dogs from shelters, filter by breed, and save your favorites. 
- With a fun and interactive matching feature, Pawfect Match helps you discover your ideal furry companion. Whether you're ready to adopt or just love looking at cute dog pictures, Pawfect Match is the place to be! 

Start your search today and bring home a new best friend! 🐶❤️


### Development Setup
1. Clone and install dependencies:
```
git clone https://github.com/your-username/pawfect-match.git
npm install
```

2. Start development servers:
```
npm run dev
-- go to -> http://localhost:5173/
```


### API Documentation

#### Dog Endpoints

```
POST /auth/login
- Authenticate user and receive an auth cookie

POST /auth/logout
- Log the user out and invalidate their session

GET /dogs/breeds
- Fetch all possible breed names

GET /dogs/search
- Fetch a list of dogs based on filters (e.g., breed)

POST /dogs
- Fetch details about specific dogs given an array of dog IDs

POST /dogs/match
- Find the best match for adoption from an array of favorite dog IDs
```

### Future Enhancements
- Add more filters for more accurate search results
- Integrate AI model for personalized options
- Enhanced analytics and performance improvement