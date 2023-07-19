import React from 'react';

function TextArea({
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
	rows,
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
			<textarea
				name={name}
				value={value}
				onInput={onChange}
				onBlur={onBlur}
				required={required ? required : false}
				spellCheck={false}
				readOnly={readOnly}
				rows={rows}
				{...rest}
			/>
		</div>
	);
}

export default TextArea;
