import React, {Component} from 'react';
import CardDetailBook from '../components/CardDetailBook';
import AsyncStorage from '@react-native-community/async-storage';
import EditBookModal from '../components/EditBookModal';
import {
  View,
  StyleSheet,
  Platform,
  Animated,
  ScrollView,
  // Alert,
  BackHandler,
} from 'react-native';

import {connect} from 'react-redux';
import {getAuthorActionCreator} from '../redux/actions/AuthorAction';
import {getGenreActionCreator} from '../redux/actions/GenreAction';
import {
  getAllBooksActionCreator,
  getBookByIdActionCreator,
  getBookByGenreOnIdActionCreator,
} from '../redux/actions/BookAction';

const HEADER_MIN_HEIGHT = 60;
const HEADER_MAX_HEIGHT = 220;
class DetailBook extends Component {
  state = {
    data: [],
    id: '',
    title: '',
    description: '',
    image: '',
    genre_id: '',
    author_id: '',
    status: '',
    role: this.props.route.params.role,
  };
  scrollYAnimatedValue = new Animated.Value(0);

  isDone = false;
  onButtonPress = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    // then navigate

    this.props.navigation.goBack(null);
  };

  handleBackButton = () => {
    this.onButtonPress();

    return true;
  };
  getStoreData = async name => {
    try {
      const value = await AsyncStorage.getItem(`${name}`);

      if (value !== null) {
        return value;
      }
    } catch (e) {}
  };
  refresh = async () => {};

  componentDidMount = async () => {
    //  this.getData()
    if (this.props.route.params.page === 'bookByGenre') {
      this.props.getBookByGenreOnIdAction(this.props.route.params.id);
    } else {
      this.props.getBookByIdAction(this.props.route.params.id);
    }

    if (this.state.role === '1' || this.state.role === 1) {
      if (this.props.dataAuthor.length <= 0 || !this.props.dataAuthor) {
        await this.props.getAuthorAction(this.props.route.params.token);
      }
      if (this.props.dataGenre.length <= 0 || !this.props.dataGenre) {
        await this.props.getGenreAction(this.props.route.params.token);
      }
    }

    if (this.props.dataBook.length <= 0) {
      this.props.navigation.navigate('Books');
    }
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  };
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }
  componentDidUpdate(prevProps) {
    console.log(this.props.data);
  }
  shouldComponentUpdate() {
    return true;
  }

  render() {
    // eslint-disable-next-line radix
    let id = parseInt(this.props.route.params.id);
    const dataById = this.props.dataBook.filter(dataBook => dataBook.id === id);

    const data = this.props.dataById[0];
    console.log(dataById);
    // console.log('sss'+this.props.dataById);
    if (this.props.errorToken === 'TokenExpiredError') {
      // alert('Token Expire')
      //   this.props.history.push('/auth/token')

      console.log(this.props.errorToken);
    }

    const headerHeight = this.scrollYAnimatedValue.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp',
    });

    const headerBackgroundColor = this.scrollYAnimatedValue.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: ['#e91e63', '#1DA1F2'],
      extrapolate: 'clamp',
    });

    const renderDataDetail = this.props.dataById.map(dataDetail => {
      return (
        <CardDetailBook
          data={dataDetail}
          key={dataDetail.id}
          props={this.props}
          id={this.props.route.params.id}
          id_user={this.props.route.params.id_user}
          token={this.props.route.params.token}
          role={this.props.route.params.role}
          refresh={this.refresh}
          headerHeight={headerHeight}
          headerBackgroundColor={headerBackgroundColor}
        />
      );
    });

    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{paddingTop: HEADER_MAX_HEIGHT}}
          scrollEventThrottle={16}
          onScroll={Animated.event([
            {nativeEvent: {contentOffset: {y: this.scrollYAnimatedValue}}},
          ])}>
          {renderDataDetail}
        </ScrollView>
        {(this.state.role === '1' || this.state.role === 1) && data ? (
          <EditBookModal
            id={this.props.route.params.id}
            token={this.props.route.params.token}
            refresh={this.componentDidMount}
            data={data}
          />
        ) : (
          <></>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  animatedHeaderContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 20 : 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 22,
  },
  item: {
    backgroundColor: '#ff9e80',
    margin: 8,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    color: 'black',
    fontSize: 16,
  },
});
const mapStateToProps = ({reducerBook, reducerGenre, reducerAuthor}) => {
  return {
    isFulfilled: reducerBook.isFulfilled,
    title: reducerBook.title,
    dataDetail: reducerBook.dataDetail,
    dataBook: reducerBook.data,
    dataGenre: reducerGenre.data,
    dataAuthor: reducerAuthor.data,
    dataById: reducerBook.dataById,
    dataByGenre: reducerBook.dataByGenre,
    dataObj: reducerBook.dataObj,
    success: reducerBook.isFulfilled,
    errorToken: reducerBook.errorToken,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getGenreAction: token => {
      dispatch(getGenreActionCreator(token));
    },
    getAuthorAction: token => {
      dispatch(getAuthorActionCreator(token));
    },
    getAllBooksAction: (token, pageQuery) => {
      dispatch(getAllBooksActionCreator(token, pageQuery));
    },
    getBookByIdAction: id => {
      dispatch(getBookByIdActionCreator(id));
    },
    getBookByGenreOnIdAction: id => {
      dispatch(getBookByGenreOnIdActionCreator(id));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DetailBook);
