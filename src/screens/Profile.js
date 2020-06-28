import React, {Component} from 'react';
import {
  Container,
  Thumbnail,
  Button,
  Text,
  Icon,
  Card,
  CardItem,
  Left,
  Right,
  Item,
  View,
} from 'native-base';
import {Image, Alert, ImageBackground, StyleSheet} from 'react-native';
// import {Link} from '@react-navigation/native';
import ChangePassword from '../components/ChangePassword';

// import FooterMenu from '../components/FooterMenu'
// import CustomHeader from '../components/CustomHeader'

import AsyncStorage from '@react-native-community/async-storage';
import {putUserActionCreator} from '../redux/actions/UserAction.js';

import {logoutUserActionCreator} from '../redux/actions/UserAction.js';
import {connect} from 'react-redux';
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      role: '',
      token: '',
      id: '',
    };
  }
  getStoreData = async name => {
    try {
      const value = await AsyncStorage.getItem(`${name}`);

      if (name === 'email') {
        this.setState({email: value});
      }
      if (name === 'role') {
        this.setState({role: value});
      }
      if (name === 'token') {
        this.setState({token: value});
      }
      if (name === 'id') {
        this.setState({id: value});
      }
      return value;
    } catch (e) {
      // error reading value
    }
  };
  componentDidMount = async () => {
    await this.getStoreData('email');
    await this.getStoreData('role');
    await this.getStoreData('token');
    await this.getStoreData('id');
    // if(this.props.email &&this.state.email!==""){
    //   this.setState({email:this.props.email})

    // }
  };
  logout = async () => {
    Alert.alert(
      'Confirmation',
      'Are You Sure To Logout ?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            await this.props.logoutUserAction();
            await AsyncStorage.clear().then(response => {
              Alert.alert('Thank You..');
              this.props.navigation.navigate('Login');
            });
          },
        },
      ],
      {
        cancelable: false,
      },
    );
  };

  render() {
    return (
      <Container>
        {/* <CustomHeader name="Profile" props={this.props}/> */}
        <ImageBackground
          source={require('../../image/profilebackground.jpeg')}
          style={styles.container}>
          <Card transparent style={styles.card}>
            {/* <Thumbnail  source={require('../../image/nasa.png')} style={{borderRadius:60}}/> */}
            <Text style={styles.title}>Hi Astro</Text>

            <CardItem transparent style={styles.cardItem1}>
              <Text style={styles.textCardTitle}>Astro Member</Text>

              <Thumbnail
                source={require('../../image/nasa.png')}
                style={styles.thumbnail}
              />

              {/* <Left style={{top:0,left:0,position:"absolute"}}> */}
              <Image
                style={styles.image}
                source={require('../../image/photoprofile.png')}
              />
              {/* </Left> */}
              <Right>
                <Item style={styles.item}>
                  <Text style={styles.textEmail}>
                    {this.props.email ? this.props.email : this.state.email}{' '}
                  </Text>
                </Item>

                {(this.props.role ? this.props.role : this.state.role) ===
                  '1' ||
                (this.props.role ? this.props.role : this.state.role) === 1 ? (
                  <Text style={styles.textRole}>Admin</Text>
                ) : (
                  <Text style={styles.textRole}>User</Text>
                )}
              </Right>
            </CardItem>

            <CardItem transparent style={styles.cardItem2}>
              <Left>
                {(this.props.role ? this.props.role : this.state.role) ===
                  '1' ||
                (this.props.role ? this.props.role : this.state.role) === 1 ? (
                  <Button
                    style={styles.buttonUser}
                    onPress={() => this.props.navigation.navigate('User')}>
                    <Icon style={styles.iconUser} name="person" />
                    <Text style={styles.white}>User List</Text>
                  </Button>
                ) : (
                  <ChangePassword
                    token={
                      this.props.token ? this.props.token : this.state.token
                    }
                    id={this.props.id ? this.props.id : this.state.id}
                    props={this.props}
                  />
                )}
              </Left>
              <Right>
                <Button style={styles.buttonLogout} onPress={this.logout}>
                  <Thumbnail small source={require('../../image/logout.png')} />
                  <Text style={styles.black}>Logout</Text>
                </Button>
              </Right>
            </CardItem>
          </Card>
        </ImageBackground>
        <View>
          {/* <Footer >
         {this.props.route.params.role==1?
           <FooterMenu role="1"  type="profile"  props={this.props}/>
             :
             <FooterMenu role="2" type="profile"  props={this.props}/>

         }
      </Footer> */}
        </View>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {flex: 1},

  view: {height: '150%'},
  card: {backgroundColor: 'rgba(52, 52, 52, 0)'},
  imageBackground: {
    height: 270,
    width: null,
    flex: 1,
    borderRadius: 25,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 30,
    padding: 20,
    fontStyle: 'italic',
    color: 'white',
    textAlign: 'center',
  },
  cardItem1: {
    backgroundColor: 'white',
    marginLeft: 10,
    marginRight: 10,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  cardItem2: {
    backgroundColor: 'white',
    marginLeft: 10,
    marginRight: 10,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  textCardTitle: {
    fontSize: 20,
    padding: 10,
    color: 'goldenrod',
    textAlign: 'center',
    position: 'absolute',
    top: 0,
    left: 130,
  },
  thumbnail: {borderRadius: 60, position: 'absolute', right: 0, top: 0},
  image: {height: 100, width: 100, borderRadius: 100, top: 0, left: 0},
  item: {marginLeft: 20},
  textEmail: {marginTop: 30, color: 'black', marginLeft: '10%', width: '100%'},
  textRole: {
    fontSize: 30,
    padding: 10,
    fontStyle: 'italic',
    color: 'black',
    marginLeft: '20%',
  },
  buttonUser: {backgroundColor: 'navy', borderRadius: 5},
  iconUser: {color: 'white', marginLeft: 10},
  white: {color: 'white'},
  black: {color: 'black'},
  buttonLogout: {backgroundColor: 'white', borderRadius: 5},
});

const mapStateToProps = ({reducerUser}) => {
  return {
    isRejected: reducerUser.isRejected,
    email: reducerUser.email,
    role: reducerUser.role,
    token: reducerUser.token,
    id: reducerUser.id,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    logoutUserAction: async () => {
      await dispatch(logoutUserActionCreator());
    },
    putUserAction: (token, id, body) => {
      dispatch(putUserActionCreator(token, id, body));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);
