import React, { useEffect, useState } from 'react';
import { ReactComponent as Logo } from '../../assets/svg/vn-logo.svg';
import { ReactComponent as SunIcon } from '../../assets/svg/sun.svg';
import { ReactComponent as MoonIcon } from '../../assets/svg/moon.svg';
import { toggleTheme } from '../utils';
import jwt_decode from 'jwt-decode';

function Header() {
	const [theme, setTheme] = useState('theme-dark');

	useEffect(() => {
		let usertoken = localStorage.getItem('usertoken');
		let decoded = jwt_decode(usertoken);

		if (localStorage.getItem(`userThemePref::${decoded.candidate_name}`)) {
			let theme = localStorage.getItem(`userThemePref::${decoded.candidate_name}`);
			setTheme(theme);
		}
	}, []);

	return (
		<div className="main-header">
			<div className="left-logo-container">
				<span className="logo-icn">
					<Logo />
				</span>
				<span className="logo-text">iral Nation</span>
			</div>
			<div className="right-header-container">
				<span className="theme-left-icn">
					<SunIcon />
				</span>
				<span
					className={'theme-toggle-container' + (theme === 'theme-dark' ? ' active' : '')}
					onClick={() => toggleTheme(theme, setTheme)}
				>
					<span className="toggle-head"></span>
				</span>
				<span className="theme-right-icn">
					<MoonIcon />
				</span>
			</div>
		</div>
	);
}

export default Header;
