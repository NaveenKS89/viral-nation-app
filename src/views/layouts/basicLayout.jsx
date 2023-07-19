import React from 'react';
import '../../assets/scss/layout.scss';
import Header from '../components/header';

function BasicLayout({ children }) {
	return (
		<div className="main-layout">
			<Header />
			<div className="vn-container">{children}</div>
		</div>
	);
}

export default BasicLayout;
