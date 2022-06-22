import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Category from './pages/Category';
import Home from './pages/Home';
import Reviews from './pages/Reviews';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// APOLLO CLIENT
const client = new ApolloClient({
    uri: 'http://localhost:1337/graphql',
    cache: new InMemoryCache(),
});

function App() {
    return (
        <Router>
            <ApolloProvider client={client}>
                <Navbar />
                <Routes>
                    <Route path={'/'} element={<Home />} />
                    <Route path={'/details/:id'} element={<Reviews />} />
                    <Route path={'/category/:id'} element={<Category />} />
                </Routes>
            </ApolloProvider>
        </Router>
    );
}

export default App;
