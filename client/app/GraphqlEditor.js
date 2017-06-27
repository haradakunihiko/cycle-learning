import React from 'react'
import GraphiQL from 'graphiql';
import fetch from 'isomorphic-fetch';

function graphQLFetcher(graphQLParams) {

  return fetch(window.location.origin + '/graphql', {
    credentials: 'same-origin',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(graphQLParams),
  }).then(response => response.json());
}

export default () => {
  return (
  	<div style={{width: '100vw', height: '100vh'}}>
    	<GraphiQL fetcher={graphQLFetcher} />
  	</div>
  )
}
