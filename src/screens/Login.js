import React, {Component} from 'react';
import {Button, Text, View, Item, Input} from 'native-base';
import {Alert, ImageBackground} from 'react-native';
// import {Link} from '@react-navigation/native';
// import { ImageBackground} from "react-native";
// import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import styles from '../styles/Auth';
// import {loginUser} from '../utils/http';
import {loginUserActionCreator} from '../redux/actions/UserAction.js';
import {connect} from 'react-redux';

class Login extends Component {
  state = {
    email: '',
    password: '',
    token: '',
    role: '',
    isLogin: false,
    validEmail: false,
    validPassword: false,
    isEmptyEmail: true,
    isEmptyPassword: true,
    isMatch: false,
    isShow: false,
  };

  storeData = async (name, value) => {
    try {
      await AsyncStorage.setItem(`${name}`, value.toString());
    } catch (e) {
      // saving error
    }
  };

  getStoreData = async name => {
    try {
      const value = await AsyncStorage.getItem(`${name}`);
      if (value !== null) {
        if (name === 'role') {
          this.setState({role: value});
        }
        if (name === 'token') {
          this.setState({token: value});
        }
        console.log(value);
        return value;
      }
    } catch (e) {
      // error reading value
    }
  };
  componentDidUpdate(prevState) {
    if (prevState.email !== this.state.email) {
      this.componentDidMount();
    }
  }
  handleHide = () => {
    this.setState({isShow: false});
  };
  handleShow = () => {
    this.setState({isShow: true});
  };
  login = async e => {
    // e.preventDefault()
    const {email, password} = this.state;
    if (this.state.email === '') {
      Alert.alert('Caution', 'email Cannot Empty!!');
      this.setState({isEmptyEmail: true});
      return;
    }
    if (!this.state.validEmail) {
      Alert.alert('Email Not Valid');
      this.setState({isEmptyPassword: true});
      return;
    }
    if (this.state.password === '') {
      Alert.alert('password Cannot Empty');
      this.setState({isEmptyPassword: true});
      return;
    }
    if (this.state.validPassword === false) {
      Alert.alert('password must 5-16 characters');
    } else {
      if (this.props.isRejected === false) {
        // Alert.alert('berhasil')
        this.setState({isMatch: true});
        // this.props.navigation.navigate('Books')
      }
    }

    this.setState({isShow: true});
    // this.setState({ isMatch: true })

    // await this.props.loginUserAction({email, password});
    // this.setState({isShow: true});
    // await  this.storeData('role',response.data.data.role)
    // await  this.storeData('id',response.data.data.id)
    // await  this.storeData('id_user',response.data.data.id)
    // await this.storeData('email',response.data.data.email)
    // await this.storeData('refreshToken',response.data.data.refreshToken)
    // await this.storeData('token',response.data.data.token)
    // await this.setState({isLogin: true, show: true})
    if (this.state.validEmail && this.state.validPassword) {
      await this.props.loginUserAction({email, password});
      console.log(this.props.error);
      if (this.props.error === 204) {
        this.setState({isMatch: false});
        Alert.alert('Ooppss..', 'Incorrect Username or Password');

        return false;
      }

      this.setState({isShow: true});
      if (this.props.token) {
        await this.storeData('role', this.props.role);
        await this.storeData('id', this.props.id);
        await this.storeData('id_user', this.props.id_user);
        await this.storeData('email', this.props.email);
        await this.storeData('refreshToken', this.props.refreshToken);
        await this.storeData('token', this.props.token);
        this.setState({email: '', password: ''});

        if (await this.getStoreData('token')) {
          // Alert.alert('Login success');
          this.props.navigation.navigate('Home');
        }
      }
      // await loginUser({
      //   email,
      //   password,
      // })
      //   .then( async (response) => {
      //     console.log(response.data);
      //     if (response.data.status === 200) {
      //       this.setState({isShow: false});
      //     await  this.storeData('role',response.data.data.role)
      //     await  this.storeData('id',response.data.data.id)
      //     await  this.storeData('id_user',response.data.data.id)
      //     await this.storeData('email',response.data.data.email)
      //     await this.storeData('refreshToken',response.data.data.refreshToken)
      //     await this.storeData('token',response.data.data.token)
      //     await this.setState({isLogin: true, show: true})

      //       if(await this.getStoreData('token')){
      //         Alert.alert("Login success")
      //         this.props.navigation.navigate('Home', {
      //           token:   await this.getStoreData('token'),
      //           role:   await this.getStoreData('role'),
      //            });;
      //       };

      //     } else if (
      //       response.status === 204

      //     ) {
      //       this.setState({isMatch: false});

      //       console.log(response.statusText);
      //       console.log('Incorrect Username or password');
      //       Alert.alert("Incorrect Username or password");
      //     }
      //   })
      //   .catch(error => {
      //     console.log(this.state);
      //     console.log(error);
      //   });
    }
  };
  componentDidMount() {}
  shouldComponentUpdate() {
    return true;
  }
  render() {
    // const { isLogin } = this.state
    // let valid = 'form-control is-valid';
    // let invalid = 'form-control is-invalid';

    return (
      <ImageBackground
        source={require('../../image/profilebackground.jpeg')}
        style={styles.container}>
        {/* <Container style={styles.container}> */}
        <Text style={styles.logo}>L o g i n</Text>

        {/* <Text style={{ padding: 10, paddingTop: 5 }}>Email Address</Text> */}
        <View style={styles.inputView}>
          <Item>
            <Input
              style={styles.inputText}
              placeholder="Email"
              value={this.state.email}
              placeholderTextColor="white"
              onChange={event => {
                if (
                  event.nativeEvent.text &&
                  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                    event.nativeEvent.text,
                  )
                ) {
                  this.setState({
                    email: event.nativeEvent.text,
                    validEmail: true,
                    isEmptyEmail: false,
                  });
                } else {
                  this.setState({
                    email: event.nativeEvent.text,
                    validEmail: false,
                  });
                }
              }}
            />
            {/* <Icon name='close-circle' /> */}
            {/* <Icon name='checkmark-circle' /> */}
          </Item>
        </View>
        {/* <Text style={{ padding: 10, paddingTop: 5 }}>Password</Text> */}
        <View style={styles.inputView}>
          <Item>
            <Input
              style={styles.inputText}
              placeholder="Password"
              value={this.state.password}
              placeholderTextColor="white"
              secureTextEntry
              onChange={event => {
                if (
                  event.nativeEvent.text &&
                  event.nativeEvent.text.length > 4
                ) {
                  this.setState({
                    password: event.nativeEvent.text,
                    validPassword: true,
                    isEmptyPassword: false,
                  });
                }
                if (
                  event.nativeEvent.text &&
                  event.nativeEvent.text.length <= 4
                ) {
                  this.setState({
                    password: event.nativeEvent.text,
                    isEmptyPassword: false,
                    validPassword: false,
                  });
                }
              }}
            />
          </Item>
        </View>
        {/* <Button onPress={() => navigation.navigate('Home')} dark>
            <Text style={styles.textProfile}>Go To Home</Text>
          </Button> */}

        <Button style={styles.loginBtn} onPress={this.login}>
          <Text style={styles.loginText}> LOGIN </Text>
        </Button>
        <Item>
          <Text style={styles.inputText}>Don't have an account yet?</Text>
          <Text
            style={styles.registerText}
            onPress={() => this.props.navigation.navigate('Register')}>
            {' '}
            Register{' '}
          </Text>
        </Item>
        {/* </Container> */}
      </ImageBackground>
    );
  }
}
// const styles = StyleSheet.create({
//   view: { height: "150%" },
//   card: { height: 400, backgroundColor: "white" },
//   imageBackground:{
//     height: 270, width: null, flex: 1, borderRadius: 25,
//     resizeMode: 'cover',
//   },
//   image: { height: 180, width: 120, borderRadius: 0, marginLeft: "-42%", marginTop: 200 },
//   body: { paddingLeft: 10 },
//  textTitle: { fontSize: 20, color: "black", marginLeft: "40%", fontWeight: "bold" },
//   text: { fontSize: 20, fontWeight: "bold" },
//   textDateAdd:{ color: "black",marginLeft: 10, marginTop: 20 },
//   textDateUpdate:{ color: "black",  marginLeft: 10 ,marginBottom:20},
//  deleteButton: { marginLeft: 10, width: "12%" },
//   buttonNotDelete:{ marginLeft: 10, width: "55%" },
//   borrowButton:{
//     marginTop: "10%", position: "absolute",
//     marginLeft: "50%", borderWidth: 1,
//     borderColor: 'rgba(0,0,0,0.2)',
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: "60%",
//     // height: 60,
//     borderRadius: 50,
//   },
//   item: {
//     backgroundColor: '#f9c2ff',
//     padding: 20,
//     marginVertical: 8,
//     marginHorizontal: 16,
//   },
//   title: {
//     fontSize: 32,
//   },
// });
const mapStateToProps = ({reducerUser}) => {
  return {
    isRejected: reducerUser.isRejected,
    dataLogin: reducerUser.dataLogin,
    error: reducerUser.error,
    token: reducerUser.token,
    role: reducerUser.role,
    email: reducerUser.email,
    id: reducerUser.id,
    id_user: reducerUser.id_user,
    refreshToken: reducerUser.refreshToken,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    loginUserAction: async body => {
      await dispatch(loginUserActionCreator(body));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
