import React from 'react';
import {
  // Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
} from 'native-base';
import {StyleSheet} from 'react-native';
function CustomHeader({name, props}) {
  return (
    <Header style={styles.headerBackground}>
      <Left>
        <Button transparent onPress={() => props.navigation.navigate('Books')}>
          <Icon style={styles.white} name="ios-arrow-back" />
        </Button>
      </Left>
      <Body>
        <Title style={styles.white}>{name}</Title>
      </Body>
      <Right />
    </Header>
  );
}
const styles = StyleSheet.create({
  headerBackground: {backgroundColor: 'rgba(52, 52, 52, 0.2)'},
  white: {
    color: 'white',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
export default CustomHeader;
