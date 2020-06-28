import React, {Component} from 'react';
import {Button, Text, View, Item, Input} from 'native-base';
// import {View} from 'react-native';
// import {Link} from '@react-navigation/native';
// import {StyleSheet} from 'react-native';
import {Alert, ImageBackground} from 'react-native';
import styles from '../styles/Auth';
// import { registerUser } from '../utils/http';
import {registerUserActionCreator} from '../redux/actions/UserAction.js';
import {connect} from 'react-redux';
class Register extends Component {
  async componentDidMount() {}
  // constructor(){}
  state = {
    email: '',
    password: '',
    password2: '',
    role: '2',
    isEmpty: true,
    isEmptyEmail: true,
    isEmptyPassword: true,
    isSuccess: false,
    isEmailValid: true,
    isMatch: true,
    isShow: false,
    emailExist: '',
  };
  handleHide = () => {
    this.setState({isShow: false});
  };
  handleShow = () => {
    this.setState({isShow: true});
  };
  handlerChange = (name, e) => {
    //  console.log(e.nativeEvent.text)
    //  console.log(name)

    if (e.nativeEvent.text) {
      this.setState({isSuccess: false});
      this.setState(
        {
          [name]: e.nativeEvent.text,
          isEmpty: false,
          isEmptyEmail: false,
          isEmptyPassword: false,
        },
        () => {},
      );
      console.log(this.state.email);
      console.log(this.state.password);
    } else {
      this.setState({
        isEmpty: true,
        [name]: '',
      });
    }
  };
  register = async e => {
    // this.setState({ isSuccess: true })
    console.log(this.state);
    if (this.state.email) {
      if (
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)
      ) {
        // this.setState({ isEmailValid: false })

        Alert.alert('You have entered an invalid email address!');
        return false;
      }
    }
    if (!this.state.email || this.state.email === '') {
      Alert.alert('Caution', 'email Cannot Empty');
      this.setState({isEmptyEmail: true});
      return;
    }
    if (this.state.password.length < 4 || this.state.password.length > 16) {
      // return false
      Alert.alert('Caution', 'The password must be 5-16 characters');
      return false;
    }
    if (!this.state.password || this.state.password === '') {
      Alert.alert('password Cannot Empty');
      this.setState({isEmptyPassword: true});
      return;
    }

    if (this.state.password2 !== this.state.password) {
      Alert.alert('Caution', "password and Re-Enter Password Doesn't Match");
      this.setState({isMatch: false});
      return false;
    } else {
      this.setState({isMatch: true});
    }

