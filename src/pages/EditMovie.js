import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { MovieForm, Loading } from '../components';
import * as movieAPI from '../services/movieAPI';

class EditMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      filme: {},
      loading: true,
    };
    this.handleSubmit = this.handleSubmit.bind(this); // faz a função ser vista pelo react
    this.getMovieData = this.getMovieData.bind(this); // faz a função ser vista pelo react
  }

  componentDidMount() { // faz a função ser invocada imediatamente após um componente ser montado
    this.getMovieData();
  }

  async handleSubmit(updatedMovie) { // função que faz o update do filme
    await movieAPI.updateMovie(updatedMovie); // dentro da api existe essa função..., se quiser saber mais detalhes dessa função, ela está no arquivo movieAPI.js
    this.setState({
      redirect: true,
    });
  }

  async getMovieData() { // função assíncrona que obtém os recursos do movieAPI
    const { match: { params: { id } } } = this.props;
    const filme = await movieAPI.getMovie(id);// dentro da api existe essa função...,se quiser saber mais detalhes dessa função, ela está no arquivo movieAPI.js
    this.setState({ // quando ela é invocada ela seta esses estados para mudar de loading para os cards
      loading: false,
      filme,
    });
  }

  render() {
    const { loading, redirect, filme } = this.state;
    const formulario = (
      <div data-testid="edit-movie">
        <MovieForm movie={ filme } onSubmit={ this.handleSubmit } />
      </div>
    );
    if (redirect) { return <Redirect to="/" />; } // condicionais de display da renderização
    if (loading) { return <Loading />; }
    return (
      formulario
    );
  }
}

EditMovie.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default EditMovie;
