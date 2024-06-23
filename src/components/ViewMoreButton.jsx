import PropTypes from "prop-types";

export const ViewMoreButton = (props) => {
	return (
		<>
			{props.isLoading ? (
				<h1>lkjdiosjaiowdjoiad</h1>
			) : props.totalPages !== props.currentPage ? (
				<div className="view-more-btn-container">
					<button
						className="view-more-btn view-more-btn-in-depth-search"
						onClick={props.handleClick}>
						View More
					</button>
				</div>
			) : null}
		</>
	);
};
ViewMoreButton.propTypes = {
	totalPages: PropTypes.number,
	currentPage: PropTypes.number,
	handleClick: PropTypes.func,
	isLoading: PropTypes.bool,
};
