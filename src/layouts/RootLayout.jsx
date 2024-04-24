import { Outlet } from "react-router-dom";

export const RootLayout = () => {
	return (
		<div>
			<header>
				<nav></nav>
			</header>

			<main>
				<Outlet />
			</main>
		</div>
	);
};
