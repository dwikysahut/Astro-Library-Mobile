import React, {Component} from 'react';
// import { editGenre ,getGenreById} from '../utils/http'
import AsyncStorage from '@react-native-community/async-storage';
import {Alert} from 'react-native';
import ManageData from '../components/ManageData';
import {Container} from 'native-base';
import {
  putAuthorActionCreator,
  getAuthorActionByIdCreator,
  postAuthorActionCreator,
} from '../redux/actions/AuthorAction';
import {connect} from 'react-redux';

class ManageAuthor extends Component {
  state = {
    id: '',
    name: '',
    isSuccess: true,
    isShow: false,
    token: '',
  };

  getStoreData = async name => {
    try {
      const value = await AsyncStorage.getItem(`${name}`);

      if (value !== null) {
        if (name === 'token') {
          this.setState({token: value});
        }
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
      //  alert('Data cant empty')
      return false;
    }

    await this.props.postAuthorAction(this.state.token, {name});

    this.setState({isShow: false});
    Alert.alert('Add Author Successfull');

    this.props.navigation.navigate('Author');
  };
  handlerSubmitEdit = async e => {
    const {name} = this.state;
    //   e.preventDefault()

    if (!this.state.name) {
      this.setState({isSuccess: false});
      this.setState({isShow: false});
      Alert.alert('Add failed', 'Field Name cant empty');
      return false;
    }
    const id = this.props.route.params.id;

    await this.props.putAuthorAction(this.state.token, id, {name});
    this.setState({isShow: false});
    Alert.alert('edit Successfull');
    this.props.navigation.navigate('Author');
  };
  componentDidUpdate = prevState => {};
  async componentDidMount() {
    //   console.log(this.props.route.params)
    await this.getStoreData('token');
    console.log(this.props.route.params.id);
    const dataById = this.props.dataAuthor.filter(
      // eslint-disable-next-line eqeqeq
      dataAuthor => dataAuthor.id == this.props.route.params.id,
    );
    const data = dataById[0];
    console.log(data.name);
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
            text={'Edit Author'}
            handlerChange={this.handlerChange}
            handleShow={this.handleShow}
            handleHide={this.handleHide}
            handlerSubmit={this.handlerSubmitEdit}
            isShow={this.state.isShow}
            isSuccess={this.state.isSuccess}
            name={name}
            type="author"
          />
        ) : (
          <ManageData
            text={'Add Author'}
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
const mapStateToProps = ({reducerAuthor, ownProps}) => {
  return {
    isLoading: reducerAuthor.isLoading,
    isRejected: reducerAuthor.isRejected,
    isFulfilled: reducerAuthor.isFulfilled,
    dataAuthor: reducerAuthor.data,
    errorToken: reducerAuthor.errorToken,
    selectedData: reducerAuthor.selectedData,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    putAuthorAction: async (token, id, body) => {
      await dispatch(putAuthorActionCreator(token, id, body));
    },
    getAuthorByIdAction: id => {
      dispatch(getAuthorActionByIdCreator(id));
    },
    postAuthorAction: async (token, body) => {
      await dispatch(postAuthorActionCreator(token, body));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManageAuthor);

// export default EditGenre
// module.exports = App
