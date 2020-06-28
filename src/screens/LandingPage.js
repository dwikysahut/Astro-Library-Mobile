import React, {Component} from 'react';

import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  BackHandler,
  Alert,
} from 'react-native';
import {Text, Button} from 'native-base';
// import {Colors} from 'react-native/Libraries/NewAppScreen';

class LandingPage extends Component {
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

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }
  render() {
    return (
      <ImageBackground
        source={require('../../image/profilebackground.jpeg')}
        style={styles.container}>
        <View>
          <Image
            source={require('../../image/astrolibrary.png')}
            style={styles.image}
          />
        </View>
        <View>
          <Text style={styles.title} />
          <Text style={styles.motto}>Easiest Way </Text>
          <Text style={styles.motto2}> to Borrow Books</Text>

          <Text style={styles.text}>
            Help to Choose Your Favorite Books Easily, Let's Pick your Books Now
          </Text>
        </View>
        <Button
          style={styles.button}
          onPress={() => this.props.navigation.navigate('Login')}>
          <Text style={styles.textButton}>GET STARTED</Text>
        </Button>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    // backgroundColor: Colors.lighter,
    marginLeft: '10%',
    position: 'absolute',
    marginTop: -70,
    //  borderRadius:500
    borderBottomLeftRadius: 500,
    borderBottomRightRadius: 70,
    borderTopLeftRadius: 60,
  },
  title: {
    fontSize: 46,
    color: 'teal',
    fontWeight: 'bold',
    marginTop: 120,
    marginLeft: 10,
  },
  motto: {
    fontSize: 20,
    color: 'mistyrose',
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginTop: 140,
    marginLeft: 40,
  },

  motto2: {
    fontSize: 20,
    color: 'mistyrose',
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginTop: 0,
    marginLeft: 20,
  },

  text: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 110,
    marginLeft: 10,
  },

  button: {
    width: '32%',
    height: 60,
    marginTop: '15%',
    marginLeft: '65%',
    backgroundColor: 'white',
    borderRadius: 40,
  },
  textButton: {fontSize: 15, color: 'purple', fontWeight: 'bold'},
});

export default LandingPage;
