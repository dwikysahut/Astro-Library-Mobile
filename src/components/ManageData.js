import React from 'react';
import {StyleSheet} from 'react-native';
import {
  Container,
  // Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
} from 'native-base';

import {Text, View} from 'native-base';
const ManageData = ({
  text,
  handlerChange,
  handleShow,
  handleHide,
  handlerSubmit,
  isShow,
  isSuccess,
  name,
}) => {
  return (
    <Container>
      {/* <KeyboardAvoidingView> */}
      <Content>
        <View>
          <Text style={styles.textTitle}>{text}</Text>
        </View>

        <Form>
          <Item floatingLabel>
            <Label>Name</Label>
            <Input value={name} onChangeText={handlerChange} />
          </Item>
        </Form>

        <Button style={styles.buttonSave} onPress={handlerSubmit} bordered dark>
          <Text> Save </Text>
        </Button>
      </Content>
      {/* </KeyboardAvoidingView> */}
    </Container>
  );
};

const styles = StyleSheet.create({
  textTitle: {
    fontSize: 22,
    marginLeft: 50,
    marginTop: 30,
  },
  buttonSave: {
    marginTop: '10%',
    marginLeft: 300,
    alignItems: 'center',
    justifyContent: 'center',
    width: '20%',
    textAlign: 'center',
  },
});

export default ManageData;
