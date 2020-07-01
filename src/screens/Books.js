import React, {Component} from 'react';
import BookSlide from '../components/BookSlide';
import Carousel from '../components/Carousel';

import AddBookModal from '../components/AddBookModal';

import {
  ScrollView,
  View,
  StyleSheet,
  RefreshControl,
  ImageBackground,
  BackHandler,
  Alert,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Spinner, Fab, Icon, Text, Card, CardItem} from 'native-base';

// import Filter from '../components/Filter';
import {refreshTokenActionCreator} from '../redux/actions/UserAction.js';

import {
  getAllBooksActionCreator,
  getHomeBooksActionCreator,
} from '../redux/actions/BookAction';
import {getAuthorActionCreator} from '../redux/actions/AuthorAction';
import {getGenreActionCreator} from '../redux/actions/GenreAction';
import {
  getUserActionCreator,
  logoutUserActionCreator,
} from '../redux/actions/UserAction';
import {getUserBorrowActionCreator} from '../redux/actions/BorrowAction';
import {getAllBorrowActionCreator} from '../redux/actions/BorrowAction';

// import {Form} from 'react-redux'
import {connect} from 'react-redux';
import AllBooksSlide from '../components/AllBooksSlide';
// const qs = require('querystring')

class Books extends Component {
  constructor() {
    super();
    this.state = {
      startpage: 1,
      page: 1,
      limit: 6,
      orderBy: 'asc',
      sortBy: 'id',
      token: '',
      title: '',
      data: [],
      pagination: {},
      role: '',
      id_user: '',
      refreshing: false,
      loading: true,
      refreshToken: '',
      reload: false,
      borrowTemp: [],
      returnTemp: [],
      isNavBarHidden: false,
      loadMore: false,
      upButton: false,
      showbookSlide: true,
      isLoadingData: false,
      isLoadingBorrow: true,
    };
    this.onEndReachedCalledDuringMomentum = true;
  }
  handleScroll = () => {
    this.setState({isNavBarHidden: true});
  };

  _listViewOffset = 0;
  getToken = async () => {
    const value = await AsyncStorage.getItem('token');

    // console.log(value);
    await this.setState({token: value});
  };
  getRole = async () => {
    const value = await AsyncStorage.getItem('role');
    if (value !== null) {
      // console.log(value);
      await this.setState({role: value});
    }
  };
  getIdUser = async () => {
    const value = await AsyncStorage.getItem('id_user');
    if (value !== null) {
      // console.log(value);
      await this.setState({role: value});
    }
  };
  getStoreData = async name => {
    const value = await AsyncStorage.getItem(`${name}`);
    // console.log(value)
    this.setState({name: value});
    return value;
  };
  refreshToken = async () => {
    // const {refreshToken} = this.state;
    const refresh = await AsyncStorage.getItem('refreshToken');
    await this.props.refreshTokenAction({refreshToken: refresh});
    this.props.navigation.navigate('Home');
  };
  handlerSearch = async (name, e) => {
    // e.preventDefault()
    if (!e) {
      this.setState({title: '', isUpdate: true}, () => {
        this.getBooks();
      });
    }
    this.setState({[name]: e});
  };
  handlerChange = async (name, e) => {
    // if(this.state.title=""){
    //   this.getData()
    // }
    // e.preventDefault()
    this.setState({[name]: e}, () => {
      this.getBooks();
    });
  };
  handlerPage = async e => {
    this.setState({page: e.target.id}, () => {
      this.getBooks();
    });
  };
  handlerNextPage = e => {
    let currentPage = this.state.page;
    currentPage++;
    if (currentPage > this.props.pagination.totalPage) {
      currentPage = this.props.pagination.totalPage;
      this.props.pagination.next_page = this.props.pagination.totalPage;
      return false;
    }
    if (this.props.pagination.totalPage === 1) {
      currentPage = this.props.pagination.totalPage;
    } else {
      this.setState({page: this.props.pagination.next_page}, () => {
        this.getBooks();
      });
    }
  };
  handlerLastPage = () => {
    this.setState({page: this.props.pagination.totalPage}, () => {
      this.getBooks();
    });
  };
  handlerStartPage = () => {
    this.setState({page: 1}, () => {
      this.getBooks();
    });
  };
  handlerPrevPage = async e => {
    let currentPage = this.state.page;
    currentPage--;
    if (currentPage < 1) {
      currentPage = this.props.pagination.startpage;
    } else {
      this.setState(
        {[e.target.name]: e.target.value, page: currentPage},
        () => {
          this.getBooks();
        },
      );
    }
  };

