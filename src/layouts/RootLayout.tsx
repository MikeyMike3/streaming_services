import { Link, NavLink, Outlet } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";

export const RootLayout = () => {
	const [bgOpacity, setBgOpacity] = useState(0);
	const [menuOpen, setMenuOpen] = useState(false);

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

	const toggleMenu = () => {
		setMenuOpen(!menuOpen);
	};

	const handleClickOutside = useCallback(
		(event: MouseEvent | React.MouseEvent<Document>) => {
			const target = event.target as HTMLElement;
			if (menuOpen && !target.closest(".slide-menu")) {
				setMenuOpen(false);
			}
		},
		[menuOpen]
	);
	console.log();
	useEffect(() => {
		if (menuOpen) {
			document.addEventListener("click", handleClickOutside);
		} else {
			document.removeEventListener("click", handleClickOutside);
		}
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, [menuOpen, handleClickOutside]);
	return (
		<>
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
							<NavLink to={"movie"}>Movies</NavLink>
							<NavLink to={"tv"}>TV Series</NavLink>
							<NavLink to={"search"}>Search</NavLink>
						</nav>

						<div className="hamburger" onClick={toggleMenu}>
							&#9776;
						</div>
						<div className={`slide-menu ${menuOpen ? "open" : ""}`}>
							<div className="close-btn" onClick={toggleMenu}>
								&times;
							</div>
							<NavLink to={"/"} onClick={toggleMenu}>
								Home
							</NavLink>
							<NavLink to={"movie"} onClick={toggleMenu}>
								Movies
							</NavLink>
							<NavLink to={"tv"} onClick={toggleMenu}>
								TV Series
							</NavLink>
							<NavLink to={"search"} onClick={toggleMenu}>
								Search
							</NavLink>
						</div>
					</div>
				</div>
			</header>

			<main>
				<Outlet />
			</main>
		</>
	);
};
