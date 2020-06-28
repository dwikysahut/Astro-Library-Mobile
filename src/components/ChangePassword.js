/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  TextInput,
} from 'react-native';
import {Content, Item, Input, Form, Button} from 'native-base';
import {putUserActionCreator} from '../redux/actions/UserAction.js';

import {connect} from 'react-redux';
// import ImagePicker from 'react-native-image-picker';
class ChangePassword extends Component {
  state = {
    show: false,
    password: '',
    repeatPassword: '',
  };

  handlerChange = (name, e) => {
    // e.preventDefault()
    if (name === 'password' || name === 'repeatPassword') {
      if (!e) {
        this.setState({isFill: false});
      }
    }
    if (e) {
      this.setState({isFill: true});
    }
    this.setState({[name]: e});
  };
  componentDidUpdate = async prevProps => {};

  handleHide = () => {
    this.setState({
      show: false,
    });
  };
  handleShow = () => {
    this.setState({
      show: true,
    });
  };
  handlerSubmit = async e => {
    //   console.log(this.state.password);
    const {password} = this.state;
    if (!this.state.password || !this.state.repeatPassword) {
      this.setState({isFill: false});

      Alert.alert("Field can't Empty");
      return false;
    }
    if (this.state.password.length <= 4) {
      return false;
    }
    if (this.state.repeatPassword !== this.state.password) {
      return false;
    }

    this.setState({isFill: true});
    // this.setState({isImage: true});
    try {
      await this.props.putUserAction(this.props.token, this.props.id, {
        password,
      });
    } catch (error) {
      console.log(error);
    }

    // console.log(this.props)
    if (this.props.isLoading === false && this.props.isFulfilled === true) {
      this.handleHide();
      Alert.alert('Success', 'Change Password Successfully');
      this.setState({password: '', repeatPassword: ''});
      //   return this.props.refresh();
    }
    // console.log({error})

    // }
  };

  componentDidMount = async () => {};

  render() {
    return (
      <>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.show}
          onRequestClose={() => {
            this.setState({show: false});
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Content padder style={styles.contentPadding}>
                <Text style={styles.textAddBook}>Change Password</Text>

                <Form>
                  <Item>
                    <TextInput
                      style={{
                        borderColor:
                          this.state.password && this.state.password.length <= 4
                            ? 'red'
                            : 'grey',
                        borderBottomWidth: 1,
                        width: '100%',
                      }}
                      placeholder="New Password"
                      value={this.state.password}
                      placeholderTextColor="black"
                      secureTextEntry
                      onChangeText={e => this.handlerChange('password', e)}
                    />
                  </Item>
                  {this.state.password && this.state.password.length <= 4 ? (
                    <Text note style={styles.noteText}>
                      Password must more than 4 Character
                    </Text>
                  ) : (
                    <></>
                  )}
                  <Item>
                    <Input
                      style={{
                        marginTop: 10,
                        borderColor:
                          this.state.repeatPassword &&
                          this.state.repeatPassword !== this.state.password
                            ? 'red'
                            : 'grey',
                        borderBottomWidth: 1,
                        width: '100%',
                      }}
                      placeholder="Re-enter New Password"
                      value={this.state.repeatPassword}
                      placeholderTextColor="black"
                      secureTextEntry
                      onChangeText={e =>
                        this.handlerChange('repeatPassword', e)
                      }
                    />
                  </Item>
                  {this.state.repeatPassword &&
                  this.state.repeatPassword !== this.state.password ? (
                    <Text note style={styles.noteText}>
                      Password Doesn't Match
                    </Text>
                  ) : (
                    <></>
                  )}
                </Form>
              </Content>
              <TouchableHighlight
                style={styles.touchableStyle}
                onPress={e => this.handlerSubmit(e)}>
                <Text style={styles.textAddButton}>Change</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={styles.touchableStyleCancel}
                onPress={() => {
                  this.handleHide();
                }}>
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
        <Button
          transparent
          style={styles.fabAdd}
          onPress={() => {
            this.handleShow();
            this.setState({active: !this.state.active});
          }}>
          <Text style={styles.changePassword}>Change Password</Text>
        </Button>
      </>
    );
  }
}
const styles = StyleSheet.create({
  contentPadding: {width: 300},
  textAddBook: {fontSize: 20},
  texArea: {width: 250},
  labelImage: {marginBottom: 10},
  imageStyle: {width: 300, height: 300},
  buttonImage: {
    marginLeft: 20,
    width: 100,
    height: 20,
    backgroundColor: 'white',
  },
  noteText: {marginLeft: 20, color: 'red'},

  picker: {width: 120},
  touchableStyle: {
    backgroundColor: 'deeppink',
    padding: 10,
    elevation: 2,
    marginTop: 10,
    // marginLeft: '70%',
    // backgroundColor: '#2196F3',
  },
  textAddButton: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  changePassword: {
    color: 'navy',
  },
  touchableStyleCancel: {
    padding: 10,
    elevation: 2,
    marginLeft: '70%',
    backgroundColor: '#2196F3',
    position: 'absolute',
    bottom: 35,
    right: 35,
  },
  fabHome: {backgroundColor: 'navy'},
  fabAdd: {backgroundColor: 'white'},
  whiteColor: {color: 'white'},
  fabBlack: {backgroundColor: 'black'},

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    height: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',

    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

const mapStateToProps = ({reducerGenre, reducerAuthor, reducerBook}) => {
  return {
    isLoading: reducerBook.isLoading,
    isRejected: reducerBook.isRejected,
    isFulfilled: reducerBook.isFulfilled,
    errorToken: reducerBook.errorToken,
    name: reducerGenre.name,
    //   data:reducerBook.dataDetail,
    dataGenre: reducerGenre.data,
    dataAuthor: reducerAuthor.data,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    putUserAction: async (token, id, body) => {
      await dispatch(putUserActionCreator(token, id, body));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChangePassword);
