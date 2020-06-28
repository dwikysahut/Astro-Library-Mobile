import React, {Component} from 'react';
// import { getDetailBook, getAllBooks } from '../utils/http'
import CardDetailBook from '../components/CardDetailBook';
import AsyncStorage from '@react-native-community/async-storage';
import EditBookModal from '../components/EditBookModal';
// import ImagePicker from 'react-native-image-picker';
import {
  //   AppRegistry,
  //   Text,
  View,
  StyleSheet,
  Platform,
  Animated,
  ScrollView,
  // Alert,
  BackHandler,
} from 'react-native';
// import {
//   // Container,
//   // Content,
//   //   Card,
//   //   CardItem,
//   //   Thumbnail,
//   //   Text,
//     Button,
//     Icon,
//   //   Left,
//   // Spinner,
// } from 'native-base';

import {connect} from 'react-redux';
import {getAuthorActionCreator} from '../redux/actions/AuthorAction';
import {getGenreActionCreator} from '../redux/actions/GenreAction';
import {
  getAllBooksActionCreator,
  getBookByIdActionCreator,
  getBookByGenreOnIdActionCreator,
} from '../redux/actions/BookAction';

// import {
//   getUserBorrowActionCreator,
//   getAllBorrowActionCreator,
// } from '../redux/actions/BorrowAction';
const HEADER_MIN_HEIGHT = 50;
const HEADER_MAX_HEIGHT = 200;
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
  refresh = async () => {
    // await this.props.getAllBooksAction(this.props.route.params.token, {
    //   page: page,
    //   limit: limit,
    //   orderBy: orderBy,
    //   sortBy: sortBy,
    //   title: title,
    // });
  };

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

    const data = dataById[0];
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
    //   if(this.props.isRejected===true){

    //     alert('Token Expire')
    //     this.props.history.push('/auth/token')

    //   console.log(this.props.errorToken)
    // }
    // const { object } = this.state
    // console.log(this.props.title)

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
        {/* <Animated.View
          style={[
            styles.animatedHeaderContainer,
            {height: headerHeight, backgroundColor: headerBackgroundColor},
          ]}>
          <Text style={styles.headerText}>Animated Header</Text>
        </Animated.View> */}
        <ScrollView
          contentContainerStyle={{paddingTop: HEADER_MAX_HEIGHT}}
          scrollEventThrottle={16}
          onScroll={Animated.event([
            {nativeEvent: {contentOffset: {y: this.scrollYAnimatedValue}}},
          ])}>
          {renderDataDetail}
        </ScrollView>
        {this.state.role === '1' || this.state.role === 1 ? (
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
      //   <>
      //     {this.props.isFulfilled === true && data ? (
      //       //  <div className="container" style={{  backgroundImage:`url('http://localhost:8080/public/image/${data.image}')`,backgroundSize: "100% 40%",borderStyle:"ridge", borderRadius: "25px",maxWidth: "600px",minWidth: "475px" , backgroundRepeat: "no-repeat" }}>
      //       //       <EditBookModal id={this.props.match.params.id} refresh={this.componentDidMount} data={data}/>

      //       <>
      //         <Content style={styles.backgroundColor}>{renderDataDetail}</Content>
      //         {this.state.role === '1' || this.state.role === 1 ? (
      //           <EditBookModal
      //             id={this.props.route.params.id}
      //             token={this.props.route.params.token}
      //             refresh={this.componentDidMount}
      //             data={data}
      //           />
      //         ) : (
      //           <></>
      //         )}
      //       </>
      //     ) : (
      //       //   </div>

      //       <Container style={styles.container}>
      //         <Spinner color="darkcyan" />
      //       </Container>
      //     )}
      //   </>
    );
  }
}
// const styles = StyleSheet.create({
//   backgroundColor: {backgroundColor: 'black'},
//   container: {justifyContent: 'center', alignItems: 'center'},
// });
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
