import React, {Component} from 'react';

import UserCard from '../components/DataCard';

// import { allUser } from '../utils/http'
import AsyncStorage from '@react-native-community/async-storage';
import {Content} from 'native-base';

import {getUserActionCreator} from '../redux/actions/UserAction.js';

import {connect} from 'react-redux';
class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      id: '',
      email: '',
      password: '',
      roleuser: 2,
    };
  }

  getStoreData = async name => {
    try {
      const value = await AsyncStorage.getItem(`${name}`);
      // console.log(value)
      return value;
    } catch (e) {
      // error reading value
    }
  };
  componentDidMount = async () => {
    if ((await this.getStoreData('role')) === '1') {
      if (this.props.data.length <= 0) {
        this.getUser();
      }
    } else {
      this.props.navigation.navigate('Books');
    }
  };
  getUser = async () => {
    await this.props.getUserAction(await this.getStoreData('token'));
  };

  async componentDidUpdate(prevProps, prevState) {}

  shouldComponentUpdate() {
    return true;
  }
  render() {
    if (this.props.errorToken === 'TokenExpiredError') {
      //   alert('Token Expire');
      this.props.navigation.navigate('Home');

      console.log(this.props.errorToken);
    }

    const renderData = this.props.data.map(data => {
      return (
        // <UserCard data={data} key={data.id} refresh={this.componentDidMount} />
        <UserCard
          data={data}
          key={data.id}
          refresh={this.componentDidMount}
          props={this.props}
          navigation={this.props}
          token={this.getStoreData('token')}
          type="user"
        />
      );
    });
    return (
      <>
        <Content>{renderData}</Content>
      </>
    );
  }
}
const mapStateToProps = ({reducerUser}) => {
  return {
    isLoading: reducerUser.isLoading,
    isRejected: reducerUser.isRejected,
    isFulfilled: reducerUser.isFulfilled,
    errorDelete: reducerUser.errorDelete,
    data: reducerUser.data,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getUserAction: token => {
      dispatch(getUserActionCreator(token));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(User);
