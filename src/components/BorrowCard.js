import React from 'react';
// import { deleteBookUser,returnBook } from '../utils/http'
import {connect} from 'react-redux';
import {Alert, StyleSheet, Image} from 'react-native';
// import bookThumbnail from '../../image/book.png';
import {editBookActionCreator} from '../redux/actions/BookAction';
import {returnBookActionCreator} from '../redux/actions/BorrowAction';

// import {Spinner, Container, Header, Content, Footer, FooterTab, Button, Icon, Text } from 'native-base'
import {
  // Spinner,
  // Container,
  // Header,
  // Content,
  Card,
  CardItem,
  // List,
  // ListItem,
  Left,
  Body,
  Right,
  // Thumbnail,
  Text,
  Button,
} from 'native-base';
import {REACT_APP_API} from 'react-native-dotenv';
function BorrowCard({
  data,
  refresh,
  props,
  returnBookAction,
  isLoading,
  isFulfilled,
  isRejected,
  errorDelete,
  token,
  role,
  editBookAction,
}) {
  const URL_BASE = REACT_APP_API;

  // const [show, setShow] = useState(false);

  async function returnBorrowUser() {
    // const tokenn=props.props.route.params;
    // console.log("zzzzzzz"+token)
    //   e.preventDefault()
    const id = data.id;

    await returnBookAction(token, id);
    let formData = new FormData();

    // formData.append('title', data.title);
    // formData.append('description', data.description);

    // await formData.append('image', data.image);

    // formData.append('genre_id', data.genre_id);
    // formData.append('author_id', data.author_id);
    formData.append('status', 'Available');
    await editBookAction(token, data.id_book, formData);

    props.navigation.goBack(null);
    // setShow(false);
    return refresh();
  }

  // function handleHide() {
  //   setShow(false);
  // }
  // function handleShow() {
  //   setShow(true);
  // }

  return (
    <>
      <Card style={styles.card}>
        <CardItem>
          {/* <Thumbnail source={require('../../image/book.png')} /> */}

          <CardItem cardBody style={styles.cardItem}>
            <Image
              source={{uri: `${URL_BASE}/public/image/` + data.imageBook}}
              style={styles.image}
            />
          </CardItem>

          <Body>
            <Text style={styles.title}>{data.title}</Text>
            {role === 2 || role === '2' ? (
              <></>
            ) : (
              <Text note>ID Book : {data.id_book}</Text>
            )}
            <Text> Borrow : {new Date(data.borrow_at).toDateString()}</Text>
            {data.status === 'Returned' ? (
              <Text> Return : {new Date(data.return_at).toDateString()}</Text>
            ) : (
              <Text style={styles.return}>Return : - </Text>
            )}
          </Body>
        </CardItem>
        <CardItem>
          <Left>
            {data.status === 'Returned' ? (
              <Text style={styles.statusGreen}>{data.status}</Text>
            ) : (
              <Text style={styles.statusRed}>{data.status}</Text>
            )}
          </Left>
          <Right>
            <Text>{data.user_email}</Text>
          </Right>
        </CardItem>

        {(role === '2' || role === 2) && data.status === 'Borrowed' ? (
          <Button
            style={styles.returnButton}
            onPress={() =>
              Alert.alert(
                'Message',
                'Are You Sure to Return Book ?',
                [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {text: 'OK', onPress: returnBorrowUser},
                ],
                {cancelable: false},
              )
            }>
            <Text>Return</Text>
          </Button>
        ) : (
          <></>
        )}
      </Card>
    </>
  );
}
const styles = StyleSheet.create({
  statusGreen: {fontSize: 20, fontStyle: 'italic', color: 'green'},
  statusRed: {fontSize: 20, fontStyle: 'italic', color: 'red'},
  returnButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'navy',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },

  cardItem: {backgroundColor: 'white', width: 120},

  container: {flex: 1, backgroundColor: 'white', marginLeft: 30},
  image: {height: 120, width: 100, backgroundColor: 'rgba(52, 52, 52, 0.2)'},
  body: {paddingLeft: 0},
  text: {fontSize: 20, fontWeight: 'bold'},
  textDate: {textAlign: 'right', fontStyle: 'italic'},
  item: {
    backgroundColor: 'rgba(52, 52, 52, 0.6)',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {flex: 1, marginBottom: 10, borderColor: 'black'},
  return: {marginLeft: 5},
});
const mapStateToProps = ({reducerBorrow}) => {
  return {
    isLoading: reducerBorrow.isLoading,
    isRejected: reducerBorrow.isRejected,
    isFulfilled: reducerBorrow.isFulfilled,
    errorDelete: reducerBorrow.errorDelete,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    returnBookAction: async (token, id, body) => {
      await dispatch(returnBookActionCreator(token, id, body));
    },
    editBookAction: async (token, id, body) => {
      await dispatch(editBookActionCreator(token, id, body));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BorrowCard);

// export default BorrowCard
