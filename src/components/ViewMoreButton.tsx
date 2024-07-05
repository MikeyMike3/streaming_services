import PropTypes from "prop-types";

import { ViewMoreClipLoader } from "../spinners/ViewMoreClipLoader";

type ViewMoreButtonProps = {
	isLoading: boolean;
	totalPages: number | null;
	currentPage: number | null;
	handleClick: () => Promise<void>;
	handleClickError: boolean;
};

export const ViewMoreButton = (props: ViewMoreButtonProps) => {
	return (
		<>
			{!props.handleClickError &&
				(props.isLoading ? (
					<div className="view-more-button-loader-container">
						<ViewMoreClipLoader />
					</div>
				) : props.totalPages !== props.currentPage ? (
					<div className="view-more-btn-container">
						<button
							className="view-more-btn view-more-btn-in-depth-search"
							onClick={props.handleClick}>
							View More
						</button>
					</div>
				) : null)}

			{props.handleClickError &&
				(props.isLoading ? (
					<div className="view-more-button-loader-container">
						<ViewMoreClipLoader />
					</div>
				) : props.totalPages !== props.currentPage ? (
					<div className="view-more-btn-container">
						<p>An error ocurred. Please try again</p>
						<button
							className="view-more-btn view-more-btn-in-depth-search"
							onClick={props.handleClick}>
							View More
						</button>
					</div>
				) : null)}
		</>
	);
};
ViewMoreButton.propTypes = {
	totalPages: PropTypes.number,
	currentPage: PropTypes.number,
	handleClick: PropTypes.func,
	isLoading: PropTypes.bool,
	handleClickError: PropTypes.bool,
};
