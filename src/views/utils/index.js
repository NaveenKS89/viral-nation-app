import jwt_decode from 'jwt-decode';

const toggleTheme = (theme, setTheme) => {
	let userToken = localStorage.getItem('usertoken');
	let decoded = jwt_decode(userToken);
	document.getElementsByTagName('html')[0].classList.remove('theme-dark');
	document.getElementsByTagName('html')[0].classList.remove('theme-light');

	localStorage.removeItem(`userThemePref::${decoded.candidate_name}`);

	if (theme === 'theme-light') {
		setTheme('theme-dark');
		document.getElementsByTagName('html')[0].classList.remove('theme-light');
		document.getElementsByTagName('html')[0].classList.add('theme-dark');
		localStorage.setItem(`userThemePref::${decoded.candidate_name}`, 'theme-dark');
	} else if (theme === 'theme-dark') {
		setTheme('theme-light');
		document.getElementsByTagName('html')[0].classList.remove('theme-dark');
		document.getElementsByTagName('html')[0].classList.add('theme-light');
		localStorage.setItem(`userThemePref::${decoded.candidate_name}`, 'theme-light');
	}
};

export { toggleTheme };
