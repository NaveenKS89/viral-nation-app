import React from 'react';

function ToggleButton({ value, onToggle }) {
	return (
		<span
			className={'toggle-btn-container' + (value === true ? ' active' : '')}
			onClick={() => onToggle(!value)}
		>
			<span className="toggle-btn-head"></span>
		</span>
	);
}

export default ToggleButton;
