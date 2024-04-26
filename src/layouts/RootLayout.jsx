import { Outlet } from "react-router-dom";

export const RootLayout = () => {
	return (
		<div>
			<header>
				<nav>
					<p></p>
				</nav>
			</header>

			<main>
				<Outlet />
			</main>
		</div>
	);
};
