import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  FlatList,
  StyleSheet,
  Button,
  Modal,
} from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';
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

  if (dish != null) {
    return (
      <Card featuredTitle={dish.name} image={{ uri: baseUrl + dish.image }}>
        <Text style={{ margin: 10 }}>{dish.description}</Text>
        <Icon
          raised
          reverse
          name={props.favorite ? 'heart' : 'heart-o'}
          type='font-awesome'
          color='#f50'
          onPress={() =>
            props.favorite ? console.log('Already favorite') : props.onPress()
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
      </Card>
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
    <Card title='Comments'>
      <FlatList
        data={comments}
        renderItem={renderCommentItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </Card>
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
