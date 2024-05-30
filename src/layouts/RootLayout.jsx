import { Link, Outlet } from "react-router-dom";

export const RootLayout = () => {
	return (
		<div>
			<header>
				<nav>
					<Link to={"/"}>Home</Link>
					<Link to={"search"}>Search</Link>
				</nav>
			</header>

			<main>
				<Outlet />
			</main>
		</div>
	);
};
