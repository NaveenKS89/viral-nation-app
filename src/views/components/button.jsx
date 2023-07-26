import React from 'react';
import { GoSync } from 'react-icons/go';

function Button({
	type,
	title,
	leftIcon,
	isOutline,
	isLoading,
	isDisabled,
	onButtonClick,
	customClass,
	minWidth,
	...rest
}) {
	const btnTypeClass =
		type === 'primary'
			? 'vn-btn-primary'
			: type === 'secondary'
			? 'vn-btn-secondary'
			: type === 'danger'
			? 'vn-btn-danger'
			: '';


	return (
		<button
			className={btnTypeClass + (isOutline && type === 'primary' ? ' outline' : '')}
			onClick={onButtonClick}
			style={minWidth ? { minWidth: minWidth } : {}}
		>
			{isLoading ? (
				<GoSync className="animate-spin" />
			) : (
				<>
					{leftIcon ? <>{leftIcon}</> : ''} <span>{title}</span>
				</>
			)}
		</button>
	);
}

export default Button;
