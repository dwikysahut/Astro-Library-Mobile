import React, {useState} from 'react';
import {deleteAuthorActionCreator} from '../redux/actions/AuthorAction';
import {deleteGenreActionCreator} from '../redux/actions/GenreAction';
import {deleteUserActionCreator} from '../redux/actions/UserAction';

import {connect} from 'react-redux';
// import { Link } from '@react-navigation/native';
import {Alert, StyleSheet} from 'react-native';
import {
  // Container,
  // Header,
  Content,
  Card,
  CardItem,
  Text,
  Spinner,
  Icon,
  Body,
  Button,
  Left,
  // Toast,
} from 'native-base';
function DataCard({
  data,
  refresh,
  props,
  deleteAuthorAction,
  deleteGenreAction,
  deleteUserAction,
  isRejected,
  isFulfilledAuthor,
  isFulfilledGenre,
  isFulfilledUser,
  token,
  errorDeleteGenre,
  errorDeleteAuhtor,
  type,
}) {
  const [isSuccess, setSuccess] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [isShow, setIsShow] = useState(false);

  async function delUser() {
    // const id = data.id
    const tokenn = token._55;
    try {
      await deleteUserAction(tokenn, data.id);
      setSuccess(true);

      // setIsShow(true)

      if (isRejected === true) {
        console.log('success');
        // console.log(errorDelete);
        setIsShow(true);
        Alert.alert('delete failed');
        setSuccess(false);
        return refresh();
      }

      if (isFulfilledGenre === true) {
        console.log('success');
        console.log(isSuccess);
        setIsShow(false);
        Alert.alert('Message', 'Delete Successfully');
        return refresh();
      }
    } catch (error) {
      // Toast.show({
      //   text: "Delete failed,data have relations with Book",
      //   buttonText: "Okay",
      //   type: "danger"
      // })
      Alert.alert('Message', 'Delete failed,data have relations with Book');
    }

    //  if(isFulfilledGenre===false){
    //   alert("delete failed,data have relations with Book")
    // }
  }
  async function delGenre() {
    // const id = data.id
    const tokenn = token._55;
    try {
      await deleteGenreAction(tokenn, data.id);
      setSuccess(true);
      // setIsShow(true)

      if (isRejected === true) {
        console.log('success');
        // console.log(errorDelete);
        setIsShow(true);
        Alert.alert('delete failed');
        setSuccess(false);
        return refresh();
      }

      if (isFulfilledGenre === true) {
        console.log('success');
        console.log(isSuccess);
        setIsShow(false);
        Alert.alert('Message', 'Delete Successfully');
        return refresh();
      }
    } catch (error) {
      // Toast.show({
      //   text: "Delete failed,data have relations with Book",
      //   buttonText: "Okay",
      //   type: "danger"
      // })
      Alert.alert('Message', 'Delete failed,data have relations with Book');
    }

    //  if(isFulfilledGenre===false){
    //   alert("delete failed,data have relations with Book")
    // }
  }
  async function delAuthor(e) {
    //   e.preventDefault()
    // const id = data.id
    const tokenn = token._55;
    try {
      await deleteAuthorAction(tokenn, data.id);
      setSuccess(true);

      // setIsShow(true)

      if (isRejected === true) {
        console.log('success');
        // console.log(errorDelete);
        setIsShow(true);
        Alert.alert('delete failed');
        setSuccess(false);
        return refresh();
      }

      if (isFulfilledGenre === true) {
        console.log('success');
        console.log(isSuccess);
        setIsShow(false);
        Alert.alert('Message', 'Delete Successfully');
        return refresh();
      }
    } catch (error) {
      // Toast.show({
      //   text: "Delete failed,data have relations with Book",
      //   buttonText: "Okay",
      //   type: "danger"
      // })
      Alert.alert('Message', 'Delete failed,data have relations with Book');
    }
  }
  // function handleHide() {
  //   setIsShow(false);
  // }
  // function handleShow() {
  //   setIsShow(true);
  // }
  return (
    <>
      {isFulfilledGenre || isFulfilledAuthor || isFulfilledUser === true ? (
        <>
          <Card style={styles.card}>
            <CardItem>
              <Left>
                {type === 'user' ? (
                  <>
                    <Icon active name="person" />
                    <Body>
                      <Text>{data.email}</Text>
                      <Text note>{data.id}</Text>
                    </Body>
                    {/* <Body>
                <Text >{data.role}</Text>

              </Body>
               */}
                  </>
                ) : (
                  <>
                    <Body>
                      <Text>{data.id}</Text>
                    </Body>
                    <Body>
                      <Text>{data.name}</Text>
                    </Body>
                  </>
                )}
              </Left>
              {type !== 'user' ? (
                <>
                  {type === 'author' ? (
                    <Button
                      transparent
                      onPress={() => {
                        props.navigation.navigate('Manage Author', {
                          id: data.id,
                        });
                      }}>
                      <Text>Edit</Text>
                    </Button>
                  ) : (
                    <Button
                      transparent
                      onPress={() => {
                        props.navigation.navigate('Manage Genre', {
                          id: data.id,
                        });
                      }}>
                      <Text>Edit</Text>
                    </Button>
                  )}
                  {type === 'author' ? (
                    <Button
                      transparent
                      onPress={() =>
                        Alert.alert(
                          'Message',
                          'Are You Sure to Delete ?',
                          [
                            {
                              text: 'Cancel',
                              onPress: () => console.log('Cancel Pressed'),
                              style: 'cancel',
                            },
                            {text: 'OK', onPress: delAuthor},
                          ],
                          {cancelable: false},
                        )
                      }>
                      <Text>Delete</Text>
                    </Button>
                  ) : (
                    <Button
                      transparent
                      onPress={() =>
                        Alert.alert(
                          'Message',
                          'Are You Sure to Delete ?',
                          [
                            {
                              text: 'Cancel',
                              onPress: () => console.log('Cancel Pressed'),
                              style: 'cancel',
                            },
                            {text: 'OK', onPress: delGenre},
                          ],
                          {cancelable: false},
                        )
                      }>
                      <Text>Delete</Text>
                    </Button>
                  )}
                </>
              ) : (
                <Button
                  transparent
                  onPress={() =>
                    Alert.alert(
                      'Message',
                      'Are You Sure to Delete ?',
                      [
                        {
                          text: 'Cancel',
                          onPress: () => console.log('Cancel Pressed'),
                          style: 'cancel',
                        },
                        {text: 'OK', onPress: delUser},
                      ],
                      {cancelable: false},
                    )
                  }>
                  <Text>Delete</Text>
                </Button>
              )}
            </CardItem>
          </Card>
        </>
      ) : (
        <Content>
          <Spinner color="red" />
        </Content>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  card: {flex: 1},
});
const mapStateToProps = ({reducerAuthor, reducerGenre, reducerUser}) => {
  return {
    isLoading: reducerAuthor.isLoading,
    isRejected: reducerGenre.isRejected,
    isFulfilledAuthor: reducerAuthor.isFulfilled,
    errorDeleteAuthor: reducerAuthor.errorDelete,
    isFulfilledGenre: reducerGenre.isFulfilled,
    errorDeleteGenre: reducerGenre.errorDelete,
    isFulfilledUser: reducerUser.isFulfilled,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    deleteAuthorAction: async (token, id) => {
      await dispatch(deleteAuthorActionCreator(token, id));
    },
    deleteGenreAction: async (token, id) => {
      await dispatch(deleteGenreActionCreator(token, id));
    },
    deleteUserAction: async (token, id) => {
      await dispatch(deleteUserActionCreator(token, id));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DataCard);
