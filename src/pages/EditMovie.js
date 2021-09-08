import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Loading, MovieForm } from '../components';
import * as movieAPI from '../services/movieAPI';

export default class EditMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true, //
      redirect: false,
      filme: {},
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getMovieData = this.getMovieData.bind(this);
  }

  componentDidMount() {
    this.getMovieData();
  }

  async handleSubmit(updatedMovie) {
    await movieAPI.updateMovie(updatedMovie); // Função q veio criada na Services/movieApi.
    this.setState({
      redirect: true,
    });
  }

  async getMovieData() {
    const { match: { params: { id } } } = this.props;
    const filme = await movieAPI.getMovie(id);

    this.setState({
      loading: false,
      filme,
    });
  }

  render() {
    const { loading, redirect, filme } = this.state;
    if (redirect) {
      return <Redirect to="/" />;
    }

    if (loading) return <Loading />;
    // render Loading

    return (
      <div data-testid="edit-movie">
        <MovieForm movie={ filme } onSubmit={ this.handleSubmit } />
      </div>
    );
  }
}

const { shape, string } = PropTypes;

EditMovie.propTypes = {
  match: shape({
    params: shape({
      id: string,
    }),
  }),
}.isRequired;
