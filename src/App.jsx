import "./App.css";

import { RootLayout } from "./layouts/RootLayout";
import { Home } from "./pages/Home";

import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
} from "react-router-dom";

import { homeLoader } from "./loaders/homeLoader";
import { MovieShowInDepth } from "./pages/MovieShowInDepth";
import { movieShowInDepthLoader } from "./loaders/movieShowInDepthLoader";
import { Search } from "./pages/Search";
import { Movies } from "./pages/Movies";
import { TvSeries } from "./pages/TvSeries";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<RootLayout />}>
			<Route index loader={homeLoader} element={<Home />} />
			<Route
				path=":mediaType/:id"
				loader={movieShowInDepthLoader}
				element={<MovieShowInDepth />}
			/>
			<Route path="movie" element={<Movies />} loader={homeLoader} />
			<Route path="tv" element={<TvSeries />} loader={homeLoader} />
			<Route path="search" element={<Search />} />
		</Route>
	)
);

function App() {
	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}

export default App;
