import React from 'react';

function SearchBar({ onChange, value, ...rest }) {
	return (
		<input
			type="text"
			onChange={(e) => onChange(e)}
			value={value}
			className="vn-search-bar-container"
			placeholder='Search'
			{...rest}
		/>
	);
}

export default SearchBar;