  getBooks = async () => {
    await this.getToken();
    console.log('sss ' + this.state.token);
    const {page, limit, orderBy, sortBy, title} = this.state;
    const pageQuery = {
      page: page,
      limit: limit,
      orderBy: orderBy,
      sortBy: sortBy,
      title: title,
    };

    // console.log(this.props.isFulfilled)
    await this.props.getAllBooksAction(this.state.token, pageQuery);
    this.setState({loading: false});
    this.setState({refreshing: false});
    //  await this.setState({data: [...this.state.data,...this.props.data]})
  };
  getDataGenre = async () => {
    await this.props.getGenreAction(
      this.props.token ? this.props.token : this.state.token,
    );
  };
  getDataBorrowUser = async () => {
    // eslint-disable-next-line eqeqeq
    if ((this.props.role ? this.props.role : this.state.role) == 1) {
      await this.props.getAllBorrowAction(
        this.props.token ? this.props.token : this.state.token,
      );
    } else {
      await this.props.getUserBorrowAction(
        this.props.token ? this.props.token : this.state.token,
      );
    }
    this.setState({refreshing: false, isLoadingBorrow: false});
  };
  getDataAuthor = async () => {
    await this.props.getAuthorAction(
      this.props.token ? this.props.token : this.state.token,
    );
  };
  getDataUser = async () => {
    await this.props.getUserAction(
      this.props.token ? this.props.token : this.state.token,
    );
  };

  componentDidMount = async () => {
    if (this.state.borrowTemp !== this.props.borrowTemp) {
      this.setState({borrowTemp: this.props.borrowTemp});
      await this.getBooks();
    }
    if (
      (await this.getStoreData('token')) === '' ||
      (await this.getStoreData('token')) === null
    ) {
      Alert.alert('please login');
      this.props.navigation.navigate('Login');
    }
    console.disableYellowBox = true;
    if (this.props.data.length <= 0) {
      await this.getBooks();
    }
    // if (this.props.dataHome.length <= 0) {
    //   await this.getHomeBooks();
    // }
    // await this.getData()

    await this.getToken();
    await this.getIdUser();

    await this.getRole();
    await this.getStoreData('refreshToken');
    this.getDataGenre();
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    // eslint-disable-next-line eqeqeq
    if ((this.props.role ? this.props.role : this.state.role) == '1') {
      if (this.props.dataAuthor.length <= 0) {
        this.getDataAuthor();
      }

      this.getDataUser();

      if (this.props.dataGenre.length <= 0) {
        this.getDataGenre();
      }
    }

    this.getDataBorrowUser();
  };
  getHomeBooks = async () => {
    await this.getToken();
    console.log('sss ' + this.state.token);
    const {page, limit, orderBy, sortBy, title} = this.state;
    const pageQuery = {
      page: page,
      limit: limit,
      orderBy: orderBy,
      sortBy: sortBy,
      title: title,
    };

    // console.log(this.props.isFulfilled)
    await this.props.getHomeBooksAction(this.state.token, pageQuery);
    this.setState({loading: false});
    this.setState({refreshing: false});
    //  await this.setState({data: [...this.state.data,...this.props.data]})
  };
  componentDidUpdate = async (prevprops, prevState) => {
    //INI DI UNCOMMENT KLO MAU FETCH ULANG SEHABIS BORROW ATAU RETURN
    // if(prevprops.borrowTemp.length!= this.props.borrowTemp.length){
    //   this.getData()
    //   // this.componentDidMount()
    // }
    // if(this.props.)
    if (this.props.errorToken === 'TokenExpiredError') {
      await this.props.logoutUserAction();
      // await this.props.clearBorrowAction();
      await AsyncStorage.clear().then(response => {
        Alert.alert('Session has Ended, Please Login ..');
        // Alert.alert('Thank You..');
        this.setState({isLoading: false});
        this.props.navigation.navigate('Login');
      });
      // this.props.navigation.navigate('Login');
      // return;
    }
    if (prevprops.role !== this.props.role) {
      this.getDataBorrowUser();
    }

    if (prevprops.returnTemp.length !== this.props.returnTemp.length) {
      this.getBooks();
      // this.componentDidMount()
    }
  };
  goToTop = () => {
    this.scroll.scrollTo({x: 0, y: 0, animated: true});
  };
  handleRefresh = () => {
    this.setState({refreshing: true, page: 1, limit: 6}, () => {
      this.getBooks();
    });
  };
  handleRefreshBorrow = () => {
    this.setState({refreshing: true}, () => {
      this.getDataBorrowUser();
      this.getBooks();
    });
  };
  handleLoadMore = () => {
    if (!this.onEndReachedCalledDuringMomentum) {
      this.setState(
        {page: 1, limit: this.state.limit + 3, loadMore: true},
        () => {
          this.getBooks();
        },
      );

      this.onEndReachedCalledDuringMomentum = true;
    }
    // console.warn('handleload')
  };

