import React from 'react';
import {
  Image,
  TouchableOpacity,
  // KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';

import {
  // Container,
  // Header,
  // Content,
  Card,
  CardItem,
  // Thumbnail,
  // Text,
  // Button,
  // Icon,
  // Left,
  // Body,
  // Right,
  // Item,
} from 'native-base';
import {REACT_APP_API} from 'react-native-dotenv';
function AllBooksSlide({
  data,
  refresh,
  navigation,
  props,
  role,
  token,
  id_user,
}) {
  const URL_BASE = REACT_APP_API;
  return (
    <Card transparent style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('Detail', {
            id: data.id,
            role: role,
            token: token,
            id_user: id_user,
          });
        }}
        style={styles.touchable}>
        <CardItem cardBody>
          <Image
            source={{uri: `${URL_BASE}/public/image/` + data.image}}
            style={styles.image}
          />
        </CardItem>
      </TouchableOpacity>
    </Card>
  );
}
const styles = StyleSheet.create({
  container: {backgroundColor: 'rgba(52, 52, 52, 0.2)', marginLeft: 30},
  image: {
    height: 110,
    width: 80,
    borderRadius: 2,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
  touchable: {backgroundColor: 'white'},
  body: {paddingLeft: 0},
  text: {fontSize: 20, fontWeight: 'bold'},
  textDate: {textAlign: 'right', fontStyle: 'italic'},
  item: {
    backgroundColor: 'rgba(52, 52, 52, 0.2)',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
export default AllBooksSlide;
