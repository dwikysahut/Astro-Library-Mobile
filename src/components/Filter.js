import React from 'react';
import {
  // Container,
  Picker,
  // Header,
  // Left,
  // Body,
  // Right,
  Button,
  // Icon,
  // Title,
  // Segment,
  // Content,
  Text,
} from 'native-base';
import {StyleSheet} from 'react-native';
function Filter({
  orderBy,
  sortBy,
  handleOrder,
  handleTitle,
  handleAuthor,
  handleGenre,
  handleId,
}) {
  return (
    <>
      {/* <Button style={{backgroundColor:'rgba(52, 52, 52, 0.2)'}}  disabled><Icon name="book" /></Button> */}
      <Picker
        first
        mode="dropdown"
        style={styles.picker}
        selectedValue={orderBy}
        onValueChange={handleOrder}>
        <Picker.Item style={styles.whiteColor} label="A-Z" value="asc" />
        <Picker.Item style={styles.whiteColor} label="Z-A" value="desc" />
      </Picker>

      <Button
        active
        disabled={sortBy === 'id' ? true : false}
        bordered
        style={styles.buttonSortby}
        onPress={handleId}>
        <Text style={styles.whiteColor}>All</Text>
      </Button>
      <Button
        active={true}
        bordered
        disabled={sortBy === 'title' ? true : false}
        style={styles.title}
        onPress={handleTitle}>
        <Text style={styles.whiteColor}>Title</Text>
      </Button>
      <Button
        bordered
        disabled={sortBy === 'genre' ? true : false}
        style={styles.genre}
        onPress={handleGenre}>
        <Text style={styles.whiteColor}>Genre</Text>
      </Button>
      <Button
        bordered
        disabled={sortBy === 'author' ? true : false}
        style={styles.author}
        onPress={handleAuthor}>
        <Text style={styles.whiteColor}>Author</Text>
      </Button>
    </>
  );
}
const styles = StyleSheet.create({
  picker: {width: 100, color: 'white'},
  whiteColor: {color: 'white'},
  buttonSortby: {
    height: 30,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 10,
    alignItems: 'center',
    borderRadius: 25,
  },
  title: {height: 30, marginTop: 10, marginRight: 40, borderRadius: 25},
  genre: {height: 30, marginTop: 10, marginRight: 40, borderRadius: 25},
  author: {height: 30, marginTop: 10, borderRadius: 25, marginRight: 40},
});
export default Filter;
