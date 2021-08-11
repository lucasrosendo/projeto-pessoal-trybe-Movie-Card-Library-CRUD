import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { EditMovie, MovieDetails, MovieList, NewMovie, NotFound } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/movies/new" component={ NewMovie } />
        <Route exact path="/movies/:id/edit" component={ EditMovie } />
        <Route path="/movies/:id" component={ MovieDetails } />
        <Route exact path="/" component={ MovieList } />
        <Route path="*" component={ NotFound } />
      </Switch>
    </BrowserRouter>
  );
}
export default App;
