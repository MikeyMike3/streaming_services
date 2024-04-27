import { BarLoader } from "react-spinners";

export const barLoader = (props) => {
	return (
		<div>
			<BarLoader
				color={props.color}
				width={props.width}
				height={props.height}
				speedMultiplier={props.speedMultiplier}
			/>
		</div>
	);
};
