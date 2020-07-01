import React, {Component} from 'react';
// import Button from '@material-ui/core/Button'
// import FooterMenu from '../components/FooterMenu';

import GenreCard from '../components/DataCard';
// import { allGenre } from '../utils/http'
// import {Container} from 'native-base'
import AsyncStorage from '@react-native-community/async-storage';
// import { Link } from 'react-router-dom'
import {StyleSheet, Alert, BackHandler} from 'react-native';

import {
  Container,
  // Header,
  View,
  // Button,
  Icon,
  Fab,
  // Footer,
  // FooterTab,
  Spinner,
  Content,
} from 'native-base';
import {getGenreActionCreator} from '../redux/actions/GenreAction';
import {connect} from 'react-redux';
class Genre extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      id: '',
      name: '',
      token: '',
      active: false,
      role: '',
    };
  }

  getStoreData = async name => {
    try {
      const value = await AsyncStorage.getItem(`${name}`);
      if (name === 'role') {
        this.setState({role: value});
      }
      // console.log(value)
      return value;
    } catch (e) {
      // error reading value
    }
  };
  getData = async () => {
    await this.props.getGenreAction(await this.getStoreData('token'));
  };

  onButtonPress = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    // then navigate

    this.props.navigation.goBack(null);
  };

  handleBackButton = () => {
    this.onButtonPress();

    return true;
  };
  componentDidMount = async () => {
    // console.log(this.props.route.params.role)
    if ((await this.getStoreData('role')) === '1') {
      if (this.props.data.length <= 0) {
        this.getData();
      }
    } else {
      this.props.navigation.navigate('Books');
    }

    // this.getData()
    console.disableYellowBox = true;
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  };
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }
  componentDidUpdate() {}
  render() {
    // console.log(this.props.data, this.props.isFulfilled)

    if (this.props.errorToken === 'TokenExpiredError') {
      Alert.alert('Token Expire');
      // this.props.navigation.navigate('/auth/token')

      console.log(this.props.errorToken);
    }
    const renderData = this.props.data.map(data => {
      return (
        <GenreCard
          data={data}
          key={data.id}
          refresh={this.componentDidMount}
          props={this.props}
          navigation={this.props}
          token={this.getStoreData('token')}
          type="genre"
        />
      );
    });
    return (
      <>
        {this.state.role ? (
          <>
            {this.props.isFulfilled === false ? (
              <Container style={styles.container}>
                <Spinner color="darkcyan" />
              </Container>
            ) : (
              <Content>{renderData}</Content>
            )}

            <Fab
              active={this.state.active}
              direction="up"
              containerStyle={{}}
              style={styles.fabBackground}
              position="bottomLeft"
              onPress={() => this.props.navigation.navigate('Manage Genre')}>
              <Icon name="add" />
            </Fab>

            <View />
          </>
        ) : (
          <>
            <View style={styles.container} />
          </>
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {justifyContent: 'center', alignItems: 'center'},
  fabBackground: {backgroundColor: 'rgba(0, 0, 255, 0.5)'},
  buttonAdd: {backgroundColor: '#34A34F'},
});

const mapStateToProps = ({reducerGenre}) => {
  return {
    isRejected: reducerGenre.isRejected,
    isFulfilled: reducerGenre.isFulfilled,
    data: reducerGenre.data,
    errorToken: reducerGenre.errorToken,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getGenreAction: token => {
      dispatch(getGenreActionCreator(token));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Genre);
// export default Author

// module.exports = App
