import { BarLoader } from "react-spinners";

type SpinnerProps = {
	navigation: {
		state: string;
	};
};

export const Spinner = (props: SpinnerProps) => {
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
