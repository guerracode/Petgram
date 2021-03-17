import React from "react";
import ReactDOM from "react-dom";
import Context from "./Context";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { App } from "./App";

const httpLink = createHttpLink({
  uri: "https://petgram-server-gray.vercel.app/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = window.sessionStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const errorLink = onError(({ networkError }) => {
  if (networkError && networkError.result.code === "invalid_token") {
    window.sessionStorage.removeItem("token");
    window.location.href = "/";
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// const client = new ApolloClient({
//   uri: "https://petgram-server-gray.vercel.app/graphql",
//   request: (operation) => {
//     const token = window.sessionStorage.getItem("token");
//     const authorization = token ? `Bearer ${token}` : "";
//     operation.setContext({
//       headers: {
//         authorization,
//       },
//     });
//   },
//   cache: new InMemoryCache(),
// });

ReactDOM.render(
  <Context.Provider>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Context.Provider>,
  document.getElementById("app")
);
