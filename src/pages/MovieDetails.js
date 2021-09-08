import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as movieAPI from '../services/movieAPI';
import { Loading } from '../components';

class MovieDetails extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      movie: [],
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.fetchMovie(id);
  }

  fetchMovie = async (id) => {
    const filme = await movieAPI.getMovie(id);
    this.setState(() => ({ movie: filme, loading: false }));
  }

  deleteMovie = async (id) => {
    await movieAPI.deleteMovie(id);
  }

  movieDetails = (movie) => {
    const { match: { params: { id } } } = this.props;
    const { title, storyline, imagePath, genre, rating, subtitle } = movie;
    return (
      <div data-testid="movie-details" className="movie-d">
        <div className="movie-d-card">
          <img className="movie-d-image" alt="Movie Cover" src={ `../${imagePath}` } />
          <p className="movie-d-title">{`title: ${title}`}</p>
          <p className="movie-d-subtitle">{ `Subtitle: ${subtitle}` }</p>
          <p className="movie-d-storyline">{ `Storyline: ${storyline}` }</p>
          <p className="movie-d-genre">{ `Genre: ${genre}` }</p>
          <p className="movie-d-rating">{ `Rating: ${rating}` }</p>
          <div className="movie-d-button">
            <div className="movie-d-links">
              <Link to="/"> VOLTAR </Link>
              <Link to={ `/movies/${id}/edit` }>
                EDITAR
              </Link>
              <Link
                className="movie-d-button-del"
                to="/"
                onClick={ () => this.deleteMovie(id) }
              >
                DELETAR
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { movie, loading } = this.state;
    return (
      loading ? <Loading /> : this.movieDetails(movie)
    );
  }
}

MovieDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default MovieDetails;
