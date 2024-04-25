import "./App.css";

import { RootLayout } from "./layouts/RootLayout";
import { Home } from "./pages/Home";

import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
} from "react-router-dom";
import { trendingGenreLoader } from "./pages/Trending";
import {
	MovieShowInDepth,
	movieShowInDepthLoader,
} from "./pages/MovieShowInDepth";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<RootLayout />}>
			<Route index loader={trendingGenreLoader} element={<Home />} />
			<Route
				path=":mediaType/:id"
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
