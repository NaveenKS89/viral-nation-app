import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './assets/scss/global.scss';
import App from './App';
import { TOKEN } from './services/token';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
const API = require('./services/config').graphql_api_server;

const client = new ApolloClient({
	uri: API,
	cache: new InMemoryCache(),
	headers: {
		authorization: TOKEN,
	},
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<BrowserRouter>
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>
	</BrowserRouter>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
