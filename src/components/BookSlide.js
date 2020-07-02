import React from 'react';
import {
  Image,
  TouchableOpacity,
  // KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';

import {Card, CardItem} from 'native-base';
import {REACT_APP_API} from 'react-native-dotenv';
function BookSlide({data, refresh, navigation, props, role, token, id_user}) {
  const URL_BASE = REACT_APP_API;
  return (
    <Card transparent style={styles.container}>
      <TouchableOpacity disabled style={styles.whiteBackground}>
        <CardItem cardBody style={styles.cardItem}>
          <Image
            source={{uri: `${URL_BASE}/public/image/` + data.imageBook}}
            style={styles.image}
          />
        </CardItem>
      </TouchableOpacity>
    </Card>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(52, 52, 52, 0.2)',
    marginLeft: 30,
    marginTop: 30,
  },
  whiteBackground: {backgroundColor: 'white'},

  image: {
    height: 110,
    width: 80,
    borderRadius: 0,
    backgroundColor: 'rgba(52, 52, 52, 0.2)',
  },
  cardItem: {backgroundColor: 'rgba(52, 52, 52, 0.2)'},
  body: {paddingLeft: 0},
  text: {fontSize: 20, fontWeight: 'bold'},
  textDate: {textAlign: 'right', fontStyle: 'italic'},
  item: {
    backgroundColor: 'rgba(52, 52, 52, 0.3)',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
export default BookSlide;
