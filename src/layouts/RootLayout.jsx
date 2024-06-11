import { NavLink, Outlet } from "react-router-dom";

export const RootLayout = () => {
	return (
		<div>
			<div className="wrapper">
				<header>
					<nav>
						<NavLink to={"/"}>Home</NavLink>
						<NavLink to={"search"}>Search</NavLink>
					</nav>
				</header>

				<main>
					<Outlet />
				</main>
			</div>
		</div>
	);
};
