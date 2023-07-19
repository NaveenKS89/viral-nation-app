import React, { useState } from 'react';

function SearchBar({ onChange, value, ...rest }) {
	return (
		<input
			type="text"
			onChange={(e) => onChange(e)}
			value={value}
			className="vn-search-bar-container"
			{...rest}
		/>
	);
}

export default SearchBar;
