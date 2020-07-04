import React from 'react';
// import { Link } from 'react-router-dom'
// import { deleteBook } from '../utils/http'
import {
  Alert,
  // Dimensions,
  StyleSheet,
  Image,
  ImageBackground,
  // ScrollView,
} from 'react-native';
import {
  Card,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
  // View,
} from 'native-base';
import {Platform, Animated} from 'react-native';
import {addBorrowActionCreator} from '../redux/actions/BorrowAction';
import {deleteBookActionCreator} from '../redux/actions/BookAction';
import {editBookActionCreator} from '../redux/actions/BookAction';
import {REACT_APP_API} from 'react-native-dotenv';

import {connect} from 'react-redux';
// import {  } from 'react-native-gesture-handler';
// import {abs} from 'react-native-reanimated';

function CardDetailBook({
  data,
  props,
  addBorrowAction,
  editBookAction,
  deleteBookAction,
  id,
  refresh,
  role,
  token,
  id_user,
  headerMin,
  headerHeight,
  headerBackgroundColor,
  scrollY,
}) {
  // const [isSuccess, setSuccess] = useState(true);
  // const [isShow, setIsShow] = useState(false);
  // const win = Dimensions.get('window');
  // const ratio = win.width / 250;
  const URL_BASE = REACT_APP_API;
  // const URL_BASE = 'http://10.0.2.2:8080';
  async function addBorrow() {
    // const id = data.id

    await addBorrowAction(token, data.id);
    let formData = new FormData();

    formData.append('title', data.title);
    formData.append('description', data.description);

    await formData.append('image', data.image);

    formData.append('genre_id', data.genre_id);
    formData.append('author_id', data.author_id);
    formData.append('status', 'Unavailable');
    await editBookAction(token, data.id, formData);

    props.navigation.goBack(null);
    return refresh();

    // setSuccess(true)
    // setIsShow(true)
  }
  async function deleteBooks() {
    // const id = data.id

    await deleteBookAction(token, data.id);
    props.navigation.navigate('Book-List');

    // setSuccess(true)
    // setIsShow(true)
    return refresh();
  }

  return (
    <>
      <Animated.View
        style={[styles.animatedHeaderContainer, {height: headerHeight}]}>
        <ImageBackground
          source={{uri: `${URL_BASE}/public/image/` + data.image}}
          style={styles.imageBackground2}>
          <Button
            dark
            bordered
            iconLeft
            style={styles.backButton}
            onPress={() => props.navigation.goBack(null)}>
            <Icon style={styles.whiteColor} name="ios-arrow-back" />
          </Button>
          {(role === '2' || role === 2) && data.status === 'Available' ? (
            <Button
              success
              style={styles.borrowButton}
              onPress={() =>
                Alert.alert(
                  'Confirmation',
                  'Do You Want to Borrow this Book ?',
                  [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {text: 'OK', onPress: addBorrow},
                  ],
                  {cancelable: false},
                )
              }>
              <Icon style={styles.whiteColor} active name="add" />
              <Text style={styles.whiteColor}>Borrow</Text>
            </Button>
          ) : (
            <></>
          )}
        </ImageBackground>

        <Body style={styles.paddingBody}>
          <Text style={styles.textTitle}>{data.title}</Text>
          <Text note style={styles.textGenre}>
            {data.genre}
          </Text>
        </Body>
      </Animated.View>
      <Left>
        <Image
          source={{uri: `${URL_BASE}/public/image/` + data.image}}
          style={styles.image}
        />
      </Left>

      {/* <Text style={styles.textTitle}>{data.title}</Text>
            <Text note style={styles.textGenre}>
              {data.genre}
            </Text> */}
      <Right>
        <Button transparent disabled iconLeft style={styles.authorButton}>
          <Icon active name="person" />
          <Text style={styles.authorText}>{data.author}</Text>
        </Button>
      </Right>

      {/* <Right>
        <Text style={{color:"white"}}>{data.title}</Text>
        </Right> */}
      {/* </ImageBackground> */}
      {/* </Card> */}
      <Card style={styles.card2}>
        <Right>
          {data.status === 'Unavailable' ? (
            <Button
              rounded
              disabled
              iconRight
              danger
              bordered
              style={styles.statusButton}>
              <Text style={styles.status}>{data.status}</Text>
              <Icon name="cart" />
            </Button>
          ) : (
            <Button
              rounded
              bordered
              disabled
              iconRight
              success
              style={styles.statusButton}>
              <Text style={styles.status}>{data.status}</Text>

              <Icon name="cart" />
            </Button>
          )}
        </Right>
        {/* <Left style={styles.paddingLeft}> */}
        <Text style={styles.titleDesc}>Description</Text>

        <Text style={styles.textDataDesc}>{data.description}</Text>
        {/* </Left> */}
        {role === '1' || role === 1 ? (
          <>
            <Text style={styles.textDateAdd}>
              Date Added : {new Date(data.date_added).toDateString()}{' '}
            </Text>

            <Text style={styles.textDateUpdate}>
              Date Updated : {new Date(data.date_updated).toDateString()}{' '}
            </Text>
          </>
        ) : (
          <></>
        )}
        {role === '1' || role === 1 ? (
          <>
            {data.status === 'Available' ? (
              <Button
                light
                bordered
                iconLeft
                style={styles.deleteButton}
                onPress={() =>
                  Alert.alert(
                    'Confirmation',
                    'Are You Sure to Delete This Book ?',
                    [
                      {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                      },
                      {text: 'OK', onPress: deleteBooks},
                    ],
                    {cancelable: false},
                  )
                }>
                <Icon style={styles.blackColor} name="trash" />
              </Button>
            ) : (
              <Button light bordered disabled style={styles.buttonNotDelete}>
                <Text>Books Still in Borrowed</Text>
              </Button>
            )}
          </>
        ) : (
          <></>
        )}
      </Card>
    </>
  );
}
const styles = StyleSheet.create({
  view: {height: '100%'},
  card: {height: 400, backgroundColor: 'white', borderRadius: 30},
  imageBackground: {
    height: 270,
    width: null,
    flex: 1,
    borderRadius: 25,
    resizeMode: 'cover',
  },
  imageBackground2: {height: 500, width: '100%'},
  paddingBody: {padding: 40, paddingLeft: '15%'},

  card2: {
    backgroundColor: 'white',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: 10,
    paddingBottom: 100,
  },
  image: {
    height: 180,
    width: 120,
    borderRadius: 15,
    marginLeft: '-42%',
    marginTop: '10%',
    // marginRight: 20,
  },
  body: {paddingLeft: 10},
  textTitle: {
    fontSize: 20,
    color: 'black',
    marginStart: '40%',
    marginEnd: 10,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  text: {fontSize: 20, fontWeight: 'bold'},
  titleDesc: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginLeft: 10,
    paddingBottom: 30,
  },
  textGenre: {fontSize: 12, color: 'black', marginTop: 0, paddingStart: '15%'},
  textDateAdd: {color: 'black', marginLeft: 10, marginTop: 20},
  textDateUpdate: {color: 'black', marginLeft: 10, marginBottom: 20},
  deleteButton: {marginLeft: 10, width: '12%'},
  buttonNotDelete: {marginLeft: 10, width: '55%'},
  borrowButton: {
    //  marginTop: '60%',
    right: 0,
    top: 470,
    position: 'absolute',
    marginLeft: '50%',
    borderWidth: 1,
    // borderColor: 'rgba(0,0,0,0.2)',
    // alignItems: 'center',
    justifyContent: 'center',
    width: '40%',
    height: 50,
    borderRadius: 50,
  },
  authorText: {
    color: 'black',
  },
  status: {color: 'black'},
  authorButton: {paddingLeft: '50%', paddingTop: 20},
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  textDataDesc: {
    color: 'black',
    marginLeft: 10,
    marginRight: 10,
    textAlign: 'justify',
  },
  backButton: {left: 0, top: '40%', width: '10%', position: 'absolute'},
  whiteColor: {color: 'white', left: 0, top: 0},
  blackColor: {color: 'black', left: 0, top: 0},

  statusButton: {marginLeft: '63%', marginRight: '0%'},

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
  itemText: {
    color: 'black',
    fontSize: 16,
  },
});
const mapStateToProps = ({reducerBook}) => {
  return {
    isLoading: reducerBook.isLoading,
    isRejected: reducerBook.isRejected,
    isFulfilled: reducerBook.isFulfilled,
    errorDelete: reducerBook.errorDelete,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    deleteBookAction: async (token, id) => {
      await dispatch(deleteBookActionCreator(token, id));
    },
    addBorrowAction: (token, id) => {
      dispatch(addBorrowActionCreator(token, id));
    },
    editBookAction: async (token, id, body) => {
      await dispatch(editBookActionCreator(token, id, body));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CardDetailBook);

// export default CardDetailBook
