import React from "react";
import PropTypes from "prop-types";

const List = props => {
	return (
		<div
			className="songuify"
			onClick={() => {
				props.play();
			}}>
			{props.name}
		</div>
	);
};

List.propTypes = {
	name: PropTypes.string,
	play: PropTypes.func
};

export default List;
