import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  FlatList,
  StyleSheet,
  Button,
  Modal,
  Alert,
  PanResponder,
} from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites,
  };
};

const mapDispatchToProps = (dispatch) => ({
  postFavorite: (dishId) => dispatch(postFavorite(dishId)),
  postComment: (dishId, rating, author, comment) =>
    dispatch(postComment(dishId, rating, author, comment)),
});

function RenderDish(props) {
  const dish = props.dish;

  const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
    if (dx < -200) return true;
    else return false;
  };
  const recognizeComment = ({ moveX, moveY, dx, dy }) => {
    if (dx > 200) return true;
    else return false;
  };
  // handleViewRef = (ref) => (this.view = ref);
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (e, gestureState) => {
      return true;
    },
    // onPanResponderGrant: () => {

    //   this.view
    //     .rubberBand(1000)
    //     .then((endState) =>
    //       console.log(endState.finished ? 'finished' : 'cancelled')
    //     );
    // },
    onPanResponderEnd: (e, gestureState) => {
      console.log('pan responder end', gestureState);
      if (recognizeDrag(gestureState))
        Alert.alert(
          'Add Favorite',
          'Are you sure you wish to add ' + dish.name + ' to favorite?',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: () => {
                props.favorite
                  ? console.log('Already favorite')
                  : props.onPress();
              },
            },
          ],
          { cancelable: false }
        );

      if (recognizeComment(gestureState)) {
        props.toggleModal();
      }

      return true;
    },
  });

  if (dish != null) {
    return (
      <Animatable.View
        animation='fadeInDown'
        duration={2000}
        delay={1000}
        {...panResponder.panHandlers}
        // ref={this.handleViewRef}
      >
        <Card featuredTitle={dish.name} image={{ uri: baseUrl + dish.image }}>
          <Text style={{ margin: 10 }}>{dish.description}</Text>
          <Text style={{ alignItems: 'center' }}>
            <Icon
              raised
              reverse
              name={props.favorite ? 'heart' : 'heart-o'}
              type='font-awesome'
              color='#f50'
              onPress={() =>
                props.favorite
                  ? console.log('Already favorite')
                  : props.onPress()
              }
            />
            <Icon
              raised
              reverse
              name={'pencil'}
              type='font-awesome'
              color='#512DA8'
              onPress={() => {
                props.toggleModal();
              }}
            />
          </Text>
        </Card>
      </Animatable.View>
    );
  } else {
    return <View></View>;
  }
}
function RenderComments(props) {
  const comments = props.comments;

  const renderCommentItem = ({ item, index }) => {
    return (
      <View key={index} style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{item.comment}</Text>
        <Text style={{ fontSize: 12 }}>{item.rating} Stars</Text>
        <Text style={{ fontSize: 12 }}>
          {'-- ' + item.author + ', ' + item.date}{' '}
        </Text>
      </View>
    );
  };

  return (
    <Animatable.View animation='fadeInUp' duration={2000} delay={1000}>
      <Card title='Comments'>
        <FlatList
          data={comments}
          renderItem={renderCommentItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </Card>
    </Animatable.View>
  );
}

class Dishdetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rating: 3,
      author: '',
      comment: '',
      showModal: false,
    };
  }
  static screenOptions = {
    title: 'Dish Details',
  };
  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  handleComment(dishId) {
    this.props.postComment(
      dishId,
      this.state.rating,
      this.state.author,
      this.state.comment
    );
    this.resetForm();
  }

  resetForm() {
    this.setState({
      author: '',
      comment: '',
      showModal: false,
    });
  }

  markFavorite(dishId) {
    this.props.postFavorite(dishId);
  }
  ratingCompleted(rating) {
    console.log('Rating is: ' + rating);
  }
  render() {
    const dishId = this.props.route.params?.dishId ?? '';

    return (
      <ScrollView>
        <RenderDish
          dish={this.props.dishes.dishes[+dishId]}
          favorite={this.props.favorites.some((el) => el === dishId)}
          onPress={() => this.markFavorite(dishId)}
          toggleModal={() => this.toggleModal()}
        />
        <RenderComments
          comments={this.props.comments.comments.filter(
            (comment) => comment.dishId === dishId
          )}
        />
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.showModal}
          onRequestClose={() => this.toggleModal()}
        >
          <View style={styles.formRow}>
            <Rating
              showRating
              onFinishRating={(value) => {
                this.setState({ rating: value });
                this.ratingCompleted(value);
              }}
              style={{ paddingVertical: 10 }}
            />
          </View>
          <View style={styles.formRow}>
            <Input
              placeholder='Author'
              leftIcon={
                <Icon type='font-awesome' name={'user'} color='black' />
              }
              style={styles.formRow}
              onChangeText={(value) => this.setState({ comment: value })}
            />
          </View>
          <View style={styles.formRow}>
            <Input
              placeholder='Comment'
              leftIcon={
                <Icon type='font-awesome' name={'comment'} color='black' />
              }
              style={styles.formRow}
              onChangeText={(value) => this.setState({ author: value })}
            />
          </View>
          <View style={styles.formRow}>
            <Button
              onPress={() => {
                this.handleComment(dishId);
              }}
              title='Submit'
              color='#512DA8'
              accessibilityLabel='Learn more about this purple button'
            />
          </View>
          <View style={styles.formRow}>
            <Button
              onPress={() => {
                this.toggleModal();
                this.resetForm();
              }}
              title='Cancel'
              color='grey'
              accessibilityLabel='Learn more about this grey button'
            />
          </View>
        </Modal>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  formRow: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    margin: 20,
  },
  modal: {
    justifyContent: 'center',
    margin: 20,
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);
