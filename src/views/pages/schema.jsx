import React from 'react';
import { ApolloSandbox } from '@apollo/sandbox/react';

function Schema() {
	return (
		<div className="graphqlSchema">
			<ApolloSandbox />
		</div>
	);
}

export default Schema;
