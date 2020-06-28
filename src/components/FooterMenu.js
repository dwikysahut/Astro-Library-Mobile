// import React, { Component } from 'react';
// import { Image } from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';

// import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, FooterTab, Body, Right } from 'native-base';
// class FooterMenu extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {

//             data: [],
//             id: '',
//             name: '',
//             active: false,
//             role: this.props.role,
//             type: this.props.type

//         };
//     }
//     getStoreData = async (name) => {
//         try {
//             const value = await AsyncStorage.getItem(`${name}`)

//                 return value

//         } catch (e) {
//             // error reading value
//         }
//     }
//     componentDidMount() {
//         console.log(this.state.role)
//         console.log("ssss "+this.props.role)
//     }
//     render() {
//         // console.log(this.props.data, this.props.isFulfilled)
//         return (

//             <FooterTab style={{ backgroundColor: 'white' }}>
//                 {/* admin */}
//                 { this.props.role === "1" ||this.props.role=== 1?

//                     <>
//                         <Button vertical active={this.state.type === "books" ? true : false} onPress={async() => this.props.props.navigation.navigate('Books', {
//                             role: await this.getStoreData('role'),
//                         })}>
//                             <Icon name="book" />
//                             <Text>Books</Text>
//                         </Button>
//                         <Button vertical active={this.state.type === "author" ? true : false} onPress={async() => this.props.props.navigation.navigate('Author', {
//                             role:await this.getStoreData('role'),
//                         })}>
//                             <Icon name="people" />
//                             <Text>Author</Text>
//                         </Button>
//                         <Button vertical active={this.state.type === "borrow" ? true : false} onPress={async() => this.props.props.navigation.navigate('Borrow', {
//                             role: await this.getStoreData('role'),
//                             token: await this.getStoreData('token')
//                         })}>
//                             <Icon name="bookmarks" />
//                             <Text>Borrow</Text>
//                         </Button>
//                         <Button vertical active={this.state.type === "genre" ? true : false} onPress={async() => this.props.props.navigation.navigate('Genre', {
//                             role: await this.getStoreData('role'),
//                         })}>
//                             <Icon name="paper" />
//                             <Text>Genre</Text>
//                         </Button>

//                         <Button vertical active={this.state.type === "profile" ? true : false} onPress={async () => {
//                             this.props.props.navigation.navigate('Profile', {
//                                 email: await this.getStoreData('email'),
//                                 role: await this.getStoreData('role'),
//                             });
//                         }} >
//                             <Icon name="person" />
//                             <Text>User</Text>
//                         </Button>

//                     </>

//                     :
//                     <>
//                         <Button vertical active={this.state.type === "books" ? true : false} onPress={async() => this.props.props.navigation.navigate('Books', {
//                             role:await this.getStoreData('role'),
//                         })}>
//                             <Icon active name="book" />
//                             <Text>Books</Text>
//                         </Button>
//                         <Button vertical active={this.state.type === "borrow" ? true : false} onPress={async () => this.props.props.navigation.navigate('Borrow', {
//                             role: await this.getStoreData('role'),
//                             token: await this.getStoreData('token')
//                         })}>
//                             <Icon name="people" />
//                             <Text>Borrow</Text>
//                         </Button>
//                         <Button vertical active={this.state.type === "profile" ? true : false} onPress={async () =>
//                             this.props.props.navigation.navigate('Profile', {
//                                 email: await this.getStoreData('email'),
//                                 role: await this.getStoreData('role'),
//                             })
//                         } >
//                             <Icon name="person" />
//                             <Text>Profile</Text>
//                         </Button>
//                     </>
//                 }
//             </FooterTab>
//         );
//     }
// }
// export default FooterMenu;
