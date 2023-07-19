import React from 'react';
import ToggleButton from './toggleButton';

function ToggleInput({ title, onToggle, value, label, name }) {
	return (
		<div className="toggle-input-field-container">
			<span className="toggle-input-label">{label}</span>
			<div className="toggle-input-container">
				<span className="toggle-input-title">{title}</span>
				<ToggleButton
					value={value}
					onToggle={(val) => onToggle({ target: { value: val, name: name } })}
				/>
			</div>
		</div>
	);
}

export default ToggleInput;
