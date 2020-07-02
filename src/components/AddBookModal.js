import React, {Component} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image,
  // Platform,Animated
} from 'react-native';
import {
  Picker,
  Textarea,
  Content,
  Item,
  Input,
  Form,
  Label,
  Button,
  Fab,
  Icon,
} from 'native-base';
import {postBookActionCreator} from '../redux/actions/BookAction';

import {getGenreActionCreator} from '../redux/actions/GenreAction';
import {getAuthorActionCreator} from '../redux/actions/AuthorAction';
import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-picker';
class AddBookModal extends Component {
  state = {
    title: '',
    description: '',
    image: '',
    genre_id: '1',
    author_id: '1',
    status: 'Available',
    genre: [],
    author: [],
    isFill: true,
    isImage: true,
    isMatch: false,
    show: false,
    photo: '',
    active: false,
  };

  handlerChange = (name, e) => {
    // e.preventDefault()
    if (name === 'title' || name === 'description') {
      if (!e) {
        this.setState({isFill: false});
      }
    }
    if (e) {
      this.setState({isFill: true});
    }
    this.setState({[name]: e});
  };
  // handlerChangeImage = async (e) => {
  //     // console.log("saaaaa"+e)
  //     // e.preventDefault()
  //     if (e.files[0] === "undefined") {
  //         await this.setState({ image: this.state.image }, () => { })
  //     }

  //     if (e.files[0].size / 1024 / 1024 > 1) {
  //         this.setState({ isImage: false })
  //         this.setState({ image: this.state.image })
  //          alert("Image can't more than 2 mb,Image will not saved")
  //         // this.handleClose()
  //         return false
  //     }
  //     else {
  //         this.setState({ isImage: true })
  //         await this.setState({ image: e.files[0], checkErrorImage: false }, () => { })
  //     }
  // }

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
  openUpload = async () => {
    const options = {
      noData: true,
      skipBackup: true,
      path: 'images',
    };
    await ImagePicker.launchImageLibrary(options, response => {
      // if (!response.uri) {
      //     await    this.setState({ image: this.state.image }, () => { })
      // }

      if (response.fileSize / 1024 / 1024 > 2) {
        this.setState({isImage: false});
        this.setState({image: this.state.image});
        Alert.alert("Image can't more than 2 mb,Image will not saved");
        this.handleHide();
        return false;
      }
      if (response.uri) {
        let source = {
          name: 'image.jpg',
          size: response.fileSize,
          type: 'image/jpeg',
          uri: response.uri,
        };
        this.setState({photo: response});
        console.log('asssss = ', response);
        //  const source = { uri: 'data:image/jpeg;base64,' + response.data};

        this.setState({
          image: source,
          photo: 'asdd',
          checkErrorImage: false,
          isImage: true,
        });
      }
    });
  };
  handlerSubmit = async e => {
    // const {image}=this.state;
    if (!this.state.title || !this.state.description) {
      this.setState({isFill: false});

      Alert.alert("Data can't Empty");
      return false;
    }

    if (!this.state.image) {
      this.setState({isFill: false});

      console.log('image cannot empty');
      Alert.alert('Image Cannot Empty');
      return false;
    }

    let formData = new FormData();
    this.setState({isFill: true});
    this.setState({isImage: true});

    formData.append('title', this.state.title);
    formData.append('description', this.state.description);
    await formData.append('image', this.state.image);
    formData.append('genre_id', this.state.genre_id);
    formData.append('author_id', this.state.author_id);
    formData.append('status', this.state.status);

    try {
      await this.props.postBookAction(this.props.token, formData);
    } catch (error) {
      console.log({error});
    }

    // console.log(this.props)
    if (this.props.isLoading === false && this.props.isFulfilled === true) {
      this.handleHide();
      Alert.alert('Success', 'Add Book Successfully');
      //   return this.props.refresh();
    }
  };

  componentDidMount = async () => {
    // console.log(this.state.title)
    //   this.getData()
    if (this.props.dataAuthor.length <= 0) {
      await this.props.getAuthorAction(this.props.token);
    }
    if (this.props.dataGenre.length <= 0) {
      await this.props.getGenreAction(this.props.token);
    }
  };

