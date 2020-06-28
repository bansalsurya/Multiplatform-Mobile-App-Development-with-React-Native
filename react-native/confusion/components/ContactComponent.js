import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

export class ContactComponent extends Component {
  static options = {
    title: 'Contact Us',
  };
  render() {
    return (
      <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
        <Card title='Contact Information'>
          <View style={{ margin: 10 }}>
            <Text style={{ margin: 10 }}>Clear Water Bay, Kowloon</Text>
            <Text style={{ margin: 10 }}>HONG KONG</Text>
            <Text style={{ margin: 10 }}>Tel: +852 1234 5678</Text>
            <Text style={{ margin: 10 }}>Fax: +852 8765 4321</Text>
            <Text style={{ margin: 10 }}>Email:confusion@food.net</Text>
          </View>
        </Card>
      </Animatable.View>
    );
  }
}

export default ContactComponent;