    if (this.state.isEmpty === false && this.state.password.length > 4) {
      // this.setState({ isSuccess: true })
      console.log(this.state);
      // e.preventDefault()
      const {email, password, role} = this.state;

      try {
        await this.props.registerUserAction({email, password, role});
        this.setState({isSuccess: true});
        console.disableYellowBox = true;
      } catch (error) {
        Alert.alert('Register Failed', 'Email has Taken');
      }

      if (this.props.isRejected === true) {
        Alert.alert('Register Failed', 'Email has Taken');
      }

      // this.setState({ isShow: true })
      // await registerUser({
      //     email,
      //     password,
      //     role

      // })
      //     .then((response) => {

      //         // console.log(this.state)
      //         console.log(response)
      //         if (response.data.status === 200) {
      //             this.state.isSuccess = true
      //             this.setState({ isSuccess: true })
      //             console.log(this.state.isSuccess)
      //             alert("Register success")

      //             // console.log(response)
      //             this.setState({ email: email })
      //             this.setState({ password: password })
      //             this.setState({ role: role })
      //             this.props.navigation.navigate('Login')
      //         }
      //         else if (response.data.status === 400) {
      //             alert("Email has taken")
      //         }
      //         else if (response.data.status === 500) {
      //             alert("error")
      //         }
      //         else if (response.status === 204) {
      //             console.log('cant null')
      //             alert("email and password must have Value");
      //         }
      //         else {
      //             alert("Register Failed");
      //         }
      //     })
      //     .catch((error) => {
      //         // alert("Email has taken")
      //         // console.log(error)
      //         console.log("aduh error")

      //     })
    }
  };
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
        {this.state.isSuccess === true && this.props.isFulfilled === true ? (
          Alert.alert(
            'Register Success',
            'You can Login Now',
            [
              {
                text: 'OK',
                onPress: () => this.props.navigation.navigate('Login'),
              },
            ],
            {cancelable: false},
          )
        ) : (
          <></>
        )}

        <Text style={styles.logo}>R e g i s t e r</Text>

        {/* <Text style={{ padding: 10, paddingTop: 5 }}>Email Address</Text> */}
        <View style={styles.inputView}>
          <Item>
            <Input
              style={styles.inputText}
              placeholder="Email"
              name="email"
              placeholderTextColor="white"
              onChange={e => this.handlerChange('email', e)}
            />
          </Item>
          {this.state.email &&
          // eslint-disable-next-line prettier/prettier
          (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)) ? (
            <Text note style={styles.greenColor}>
              Looks Good !!
            </Text> // <Text style={{color: 'red'}}>Input Valid email</Text>
          ) : (
            <Text note style={styles.yellowColor}>
              Hint : Input valid Email ( ex : xxx@gmail.com)
            </Text>
          )}
        </View>
        {/* <Text style={{ padding: 10, paddingTop: 5 }}>Password</Text> */}
        <View style={styles.inputView}>
          <Item>
            <Input
              style={styles.inputText}
              placeholder="Password"
              placeholderTextColor="white"
              secureTextEntry
              name="password"
              onChange={e => this.handlerChange('password', e)}
            />
          </Item>
          {this.state.password && this.state.password.length <= 4 ? (
            <Text note style={styles.redColor}>
              Password must 5-16 character
            </Text>
          ) : (
            <></>
          )}
        </View>

        {/* <Text style={{ padding: 10, paddingTop: 5 }}>Re-Enter Password</Text> */}
        <View style={styles.inputView}>
          <Item>
            <Input
              style={styles.inputText}
              placeholder="Repeat Password"
              placeholderTextColor="white"
              secureTextEntry
              name="password2"
              onChange={event => {
                if (event.nativeEvent.text) {
                  if (event.nativeEvent.text !== this.state.password) {
                    // <small style={{color:"red"}}>Doesn't match</small>
                  }
                  this.setState({
                    password2: event.nativeEvent.text,
                    isSame: false,
                    isEmpty: false,
                  });
                } else {
                  this.setState({
                    password2: '',
                    isSame: false,
                    isEmpty: true,
                  });
                }
              }}
            />
          </Item>
          {this.state.password2 &&
          this.state.password2 !== this.state.password ? (
            <Text note style={styles.redColor}>
              Password Doesn't Match
            </Text>
          ) : (
            <></>
          )}
        </View>
        {/* <Text style={{ padding: 10, paddingTop: 5 }}>Role</Text> */}
        {/* <View style={styles.inputView} >
                    <Item picker>
                        <Picker
                            mode="dropdown"
                            // iosIcon={<Icon name="arrow-down" />}
                            style={{ width: undefined }}
                            name="role"
                            placeholderStyle={{ color: "#bfc6ea" }}
                            placeholderIconColor="#007aff"
                            selectedValue={this.state.role}
                            onValueChange={(e) => this.handlerChange('role', e)}
                        >
                            <Picker.Item label="User" value="2" />
                        </Picker>
                    </Item>
                </View> */}

        <Button style={styles.loginBtn} onPress={this.register}>
          <Text style={styles.loginText}> SIGN UP </Text>
        </Button>

        <Item>
          <Text style={styles.inputText}>Already have an Account ?</Text>
          <Text
            style={styles.registerText}
            onPress={() => this.props.navigation.navigate('Login')}>
            {' '}
            Login{' '}
          </Text>
        </Item>
      </ImageBackground>
    );
  }
}

const mapStateToProps = ({reducerUser}) => {
  return {
    isRejected: reducerUser.isRejected,
    isFulfilled: reducerUser.isFulfilled,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    registerUserAction: async body => {
      await dispatch(registerUserActionCreator(body));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Register);
