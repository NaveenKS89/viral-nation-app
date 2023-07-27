import React, { useEffect, useState, useRef } from 'react';
import _ from 'lodash';

function Dropdown({ options, onClickOption, children, className }) {
	const [isOpen, setIsOpen] = useState(false);

	let dropdownref = useRef(null);

	const handleClickOutside = (event) => {
		if (dropdownref.current && !dropdownref.current.contains(event.target)) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [handleClickOutside]);

	return (
		<span
			className={'vn-dropdown-container' + (className ? ` ${className}` : '')}
			onClick={() => isOpen === false && setIsOpen(true)}
		>
			{children}
			{isOpen === true ? (
				<div className="vn-dropdown-menu" ref={dropdownref}>
					{_.map(options, (option, index) => {
						return (
							<div
								key={option.value + index}
								className="vn-dropdown-item"
								onClick={(e) => {
									e.stopPropagation();
									onClickOption(option.value);
									setIsOpen(false);
								}}
							>
								{option.label}
							</div>
						);
					})}
				</div>
			) : (
				''
			)}
		</span>
	);
}

export default Dropdown;
