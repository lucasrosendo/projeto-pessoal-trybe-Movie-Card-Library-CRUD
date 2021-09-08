import React from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import Loading from './components/Loading';
import './App.css';
import {
  EditMovie,
  MovieDetails, MovieList,
  NewMovie, NotFound,
} from './pages';

function App() {
  return (
    <BrowserRouter>
      <div className="title-page">
        Movie Card Library CRUD
      </div>
      <section className="nav-bar">
        <Link to="/" test="teste">HOME</Link>
        <Link to="/movies/new" test="teste">ADICIONAR CARTÃO</Link>
      </section>

      <Switch>
        <Route exact path="/" component={ MovieList } />
        <Route exact path="/movies/new" component={ NewMovie } />
        <Route path="/movies/:id/edit" component={ EditMovie } />
        <Route exact path="/movies/:id" component={ MovieDetails } />
        <Route exact path="/loading" component={ Loading } />
        <Route exact path="*" component={ NotFound } />
      </Switch>
    </BrowserRouter>
  );
}
export default App;
