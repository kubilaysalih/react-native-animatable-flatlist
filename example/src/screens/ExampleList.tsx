import { useNavigation } from '@react-navigation/core';
import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import routes from '../routes';

const ListItem = ({
  text,
  screenName,
}: {
  text: string;
  screenName: string;
}) => {
  const { navigate } = useNavigation<any>();
  return (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => navigate(screenName)}
    >
      <Text>{text}</Text>
    </TouchableOpacity>
  );
};

const Seperator = () => <View style={styles.seperator} />;

export default () => {
  const renderItem = ({ item }) => {
    return <ListItem {...item} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={routes}
        ItemSeparatorComponent={Seperator}
        keyExtractor={(item) => item.text}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listItem: {
    padding: 20,
    backgroundColor: 'white',
  },
  seperator: {
    height: 1,
    backgroundColor: '#eaeaea',
  },
});
