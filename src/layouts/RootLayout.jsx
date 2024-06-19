import { Link, NavLink, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

export const RootLayout = () => {
	const [bgOpacity, setBgOpacity] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			const scrollTop = window.scrollY;
			const maxScroll = 500; // Adjust this value as needed
			const opacity = Math.min(scrollTop / maxScroll, 1);
			setBgOpacity(opacity);
		};

		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);
	return (
		<div>
			<header
				style={{ backgroundColor: `rgba(20, 20, 20, ${bgOpacity})` }}>
				<div className="header-wrapper">
					<div className="header-content">
						<div className="logo-container">
							<Link to={"/"}>
								<div className="site-logo">
									<h1>
										<span className="retro">Retro</span>Flix
									</h1>
								</div>
							</Link>
						</div>
						<nav className="nav-right">
							<NavLink to={"/"}>Home</NavLink>
							<NavLink to={"movies"}>Movies</NavLink>
							<NavLink to={"tv"}>TV Series</NavLink>
							<NavLink to={"search"}>Search</NavLink>
						</nav>
					</div>
				</div>
			</header>

			<main>
				<Outlet />
			</main>
		</div>
	);
};
