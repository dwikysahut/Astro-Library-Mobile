import React, {Component} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import {
  getAllBooksActionCreator,
  getHomeBooksActionCreator,
} from '../redux/actions/BookAction';
import {connect} from 'react-redux';
import {
  // SafeAreaView,
  StyleSheet,
  // ScrollView,
  // View,
  // Text,
  // StatusBar,
  // Button,
  ImageBackground,
} from 'react-native';

import {
  // Header,
  // LearnMoreLinks,
  Colors,
  // DebugInstructions,
  // ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {Container} from 'native-base';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: 1,
      page: 1,
      limit: 6,
      orderBy: '',
      sortBy: '',
      title: '',
      token: '',
      login: false,
    };
    // setTimeout(()=>{
    //   this.props.navigation.navigate("Login")
    // },10000);
  }
  getData = async () => {
    // await this.getToken();
    console.log('sss ' + this.state.token);
    const {page, limit, orderBy, sortBy, title} = this.state;
    const pageQuery = {
      page: page,
      limit: limit,
      orderBy: orderBy,
      sortBy: sortBy,
      title: title,
    };
    this.setState({refreshing: false});

    // console.log(this.props.isFulfilled)
    await this.props.getAllBooksAction(this.state.token, pageQuery);
    // await this.props.getHomeBooksAction(this.state.token, pageQuery);
    this.setState({loading: false});
    //  await this.setState({data: [...this.state.data,...this.props.data]})
  };
  getStoreData = async name => {
    const value = await AsyncStorage.getItem(`${name}`);
    // console.log(value)
    this.setState({name: value});
    return value;
  };
  // componentDidUpdate(prevProps){
  //   if(prevProps.isFulfilled!==this.props.isFulfilled && this.state.login===true){
  //     this.props.navigation.navigate('Home')

  //   }
  // }
  componentDidMount = async () => {
    if (
      (await this.getStoreData('token')) === '' ||
      (await this.getStoreData('token')) === null
    ) {
      await this.getData();
      this.setState({login: false});
      setTimeout(() => {
        this.props.navigation.navigate('LandingPage');
      }, 2500);
    } else {
      setTimeout(async () => {
        await this.getData();
        this.setState({login: true});
        // if (this.props.isFulfilled === true) {
        this.props.navigation.navigate('Home');
        // }
      }, 5000);
    }
  };
  render() {
    return (
      <Container style={styles.container}>
        <ImageBackground
          source={require('../../image/astrolibrary.png')}
          style={styles.container}
        />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});
const mapStateToProps = ({
  reducerBook,
  reducerGenre,
  reducerAuthor,
  reducerUser,
  reducerBorrow,
}) => {
  return {
    isRejected: reducerBook.isRejected,
    isFulfilled: reducerBook.isFulfilled,
    isLoading: reducerBook.isLoading,
    data: reducerBook.data,
    dataGenre: reducerGenre.data,
    dataAuthor: reducerAuthor.data,
    pagination: reducerBook.pagination,
    errorToken: reducerBook.errorToken,
    dataUser: reducerUser.data,
    error: reducerBook.error,
    token: reducerUser.token,
    role: reducerUser.role,
    id_user: reducerUser.id_user,
    borrowTemp: reducerBorrow.borrow,
    returnTemp: reducerBorrow.return,
    dataHome: reducerBook.dataHome,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getAllBooksAction: (token, pageQuery) => {
      dispatch(getAllBooksActionCreator(token, pageQuery));
    },
    getHomeBooksAction: (token, pageQuery) => {
      dispatch(getHomeBooksActionCreator(token, pageQuery));
    },
    // refreshTokenAction: async body => {
    //   await dispatch(refreshTokenActionCreator(body));
    // },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
