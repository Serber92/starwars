import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Routes from "./Routes";
import { reducer, initialState } from "./store";

export const AppContext = React.createContext();

const address = "https://parseapi.back4app.com"

const httpLink = createHttpLink({
  uri: `${address}/graphql`,
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      "x-parse-application-id": "kFuqGsemy2j84m8AfykdWikN2WdHEs45uGIFDV7F",
      "x-parse-master-key": "mbUJqmLAMaVoASAkhmnOWf6am5qhmFXL5hcw0Ecf"
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const App = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      <ApolloProvider client={client}>
        <Router>
          <Routes />
        </Router>
      </ApolloProvider>
    
    </AppContext.Provider>
  );
};

export default App;
