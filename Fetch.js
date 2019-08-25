import React from 'react';
import {
  FlatList,
  ActivityIndicator,
  Text,
  View,
  Image,
  StyleSheet,
} from 'react-native';

export default class FetchGITProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  componentDidMount() {
    return fetch('https://api.github.com/users/ravindrasinghshah')
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson,
          },
          function() {}
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Image
          source={{ uri: this.state.dataSource.avatar_url }}
          style={styles.img}
        />
        <View style={styles.profile.row}>
          <Text style={styles.profile.name}>{this.state.dataSource.login}</Text>
          <Text style={styles.profile.date}>
            {this.state.dataSource.created_at}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
  profile: {
    row: {
      flex: 1,
      padding: 20,
      flexDirection: 'col',
      fontSize: 16,
    },
    name: {
      fontWeight: 'bold',
      fontSize: 18,
    },
    date: { color: '#565656', fontStyle: 'italic' },
  },
});
