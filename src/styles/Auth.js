import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,

    // backgroundColor: 'whitesmoke',

    alignItems: 'center',

    justifyContent: 'center',
    //  marginLeft:100
  },
  logo: {
    fontWeight: 'bold',

    fontSize: 40,

    color: 'honeydew',

    marginBottom: 40,
    fontStyle: 'italic',

    // marginTop:100,
  },
  inputView: {
    width: '80%',

    backgroundColor: 'rgba(52, 52, 52, 0.3)',

    borderRadius: 25,
    borderWidth: 1,

    height: 50,
    marginBottom: 10,
    // marginTop:60,
    justifyContent: 'center',

    padding: 20,
  },

  invalidInputView: {
    width: '80%',

    backgroundColor: 'rgba(52, 52, 52, 0.3)',

    borderRadius: 25,
    borderWidth: 1,

    height: 50,
    borderColor: 'red',

    marginBottom: 10,
    // marginTop:60,
    justifyContent: 'center',

    padding: 20,
  },
  inputText: {
    height: 50,

    color: 'white',
  },

  loginBtn: {
    width: '80%',

    backgroundColor: '#455a64',

    borderRadius: 25,

    height: 50,

    alignItems: 'center',

    justifyContent: 'center',

    marginTop: 40,

    marginBottom: 10,
  },
  loginText: {
    color: 'white',
  },
  registerText: {
    height: 50,
    color: '#ffd700',
    fontWeight: 'bold',
  },
  yellowColor: {color: 'yellow', fontSize: 10},
  redColor: {color: 'red'},
  greenColor: {color: 'green'},
});
export default styles;
