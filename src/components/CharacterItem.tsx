/**
 *  This Component is used for display character in list
 */

import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  TouchableOpacityProps,
  Image,
  Dimensions,
} from 'react-native';
import {CharacterDataModal} from '../models/CharacterDataModal';

const width = (Dimensions.get('window').width - 40) / 2;

// here you can define type of props which we are using in this component
interface CharacterItemProps extends TouchableOpacityProps {
  data: CharacterDataModal;
  onClick: (selectedCharacter: any) => void;
}

const CharacterItem: React.FC<CharacterItemProps> = props => {
  const {data, onClick} = props;
  return (
    <TouchableOpacity
      style={styles.containerStyle}
      onPress={() => {
        onClick(data);
      }}
      {...props}
      activeOpacity={0.7}>
      <Image source={{uri: data.image}} style={styles.imageStyle}></Image>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    borderRadius: 15,
    marginHorizontal: 10,
    marginVertical: 15,
    backgroundColor: 'white',
    flexDirection: 'row',
    width: width,
    height: width,
    shadowColor: 'grey',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 20,
  },
  imageStyle: {
    width: width,
    height: width,
    overflow: 'hidden',
    borderRadius: 15,
  },
});

export default CharacterItem;
