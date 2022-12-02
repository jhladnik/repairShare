import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from "./components/Header";
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import Home from './pages/Home';
import Task from './pages/Task';
import NotFound from './pages/NotFound';

//handle of warning when cache reload
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        phases: {
          merge(existing, incoming) {
            return incoming;
          }
        },
        tasks: {
          merge(existing, incoming) {
            return incoming;
          }
        },
      }
    }
  }
})

const client = new ApolloClient ({
  uri: 'http://localhost:2121/graphql',
  cache
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <Header/>
            <div className="container">
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/tasks/:id' element={<Task />} />
                <Route path='*' element={<NotFound />} />
              </Routes>
            </div>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
