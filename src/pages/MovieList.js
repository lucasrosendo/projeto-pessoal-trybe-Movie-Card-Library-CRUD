import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import { Loading } from '../components';
import * as movieAPI from '../services/movieAPI';

export default class MovieList extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      loading: true,
    };
  }

  componentDidMount() {
    movieAPI.getMovies().then((result) => {
      this.setState({
        movies: result,
        loading: false,
      });
    });
  }

  render() {
    const { movies, loading } = this.state;
    if (loading) return <Loading />;
    // Render Loading here if the request is still happening
    return (
      <div data-testid="movie-list">
        <Link to="/movies/new">ADICIONAR CARTÃO</Link>
        {movies.map((movie) => <MovieCard key={ movie.title } movie={ movie } />)}
      </div>

    );
  }
}
