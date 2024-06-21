import PropTypes from "prop-types";

import { BarLoader } from "react-spinners";

export const Spinner = (props) => {
	return (
		<>
			{props.navigation.state === "loading" && (
				<div className="loader-container">
					<div className="bar-loader">
						<BarLoader
							color={"aqua"}
							width={"100%"}
							height={8}
							speedMultiplier={1}
						/>
					</div>
					<div className="site-logo">
						<h1>
							<span className="retro">Retro</span>Flix
						</h1>
					</div>
				</div>
			)}
		</>
	);
};
Spinner.propTypes = {
	navigation: PropTypes.object,
};
