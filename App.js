import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {Icon} from 'native-base';
// import AsyncStorage from '@react-native-community/async-storage';
import Home from './src/screens/Home';
import Author from './src/screens/Author';
import Genre from './src/screens/Genre';
import User from './src/screens/User';
import Detail from './src/screens/DetailBook';
import AllBooks from './src/screens/AllBooks';
import BookByGenre from './src/screens/BooksByGenre';

import LandingPage from './src/screens/LandingPage';
import {StyleSheet} from 'react-native';
import Borrow from './src/screens/Borrow';
import ManageGenre from './src/screens/ManageGenre';
import ManageAuthor from './src/screens/ManageAuthor';

import Books from './src/screens/Books';
// import EditAuthor from './src/screens/ManageAuthor';

import Profile from './src/screens/Profile';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
// import Dimensions from './src/screens/Dimensions';

import {Provider} from 'react-redux';
import store from './src/redux/store';
const {Navigator, Screen} = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const App = () => {
  return (
    //   <NavigationContainer>
    //     <Provider store={store}>

    // </Provider>
    // </NavigationContainer>

    <NavigationContainer>
      <Provider store={store}>
        <Navigator initialRouteName="Splash">
          <Screen
            name="Splash"
            component={Home}
            options={{
              headerShown: false,
            }}
          />
          <Screen
            name="Home"
            component={HomeTabNav}
            options={{
              headerShown: false,
            }}
          />
          <Screen
            name="LandingPage"
            component={LandingPage}
            options={{
              headerShown: false,
            }}
          />
          <Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
          <Screen
            name="Register"
            component={Register}
            options={{
              headerShown: false,
            }}
          />
          <Screen name="Manage Author" component={ManageAuthor} />

          <Screen name="Manage Genre" component={ManageGenre} />
          <Screen
            name="Author"
            component={Author}
            options={{
              headerShown: true,
            }}
          />
          <Screen
            name="Genre"
            component={Genre}
            options={{
              headerShown: true,
            }}
          />
          <Screen
            name="Book-List"
            component={AllBooks}
            options={{
              headerShown: false,
            }}
          />
          <Screen
            name="BooksByGenre"
            component={BookByGenre}
            options={{
              headerShown: false,
            }}
          />
          <Screen name="User" component={User} />
          <Screen
            name="Borrow"
            component={Borrow}
            options={{
              headerShown: false,
            }}
          />
          <Screen
            name="Detail"
            component={Detail}
            options={{
              headerShown: false,
            }}
          />
          {/* <Screen
            name="Profile"
            component={Profile}
            options={{
              headerShown: true
            }}
          /> */}
          {/* <Screen name="Dimensions" component={Dimensions} /> */}
        </Navigator>
      </Provider>
    </NavigationContainer>
  );
};
function HomeTabNav() {
  return (
    <Tab.Navigator
      initialRouteName="Books"
      // activeColor="#f0edf6"
      inactiveColor="#b0e0e6"
      activeColor="black"
      shifting={true}
      barStyle={styles.barstyle}>
      <Tab.Screen
        name="Books"
        component={Books}
        options={{
          tabBarIcon: () => <Icon style={styles.colorIcon} name="book" />,
        }}
      />
      <Tab.Screen
        name="Borrow"
        component={Borrow}
        options={{
          tabBarIcon: () => <Icon style={styles.colorIcon} name="bookmarks" />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: true,
          tabBarIcon: () => <Icon style={styles.colorIcon} name="person" />,
        }}
      />
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  barstyle: {backgroundColor: 'white', height: 50},
  colorIcon: {color: '#191970'},
});
// function ProfileScreen() {
//   return (
//   <Navigator initialRouteName="Profile">
//   <Screen name="User" component={User} />
//   <Screen name="Books" component={Books} options={{
//     headerShown: false,
//   }} />

//   <Screen
//     name="Profile"
//     component={Profile}
//     options={{
//       headerShown: true, headerLeft: null
//     }}
//   />
//   {/* <Screen name="Dimensions" component={Dimensions} /> */}
// </Navigator>
//   )
// }
// function BorrowScreen() {
//   return (
//   <Navigator tabBarOptions={{
//     style: {
//       backgroundColor: 'white',//color you want to change
//     }}
//   } initialRouteName="Borrow">
//   <Screen name="Home" component={Home} />
//   <Screen name="Login" component={Login} options={{
//     headerShown: false,

//   }} />
//   <Screen name="Register" component={Register} options={{
//     headerShown: false,

//   }} />
//   <Screen name="ManageAuthor" component={ManageAuthor} />

//   <Screen name="ManageGenre" component={ManageGenre} />
//   <Screen name="Author" component={Author} options={{
//     headerShown: true,

//   }} />
//   <Screen name="Genre" component={Genre} options={{
//     headerShown: true,

//   }} />
//   <Screen name="User" component={User} />
//   <Screen name="Books" component={Books} options={{
//     headerShown: false,

//   }} />
//   <Screen name="Borrow" component={Borrow} />
//   <Screen name="Detail" component={Detail}options={{
//     headerShown: false,

//   }} />
//   <Screen
//     name="Profile"
//     component={Profile}
//     options={{
//       headerShown: true, headerLeft: null
//     }}
//   />
//   {/* <Screen name="Dimensions" component={Dimensions} /> */}
// </Navigator>
//   )
// }
// function HomeScreen() {
//   return (
//     <Navigator initialRouteName="AllBooks">
//     <Screen name="Home" component={Books} />
//     <Screen name="AllBooks" component={AllBooks} options={{
//       headerShown: false,

//     }} />
//     {/* <Screen name="Register" component={Register} options={{
//       headerShown: false,

//     }} />
//     <Screen name="ManageAuthor" component={ManageAuthor} />

//     <Screen name="ManageGenre" component={ManageGenre} />
//     <Screen name="Author" component={Author} options={{
//       headerShown: true,

//     }} />
//     <Screen name="Genre" component={Genre} options={{
//       headerShown: true,

//     }} />
//     <Screen name="User" component={User} />
//     <Screen name="Books" component={Books} options={{
//       headerShown: false,

//     }} />
//     <Screen name="Borrow" component={Borrow} />
//     <Screen name="Detail" component={Detail}options={{
//       headerShown: false,

//     }} />
//     <Screen
//       name="Profile"
//       component={Profile}
//       options={{
//         headerShown: true, headerLeft: null
//       }} */}
//     />
//     {/* <Screen name="Dimensions" component={Dimensions} /> */}
//   </Navigator>
//   );
// }
export default App;