  render() {
    //   const URL_BASE = 'http://10.0.2.2:8080';

    const {image} = this.state;
    // const { title, description, author_id, genre_id, image, status } = this.state

    // let btn
    // const { author, genre } = this.state
    const optionGenre = this.props.dataGenre.map(genre => {
      return <Picker.Item label={genre.name} value={genre.id} key={genre.id} />;
    });
    const optionAuthor = this.props.dataAuthor.map(author => {
      return (
        <Picker.Item label={author.name} value={author.id} key={author.id} />
      );
    });
    //   const [modalVisible, setModalVisible] = useState(false);
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
                <Text style={styles.textAddBook}>Add Book</Text>

                <Form>
                  <Image
                    source={this.state.avatarSource}
                    style={styles.uploadAvatar}
                  />
                  <Item stackedLabel>
                    <Label>Title</Label>
                    <Input onChangeText={e => this.handlerChange('title', e)} />
                  </Item>

                  <Item stackedLabel>
                    <Label>Description</Label>
                    <Textarea
                      style={styles.textArea}
                      rowSpan={5}
                      bordered
                      onChangeText={e => this.handlerChange('description', e)}
                    />
                  </Item>
                  <Item stackedLabel>
                    <Label style={styles.labelImage}>Image</Label>
                    {/* {/* <View> */}
                    {image.uri ? (
                      // <Text>{image}</Text>
                      <Image
                        source={{uri: image.uri}}
                        style={styles.imageStyle}
                      />
                    ) : (
                      <Text> No Image Choosen</Text>
                    )}
                  </Item>

                  <Button
                    bordered
                    style={styles.buttonImage}
                    onPress={this.openUpload}>
                    <Text>Choose File</Text>
                  </Button>

                  <Item>
                    <Text note>Genre</Text>

                    <Picker
                      note
                      mode="dropdown"
                      style={styles.picker}
                      selectedValue={this.state.genre_id}
                      onValueChange={e => this.handlerChange('genre_id', e)}>
                      {optionGenre}
                    </Picker>
                  </Item>
                  <Item>
                    <Text note>Author</Text>

                    <Picker
                      note
                      mode="dropdown"
                      style={styles.picker}
                      selectedValue={this.state.author_id}
                      onValueChange={e => this.handlerChange('author_id', e)}>
                      {optionAuthor}
                    </Picker>
                  </Item>
                  <Item>
                    <Text note>Status</Text>

                    <Picker
                      note
                      mode="dropdown"
                      style={styles.picker}
                      selectedValue={this.state.status}
                      onValueChange={e => this.handlerChange('status', e)}>
                      <Picker.Item label="Available" value="Available" />
                      <Picker.Item label="Unavailable" value="Unavailable" />
                    </Picker>
                  </Item>
                </Form>
              </Content>
              <TouchableHighlight
                style={styles.touchableStyle}
                onPress={e => this.handlerSubmit(e)}>
                <Text style={styles.textAddButton}>Add</Text>
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
        <Fab
          active={this.state.active}
          direction="up"
          style={styles.fabHome}
          position="bottomRight"
          onPress={() => this.setState({active: !this.state.active})}>
          <Icon name="home" />
          <Button
            style={styles.fabAdd}
            onPress={() => {
              this.handleShow();
              this.setState({active: !this.state.active});
            }}>
            <Icon name="add" style={styles.whiteColor} />
          </Button>
          <Button
            style={styles.fabBlack}
            onPress={() => {
              this.props.props.navigation.navigate('Author');
              this.setState({active: !this.state.active});
            }}>
            <Icon name="people" style={styles.whiteColor} />
          </Button>
          <Button
            style={styles.fabBlack}
            onPress={() => {
              this.props.props.navigation.navigate('Genre');
              this.setState({active: !this.state.active});
            }}>
            <Icon name="paper" style={styles.whiteColor} />
          </Button>
        </Fab>
      </>
    );
  }
}
const styles = StyleSheet.create({
  contentPadding: {width: 300},
  textAddBook: {fontSize: 40},
  textArea: {width: 250},
  labelImage: {marginBottom: 10},
  imageStyle: {width: 300, height: 300},
  buttonImage: {
    marginLeft: 20,
    width: 100,
    height: 20,
    backgroundColor: 'white',
  },
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
  fabAdd: {backgroundColor: 'hotpink'},
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
    postBookAction: async (token, body) => {
      await dispatch(postBookActionCreator(token, body));
    },
    getGenreAction: token => {
      dispatch(getGenreActionCreator(token));
    },
    getAuthorAction: token => {
      dispatch(getAuthorActionCreator(token));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddBookModal);
