import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Profile from './views/pages/profile';
import BasicLayout from './views/layouts/basicLayout';
import Schema from './views/pages/schema';
import jwt_decode from 'jwt-decode';
import { TOKEN } from './services/token';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
	useEffect(() => {
		const usertoken = TOKEN;
		localStorage.setItem('usertoken', usertoken);
		const decoded = jwt_decode(usertoken);

		if (localStorage.getItem(`userThemePref::${decoded.candidate_name}`)) {
			let themePref = localStorage.getItem(`userThemePref::${decoded.candidate_name}`);

			document.getElementsByTagName('html')[0].classList.add(themePref);
		} else {
			document.getElementsByTagName('html')[0].classList.add('theme-dark');
			localStorage.setItem(`userThemePref::${decoded.candidate_name}`, 'theme-dark');
		}
	}, []);

	return (
		<>
			<Routes>
				<Route
					exact
					path="/"
					element={
						<BasicLayout>
							<Profile />
						</BasicLayout>
					}
				/>
				<Route exact path="/graphql-schema" element={<Schema />}></Route>
			</Routes>
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar
				newestOnTop
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
		</>
	);
}

export default App;
