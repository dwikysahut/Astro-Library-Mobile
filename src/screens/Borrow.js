import React, {Component} from 'react';

import AsyncStorage from '@react-native-community/async-storage';
// import FooterMenu from '../components/FooterMenu'
import CustomHeader from '../components/CustomHeader';

import BorrowCard from '../components/BorrowCard';
// import { getUserBorrow, getAllBorrow } from '../utils/http'
import {ImageBackground, StyleSheet} from 'react-native';
import {Content} from 'native-base';

import {
  getUserBorrowActionCreator,
  getAllBorrowActionCreator,
} from '../redux/actions/BorrowAction';
import {connect} from 'react-redux';

// import { Link } from 'react-router-dom'
class Borrow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      id: '',
      name: '',
      isEmpty: false,
      role: '',
      token: '',
    };
  }

  getStoreData = async name => {
    try {
      const value = await AsyncStorage.getItem(`${name}`);

      // console.log(value)
      if (name === 'token') {
        this.setState({token: value});
      }
      if (name === 'role') {
        this.setState({role: value});
      }
      return value;
    } catch (e) {
      // error reading value
    }
  };
  getData = async () => {
    if (
      (this.props.role !== '' ? this.props.role : this.state.role) === 1 ||
      (this.props.role !== '' ? this.props.role : this.state.role) === '1'
    ) {
      await this.props.getAllBorrowAction(
        this.props.token !== '' ? this.props.token : this.state.token,
      );
    } else {
      await this.props.getUserBorrowAction(
        this.props.token !== '' ? this.props.token : this.state.token,
      );
    }
  };
  componentDidUpdate(prevProps) {
    if (prevProps.role !== this.props.role) {
      this.getData();
    }
  }
  componentDidMount = async () => {
    await this.getStoreData('role');
    await this.getStoreData('token');
    console.log('sss' + this.props.token);
    console.log('aaa' + this.state.token);
    // }
    if (this.props.data.length <= 0) {
      this.getData();
    }
    if (this.state.token !== '' && this.props.role !== this.state.role) {
      this.getData();
    }
  };
  shouldComponentUpdate() {
    return true;
  }
  render() {
    if (this.props.errorToken === 'TokenExpiredError') {
      // alert('Token Expire')
      this.props.navigation.navigate('Books');

      console.log(this.props.errorToken);
    }
    const renderData = this.props.data.map(data => {
      return (
        <BorrowCard
          data={data}
          key={data.id}
          refresh={this.componentDidMount}
          length={this.state.data.length}
          token={this.props.token ? this.props.token : this.state.token}
          role={this.props.role ? this.props.role : this.state.role}
        />
      );
    });
    return (
      <ImageBackground
        source={require('../../image/profilebackground.jpeg')}
        style={styles.imageBackground}>
        <CustomHeader name="Borrow & History" props={this.props} />
        <Content>{renderData}</Content>

        {/* {this.props.isLoading===false?
          <Content>
          {renderData}

          </Content>
              :
           <Container style={{justifyContent:"center",alignItems:"center"}}  >
           <Spinner color='darkcyan' />
           </Container>
        } */}
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  imageBackground: {flex: 1},
  container: {justifyContent: 'center', alignItems: 'center'},
});
const mapStateToProps = ({reducerBorrow, reducerUser}) => {
  return {
    isRejected: reducerBorrow.isRejected,
    isFulfilled: reducerBorrow.isRejected,
    isLoading: reducerBorrow.isLoading,
    data: reducerBorrow.data,
    token: reducerUser.token,
    role: reducerUser.role,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getUserBorrowAction: token => {
      dispatch(getUserBorrowActionCreator(token));
    },
    getAllBorrowAction: token => {
      dispatch(getAllBorrowActionCreator(token));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Borrow);
// export default Borrow

// module.exports = App
