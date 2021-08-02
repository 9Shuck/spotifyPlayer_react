import React from "react";
import PropTypes from "prop-types";

const Button = props => {
	return (
		<button
			className="btn"
			onClick={() => {
				props.nextSong();
			}}></button>
	);
};

Button.propTypes = {
	nextSong: PropTypes.func
};

export default Button;
