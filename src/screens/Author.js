import React, {Component} from 'react';
// import Button from '@material-ui/core/Button'
// import FooterMenu from '../components/FooterMenu';
import AuthorCard from '../components/DataCard';
// import { allAuthor } from '../utils/http'
// import {Container} from 'native-base'
import AsyncStorage from '@react-native-community/async-storage';

// import { Link } from 'react-router-dom'
import {getAuthorActionCreator} from '../redux/actions/AuthorAction';
import {connect} from 'react-redux';
import {Alert, StyleSheet, BackHandler} from 'react-native';
import {
  Container,
  // Header,
  View,
  // Button,
  Icon,
  Fab,
  // Footer,
  Spinner,
  Content,
} from 'native-base';
class Author extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      id: '',
      name: '',
      active: false,
      role: '',
    };
  }
  getStoreData = async name => {
    try {
      const value = await AsyncStorage.getItem(`${name}`);

      if (value !== null) {
        if (name === 'role') {
          this.setState({role: value});
        }
        return value;
      }
    } catch (e) {
      // error reading value
    }
  };
  getData = async () => {
    await this.props.getAuthorAction(await this.getStoreData('token'));
    console.log();
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
      this.props.navigation.navigate('Home');

      console.log(this.props.errorToken);
    }
    const renderData = this.props.data.map(data => {
      return (
        <AuthorCard
          data={data}
          key={data.id}
          refresh={this.componentDidMount}
          props={this.props}
          navigation={this.props}
          token={this.getStoreData('token')}
          type="author"
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
              containerStyle={{}}
              style={styles.fabBackground}
              position="bottomLeft"
              onPress={() => this.props.navigation.navigate('Manage Author')}>
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
const mapStateToProps = ({reducerAuthor}) => {
  return {
    isRejected: reducerAuthor.isRejected,
    isFulfilled: reducerAuthor.isFulfilled,
    data: reducerAuthor.data,
    errorToken: reducerAuthor.errorToken,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getAuthorAction: token => {
      dispatch(getAuthorActionCreator(token));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Author);
// export default Author

// module.exports = App
