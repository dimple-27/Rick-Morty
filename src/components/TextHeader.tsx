/**
 *This Component is used for display text with colored bg in detail screen
 */

import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  TextProps,
  View,
  Text,
} from 'react-native';
import {Colors} from '../utils/Colors';

// here you can define type of props which we are using in this component
interface TextHeaderProps extends TextProps {
  name: string;
}

const TextHeader: React.FC<TextHeaderProps> = props => {
  const {name} = props;
  return (
    <View style={styles.headerContainerStyle}>
      <Text style={styles.nameStyle}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainerStyle: {
    flex: 1,
    height: 50,
    marginVertical: 10,
    backgroundColor: Colors.textHeadarBg,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  nameStyle: {
    fontSize: 22,
    color: 'black',
    fontWeight: 'bold',
  },
});

export default TextHeader;