  onButtonPress = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    // then navigate
    // eslint-disable-next-line no-undef
    navigate('NewScreen');
  };

  handleBackButton = () => {
    Alert.alert(
      'Exit App',
      'Exiting the application?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => BackHandler.exitApp(),
        },
      ],
      {
        cancelable: false,
      },
    );
    return true;
  };
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }
  render() {
    console.disableYellowBox = true;
    const renderData = this.props.data.map((data, i) => {
      if (i <= 4) {
        return (
          <AllBooksSlide
            data={data}
            key={data.id}
            role={this.props.role ? this.props.role : this.state.role}
            token={this.state.token}
            id_user={this.state.id_user}
            refresh={this.componentDidMount}
            props={this.props}
          />
        );
      }
      //  }
    });
    const renderBorrow = this.props.dataBorrow.map((data, i) => {
      if (i <= 4) {
        return (
          <BookSlide
            data={data}
            key={data.id}
            props={this.props}
            length={this.state.data.length}
            token={this.props.token ? this.props.token : this.state.token}
            role={this.props.role ? this.props.role : this.state.role}
          />
        );
      }
    });
    const renderGenre = this.props.dataGenre.map((data, i) => {
      // console.log(data)
      return (
        <Card transparent style={styles.image}>
          <TouchableOpacity
            style={styles.bookGenreRadius}
            onPress={() => {
              this.props.navigation.navigate('BooksByGenre', {
                title: data.name.toString(),
              });
            }}>
            <CardItem cardBody style={styles.cardItem}>
              <ImageBackground
                source={require('../../image/splashscreen.jpg')}
                style={styles.image}>
                <Text style={styles.dataGenreStyls}>{data.name}</Text>
              </ImageBackground>
            </CardItem>
          </TouchableOpacity>
        </Card>
      );
    });

    return (
      <>
        <ScrollView
          style={styles.container}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.handleRefreshBorrow}
            />
          }>
          <ImageBackground
            source={require('../../image/background.jpeg')}
            style={styles.container}>
            <Carousel />

            <View style={styles.view}>
              {(this.props.role ? this.props.role : this.state.role) === '2' ||
              (this.props.role ? this.props.role : this.state.role) === 2 ? (
                <Text style={styles.borrowTitle}>Your Recent Borrow</Text>
              ) : (
                <Text style={styles.allBorrowTitle}>User Recent Borrow</Text>
              )}
              <Text
                style={styles.viewMore1}
                onPress={() => this.props.navigation.navigate('Borrow')}>
                View More &raquo;
              </Text>
              <ScrollView style={styles.scrollView1} horizontal>
                {this.state.isLoadingBorrow ? (
                  <Spinner color="white" style={styles.spinner} />
                ) : this.props.isFullfiledBorrowData ? (
                  this.props.dataBorrow.length > 0 ? (
                    <>{renderBorrow}</>
                  ) : (
                    <Text style={styles.noBorrowed}>
                      you haven't borrowed yet{' '}
                    </Text>
                  )
                ) : (
                  <Spinner color="white" style={styles.spinner} />
                )}
              </ScrollView>
            </View>

            <View style={styles.view2}>
              <Text style={styles.bookListText}>Book Category</Text>
              <ScrollView style={styles.scrollView2} horizontal>
                {renderGenre}
              </ScrollView>
            </View>
            <View style={styles.view2}>
              <Text style={styles.bookListText}>Astro Books</Text>
              <Text
                style={styles.viewMore2}
                onPress={() => this.props.navigation.navigate('Book-List')}>
                View More &raquo;
              </Text>
              <ScrollView
                style={styles.scrollView2}
                horizontal
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this.handleRefresh}
                  />
                }>
                {renderData}
              </ScrollView>
            </View>

            {this.state.upButton ? (
              <Fab
                style={styles.fabGoTop}
                position="bottomRight"
                onPress={() => {
                  // eslint-disable-next-line no-sequences
                  this.flatListRef.scrollToOffset({animated: true, offset: 0}),
                    this.setState({upButton: false, showbookSlide: true});
                }}>
                <Icon name="ios-arrow-up" />
              </Fab>
            ) : (
              <></>
            )}
          </ImageBackground>
          {this.state.loadMore ? (
            // <View style={styles.spinnerStyle}  >
            <Spinner color="darkcyan" />
          ) : (
            <></>
          )}
        </ScrollView>
        {/* } */}

        {(this.props.role ? this.props.role : this.state.role) === '1' ||
        (this.props.role ? this.props.role : this.state.role) === 1 ? (
          <AddBookModal
            token={this.props.token ? this.props.token : this.state.token}
            props={this.props}
          />
        ) : (
          <></>
        )}
      </>
    );
  }
}
const styles = StyleSheet.create({
  image: {
    height: 80,
    width: 110,
    borderRadius: 20,
    backgroundColor: 'rgba(52, 52, 52, 0.2)',
    marginRight: 20,
    marginLeft: 15,
    marginTop: 20,
  },
  recentBorrow: {backgroundColor: 'white', flex: 0.7},
  cardItem: {
    backgroundColor: 'rgba(52, 52, 52, 0.2)',
    borderRadius: 20,
    alignItems: 'center',
  },
  view: {height: '22%'},
  borrowTitle: {
    backgroundColor: 'rgba(52, 52, 52, 0.2)',
    fontSize: 18,
    paddingLeft: 20,
    color: 'white',
    padding: 10,
    fontWeight: 'bold',
  },
  bookGenreRadius: {borderRadius: 20},
  dataGenreStyls: {
    color: 'black',
    textAlign: 'center',
    marginTop: '20%',
    fontWeight: 'bold',
  },
  allBorrowTitle: {
    backgroundColor: 'rgba(52, 52, 52, 0.2)',
    fontSize: 18,
    paddingLeft: 20,
    color: 'white',
    padding: 10,
    fontWeight: 'bold',
  },
  noBorrowed: {
    marginLeft: 100,
    marginTop: 60,

    color: 'white',
  },
  viewMore1: {
    position: 'absolute',
    backgroundColor: 'rgba(52, 52, 52, 0.2)',
    color: 'yellow',
    marginTop: 10,
    marginBottom: 30,
    marginLeft: '72%',
  },
  view2: {height: 200},
  scrollView1: {height: 0, backgroundColor: 'rgba(52, 52, 52, 0.4)'},
  bookListText: {
    backgroundColor: 'rgba(52, 52, 52, 0.2)',
    fontSize: 18,
    paddingLeft: 20,
    color: 'white',
    padding: 10,
    fontWeight: 'bold',
  },
  viewMore2: {
    position: 'absolute',
    backgroundColor: 'rgba(52, 52, 52, 0.2)',
    color: 'yellow',
    marginTop: 10,
    marginLeft: '72%',
  },
  scrollView2: {height: 10, backgroundColor: 'rgba(52, 52, 52, 0)'},
  container: {
    flex: 1,
    height: 900,
  },
  fabGoTop: {backgroundColor: 'rgba(52, 52, 52, 0.6)', marginBottom: 60},
  bgColor: {backgroundColor: 'rgba(52, 52, 52, 0.2)'},
  whiteColor: {color: 'white'},
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  noHistoryFound: {
    color: 'black',
    paddingLeft: '35%',
    paddingTop: '20%',
  },
  viewFilter: {backgroundColor: 'rgba(52, 52, 52, 0.6)', height: 50},
  spinnerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  spinner: {marginLeft: 190, marginTop: 20},
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
    errorToken: reducerBorrow.errorToken,
    dataUser: reducerUser.data,
    error: reducerBook.error,
    token: reducerUser.token,
    role: reducerUser.role,
    id_user: reducerUser.id_user,
    borrowTemp: reducerBorrow.borrow,
    returnTemp: reducerBorrow.return,
    dataBorrow: reducerBorrow.data,
    isFullfiledBorrowData: reducerBorrow.isFulfilled,
    isRejectedBorrowData: reducerBorrow.isRejected,

    dataHome: reducerBook.dataHome,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getAllBooksAction: (token, pageQuery) => {
      dispatch(getAllBooksActionCreator(token, pageQuery));
    },
    getGenreAction: token => {
      dispatch(getGenreActionCreator(token));
    },
    getAuthorAction: token => {
      dispatch(getAuthorActionCreator(token));
    },
    getUserAction: token => {
      dispatch(getUserActionCreator(token));
    },
    getUserBorrowAction: token => {
      dispatch(getUserBorrowActionCreator(token));
    },
    getAllBorrowAction: token => {
      dispatch(getAllBorrowActionCreator(token));
    },
    refreshTokenAction: async body => {
      await dispatch(refreshTokenActionCreator(body));
    },
    getHomeBooksAction: (token, pageQuery) => {
      dispatch(getHomeBooksActionCreator(token, pageQuery));
    },
    logoutUserAction: async () => {
      await dispatch(logoutUserActionCreator());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Books);
