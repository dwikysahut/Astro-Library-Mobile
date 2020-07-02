import React from 'react';
import {Image, TouchableOpacity, StyleSheet} from 'react-native';

import {Card, CardItem, Text, Button, Left, Body} from 'native-base';
import {REACT_APP_API} from 'react-native-dotenv';
function BookCard({
  data,
  refresh,
  navigation,
  props,
  role,
  token,
  id_user,
  page,
}) {
  // const URL_BASE = 'http://10.0.2.2:8080';
  const URL_BASE = REACT_APP_API;
  return (
    <TouchableOpacity
      onPress={() => {
        props.navigation.navigate('Detail', {
          id: data.id,
          role: role,
          token: token,
          id_user: id_user,
          page: page,
        });
      }}
      style={styles.whiteBackground}>
      <Card transparent style={styles.container}>
        <CardItem style={styles.whiteBackground}>
          <Left>
            <CardItem cardBody style={styles.cardItem}>
              <Image
                source={{uri: `${URL_BASE}/public/image/` + data.image}}
                style={styles.image}
              />
            </CardItem>
          </Left>
          <Body style={styles.body}>
            <Text style={styles.text}>{data.title}</Text>
            <Button disabled style={styles.buttonGenre}>
              <Text style={styles.textGenre}>{data.genre}</Text>
            </Button>
            <Body />

            <Text style={styles.textDate}>{data.author}</Text>

            <Text note style={styles.textDate}>
              {new Date(data.date_added).toDateString()}
            </Text>
          </Body>
        </CardItem>
      </Card>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'rgba(52, 52, 52, 0.2)'},
  whiteBackground: {backgroundColor: 'white'},

  image: {
    height: 210,
    width: 150,
    borderRadius: 15,
    backgroundColor: 'rgba(52, 52, 52, 0.2)',
  },
  cardItem: {backgroundColor: 'white', width: 150},
  textGenre: {fontSize: 10},
  body: {paddingLeft: 0},
  text: {fontSize: 20, fontWeight: 'bold'},
  textDate: {textAlign: 'right', fontStyle: 'italic'},
  item: {
    backgroundColor: 'rgba(52, 52, 52, 0.6)',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  buttonGenre: {
    backgroundColor: '#008b8b',
    borderRadius: 25,
    height: 30,
  },
  title: {
    fontSize: 32,
  },
});
export default BookCard;
