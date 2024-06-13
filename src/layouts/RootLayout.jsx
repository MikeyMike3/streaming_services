import { Link, NavLink, Outlet } from "react-router-dom";

export const RootLayout = () => {
	return (
		<div>
			<header>
				<div className="wrapper">
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
