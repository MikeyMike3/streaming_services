import { BarLoader } from "react-spinners";

type barLoaderProps = {
	color: string;
	width: number;
	height: number;
	speedMultiplier: number;
};

export const barLoader = (props: barLoaderProps) => {
	return (
		<>
			<BarLoader
				color={props.color}
				width={props.width}
				height={props.height}
				speedMultiplier={props.speedMultiplier}
			/>
		</>
	);
};
