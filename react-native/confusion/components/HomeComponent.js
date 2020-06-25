import React, { Component } from 'react';
import { Text, ScrollView, View } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    promotions: state.promotions,
    leaders: state.leaders,
  };
};

function RenderItems({ item, isLoading, errMess }) {
  if (isLoading) {
    return <Loading />;
  } else if (errMess) {
    return (
      <View>
        <Text>{errMess}</Text>
      </View>
    );
  } else {
    if (item != null) {
      return (
        <Card
          featuredTitle={item.name}
          featuredSubtitle={item.designation}
          image={{ uri: baseUrl + item.image }}
        >
          <Text style={{ margin: 10 }}>{item.description}</Text>
        </Card>
      );
    } else {
      return <View></View>;
    }
  }
}
class Home extends Component {
  static screenOptions = {
    title: 'Home',
  };

  render() {
    return (
      <ScrollView>
        <RenderItems
          item={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
        />
        <RenderItems
          item={
            this.props.promotions.promotions.filter(
              (promo) => promo.featured
            )[0]
          }
          isLoading={this.props.promotions.isLoading}
          errMess={this.props.promotions.errMess}
        />
        <RenderItems
          item={
            this.props.leaders.leaders.filter((leader) => leader.featured)[0]
          }
          isLoading={this.props.leaders.isLoading}
          errMess={this.props.leaders.errMess}
        />
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps)(Home);
