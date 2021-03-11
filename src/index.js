import React from "react";
import ReactDOM from "react-dom";
import Context from "./Context";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client";
import { App } from "./App";

const client = new ApolloClient({
  uri: "https://petgram-server-gray.vercel.app/graphql",
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <Context.Provider>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Context.Provider>,
  document.getElementById("app")
);
