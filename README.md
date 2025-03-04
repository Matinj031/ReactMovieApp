# MovieFinder App

![MovieFinder App](public/hero.png)

A modern React application for discovering and exploring movies. Built with React 19, Vite, and Tailwind CSS, this app offers a sleek interface to search for movies, view trending titles, and explore film details.

## 🚀 Features

- **Movie Search**: Instantly search through thousands of movies with real-time results
- **Trending Movies**: Discover what's popular based on user search patterns
- **Responsive Design**: Enjoy a seamless experience across all devices
- **Lazy Loading**: Optimized image loading for better performance
- **Sort Options**: Organize movies by popularity or release date
- **Modern UI**: Clean, intuitive interface with smooth animations

## 🛠️ Technologies

- **Frontend**: React 19, TailwindCSS 4
- **Build Tool**: Vite 6
- **Backend**: Appwrite for data storage and retrieval
- **API**: The Movie Database (TMDB) API
- **Performance**: React Lazy Load Image Component
- **State Management**: React Hooks (useState, useEffect)

## 🔧 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Matinj031/React-MovieApp.git
   cd React-MovieApp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory with your API keys:
   ```
   VITE_TMDB_API_KEY=your_tmdb_api_key
   VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id
   VITE_APPWRITE_DATABASE_ID=your_appwrite_database_id
   VITE_APPWRITE_COLLECTION_ID=your_appwrite_collection_id
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## 📱 Usage

- **Search Movies**: Type in the search bar to find movies
- **Sort Results**: Click on the sort dropdown to organize results
- **View Trending**: See what movies are trending based on user searches
- **Explore Details**: View ratings, release dates, and languages for each movie

## 🔜 Future Enhancements

- 3D movie poster displays with Three.js
- Smooth scrolling with Lenis
- Engaging animations with GSAP and ScrollTrigger
- Detailed movie view with additional information
- User authentication for personalized recommendations

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for their comprehensive API
- [Appwrite](https://appwrite.io/) for backend services
- [React](https://react.dev/) and [Vite](https://vitejs.dev/) for the amazing development experience
