import "./App.css";

import { RootLayout } from "./layouts/RootLayout";
import { Home } from "./pages/Home";

import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
} from "react-router-dom";

import { trendingGenreLoader } from "./loaders/trendingGenreLoader";
import { MovieShowInDepth } from "./pages/MovieShowInDepth";
import { movieShowInDepthLoader } from "./loaders/movieShowInDepthLoader";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<RootLayout />}>
			<Route index loader={trendingGenreLoader} element={<Home />} />
			<Route
				path=":mediaType/:id"
				loader={movieShowInDepthLoader}
				element={<MovieShowInDepth />}
			/>
			<Route
				path=":mediaType/:id/similar"
				loader={movieShowInDepthLoader}
				element={<MovieShowInDepth />}
			/>
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
