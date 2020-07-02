import React, {Component} from 'react';
// import React, {Component, useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image,
  // KeyboardAvoidingView,
  //   Platform,
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
} from 'native-base';
import {editBookActionCreator} from '../redux/actions/BookAction';
import {getGenreActionCreator} from '../redux/actions/GenreAction';
import {getAuthorActionCreator} from '../redux/actions/AuthorAction';
import {REACT_APP_API} from 'react-native-dotenv';

import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-picker';

const URL_BASE = REACT_APP_API;

class EditBookModal extends Component {
  state = {
    id: this.props.data.id,
    title: this.props.data.title,
    description: this.props.data.description,
    image: this.props.data.image,
    genre_id: this.props.data.genre_id,
    genre_name: this.props.data.genre,
    author_name: this.props.data.author,
    author_id: this.props.data.author_id,
    status: this.props.data.status,
    checkErrorImage: false,
    isDone: false,
    data: {},
    author: [],
    genre: [],
    show: false,
    isImage: true,
    isFill: true,
    photo: '',
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
  // e.preventDefault()
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

  componentDidUpdate = async prevProps => {
    console.log(this.props.title);
    console.log(this.props.data);
    if (prevProps.data !== this.props.data) {
      await this.setState({
        id: this.props.data.id,
        title: this.props.data.title,
        description: this.props.data.description,
        image: this.props.data.image,
        genre_id: this.props.data.genre_id,
        genre_name: this.props.data.genre,
        author_name: this.props.data.author,

        author_id: this.props.data.author_id,
        status: this.props.data.status,
        // data: response.data.data
      });
    }
  };

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
    // const {image} = this.state;
    console.log(this.state.image);
    let formData = new FormData();
    // const photo = {
    //     uri: photo.uri,
    //     type: 'image/jpg',
    //     name: newUser.avatar.fileName,
    // };
    // e.preventDefault()
    // if (!this.state.title || !this.state.description) {
    //     this.setState({isFill:false})

    //     // alert("Data can't Empty")
    //     return false
    // }

    //  this.setState({isDone:true})
    //  const id=this.props.match.params.id
    if (this.state.isFill === true) {
      formData.append('title', this.state.title);
      formData.append('description', this.state.description);
      // if(this.state.photo!==''){
      //     await formData.append('image', {uri: image.uri, name: image.fileName, type: 'image/jpg'})
      //     console.log(this.state.photo.fileName)
      //     console.log(this.state.photo.type)
      // }
      // // }
      // else{
      await formData.append('image', this.state.image);
      // }

      formData.append('genre_id', this.state.genre_id);
      formData.append('author_id', this.state.author_id);
      formData.append('status', this.state.status);

      try {
        await this.props.editBookAction(
          this.props.token,
          this.props.id,
          formData,
        );
      } catch (error) {
        console.log({error});
      }

      // console.log(this.props)
      if (this.props.isLoading === false && this.props.isFulfilled === true) {
        this.handleHide();
        // return this.props.refresh();
      }
      //   console.log({error});
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
        {/* <View>
                { photo ?


            <Image source={{uri:photo.uri}} style={{width:300,height:300}}/>
            :<Text>sdasd</Text>
        }
            </View> */}

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.show}
          onRequestClose={() => {
            this.setState({show: false});
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Content style={styles.content}>
                <Text style={styles.titleEdit}>Edit Book</Text>
                <Form>
                  <Image
                    source={this.state.avatarSource}
                    style={styles.uploadAvatar}
                  />
                  <Item stackedLabel>
                    <Label>Title</Label>
                    <Input
                      defaultValue={this.props.data.title}
                      onChangeText={e => this.handlerChange('title', e)}
                    />
                  </Item>

                  <Item stackedLabel>
                    <Label>Description</Label>
                    <Textarea
                      rowSpan={5}
                      style={styles.textArea}
                      bordered
                      defaultValue={this.props.data.description}
                      onChangeText={e => this.handlerChange('description', e)}
                    />
                  </Item>
                  {/* <Item stackedLabel>
              <Label>Image</Label>
              <Input defaultValue={this.props.data.fileName} />
            // </Item> */}
                  <Item stackedLabel>
                    <Label style={styles.labelImage}>Image</Label>
                    {/* {/* <View> */}
                    {image.uri ? (
                      // <Text>{image}</Text>
                      <Image source={{uri: image.uri}} style={styles.image} />
                    ) : (
                      <Image
                        source={{
                          uri:
                            `${URL_BASE}/public/image/` + this.props.data.image,
                        }}
                        style={styles.image}
                      />
                    )}

                    <Input disabled defaultValue={this.props.data.image} />
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
                      style={styles.pickerWidth}
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
                      style={styles.pickerWidth}
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
                      style={styles.pickerWidth}
                      selectedValue={this.state.status}
                      onValueChange={e => this.handlerChange('status', e)}>
                      <Picker.Item label="Available" value="Available" />
                      <Picker.Item label="Unavailable" value="Unavailable" />
                    </Picker>
                  </Item>
                </Form>
              </Content>
              {/* <KeyboardAvoidingView> */}
              <TouchableHighlight
                style={styles.editButton}
                onPress={e => this.handlerSubmit(e)}>
                <Text style={styles.editTextButton}>Edit</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={styles.cancelButton}
                onPress={() => {
                  this.setState({image: this.props.data.image});
                  this.handleHide();
                }}>
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableHighlight>
              {/* </KeyboardAvoidingView> */}
            </View>
          </View>
        </Modal>

        <TouchableHighlight
          style={styles.openButton}
          onPress={() => {
            this.handleShow();
          }}>
          <Text style={styles.textStyle}>Edit Book</Text>
        </TouchableHighlight>
      </>
    );
  }
}
const styles = StyleSheet.create({
  content: {width: 300},
  titleEdit: {fontSize: 40},
  labelImage: {marginBottom: 10},
  image: {width: 300, height: 300},
  buttonImage: {
    marginLeft: 20,
    width: 100,
    height: 20,
    backgroundColor: 'white',
  },
  pickerWidth: {width: 120},
  editButton: {
    backgroundColor: 'deeppink',
    padding: 10,
    elevation: 2,
    marginTop: 10,
    // marginLeft: '70%',
    // backgroundColor: '#2196F3',
  },
  editTextButton: {
    elevation: 2,
    paddingLeft: 20,
    paddingRight: 20,
    color: 'white',
  },
  cancelButton: {
    padding: 10,
    elevation: 2,
    marginLeft: '70%',
    backgroundColor: '#2196F3',
    position: 'absolute',
    bottom: 35,
    right: 35,
  },
  textArea: {width: 250},
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
    backgroundColor: 'grey',

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
    editBookAction: async (token, id, body) => {
      await dispatch(editBookActionCreator(token, id, body));
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
)(EditBookModal);
