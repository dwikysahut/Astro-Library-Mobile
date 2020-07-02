import React, {Component} from 'react';
// import { editGenre ,getGenreById} from '../utils/http'
import AsyncStorage from '@react-native-community/async-storage';

import ManageData from '../components/ManageData';
import {Alert} from 'react-native';
import {Container} from 'native-base';
import {
  putGenreActionCreator,
  getGenreByIdActionCreator,
  postGenreActionCreator,
} from '../redux/actions/GenreAction';
import {connect} from 'react-redux';

class ManageGenre extends Component {
  state = {
    id: '',
    name: '',
    isSuccess: true,
    isShow: false,
  };

  getStoreData = async name => {
    try {
      const value = await AsyncStorage.getItem(`${name}`);
      if (value !== null) {
        return value;
      }
    } catch (e) {
      // error reading value
    }
  };
  handlerChange = e => {
    this.setState({name: e});
  };
  handleHide = () => {
    this.setState({isShow: false});
    this.props.history.push('/data/genre');
  };
  handleShow = () => {
    this.setState({isShow: true});
  };

  handlerSubmitAdd = async e => {
    const {name} = this.state;
    console.log('dasdsa' + this.state.name);
    // e.preventDefault()

    if (!this.state.name) {
      this.setState({isSuccess: false});
      this.setState({isShow: false});
      Alert.alert('Add failed', 'Field Name cant empty');
      return false;
    }

    await this.props.postGenreAction(await this.getStoreData('token'), {name});

    this.setState({isShow: false});
    Alert.alert('Add Genre Successfull');

    this.props.navigation.navigate('Genre');
  };
  handlerSubmitEdit = async e => {
    const {name} = this.state;
    e.preventDefault();

    if (!this.state.name) {
      this.setState({isSuccess: false});
      this.setState({isShow: false});
      Alert.alert('Data cant empty');
      return false;
    }
    const id = this.props.route.params.id;

    await this.props.putGenreAction(await this.getStoreData('token'), id, {
      name,
    });
    this.setState({isShow: false});
    Alert.alert('Edit Successfull');

    this.props.navigation.navigate('Genre');
  };
  componentDidUpdate = prevState => {};
  async componentDidMount() {
    console.log(this.props.route.params);
    const dataById = this.props.dataGenre.filter(
      // eslint-disable-next-line eqeqeq
      dataGenre => dataGenre.id == this.props.route.params.id,
    );
    const data = dataById[0];
    if (this.props.route.params.id) {
      // eslint-disable-next-line react/no-did-mount-set-state
      await this.setState({
        name: data.name,
      });
    }

    //  console.log(this.state)
  }
  render() {
    const {name} = this.state;

    return (
      <Container>
        {this.props.route.params ? (
          <ManageData
            text={'Edit Genre'}
            handlerChange={this.handlerChange}
            handleShow={this.handleShow}
            handleHide={this.handleHide}
            handlerSubmit={this.handlerSubmitEdit}
            isShow={this.state.isShow}
            isSuccess={this.state.isSuccess}
            name={name}
            type="genre"
          />
        ) : (
          <ManageData
            text={'Add Genre'}
            handlerChange={this.handlerChange}
            handleShow={this.handleShow}
            handleHide={this.handleHide}
            handlerSubmit={this.handlerSubmitAdd}
            isShow={this.state.isShow}
            isSuccess={this.state.isSuccess}
          />
        )}
      </Container>
    );
  }
}
const mapStateToProps = ({reducerGenre, ownProps}) => {
  return {
    isLoading: reducerGenre.isLoading,
    isRejected: reducerGenre.isRejected,
    isFulfilled: reducerGenre.isFulfilled,
    dataGenre: reducerGenre.data,
    errorToken: reducerGenre.errorToken,
    selectedData: reducerGenre.selectedData,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    putGenreAction: async (token, id, body) => {
      dispatch(putGenreActionCreator(token, id, body));
    },
    getGenreByIdAction: id => {
      dispatch(getGenreByIdActionCreator(id));
    },
    postGenreAction: async (token, body) => {
      await dispatch(postGenreActionCreator(token, body));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManageGenre);

// export default EditGenre
// module.exports = App
