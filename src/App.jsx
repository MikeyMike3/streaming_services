import "./App.css";

import { RootLayout } from "./layouts/RootLayout";
import { Home } from "./pages/Home";

import {
	Route,
	// Link,
	// NavLink,
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
} from "react-router-dom";
import { trendingGenreLoader } from "./pages/Trending";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<RootLayout />}>
			<Route index loader={trendingGenreLoader} element={<Home />} />
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
