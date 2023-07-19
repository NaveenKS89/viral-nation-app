import React from 'react';

function Input({
	type,
	name,
	label,
	onChange,
	value,
	onBlur,
	inputError,
	errorMessage,
	className,
	required,
	readOnly,
	...rest
}) {
	return (
		<div
			className={
				'vn-input-container' +
				(inputError ? ' input-error' : '') +
				(className ? ` ${className}` : '')
			}
		>
			<label className={'input-label'}>
				{label}
				{required ? '*' : ''}
				{inputError ? ` ${errorMessage}` : ''}
			</label>
			<input
				name={name}
				type={type}
				onChange={onChange}
				value={value}
				onBlur={onBlur}
				required={required ? required : false}
				readOnly={readOnly}
				{...rest}
			/>
		</div>
	);
}

export default Input;
