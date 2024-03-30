/**
 * This is Home screen which will show list of characters
 */
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getCharacters} from '../redux/action/characters';
import {AppDispatch, RootState} from '../redux/store';
import CharacterItem from '../components/CharacterItem';
import {updateApiLoader} from '../redux/reducer/characters';
import {ROUTES_SCREEN_NAME} from '../utils/RouterConstants';

export default function HomeScreen({navigation}: {navigation: any}) {
  const dispatch = useDispatch<AppDispatch>();
  const charactersList = useSelector((state: RootState) => state.characters);
  const [pageNum, setPageNum] = useState<number>(1);

  //call get character api when focus on the screen
  useFocusEffect(
    React.useCallback(() => {
      dispatch(getCharacters(pageNum));
    }, [dispatch]),
  );

  // update api loader and call get charcter api when page number is update this is used for pagination
  useEffect(() => {
    dispatch(updateApiLoader({apiLoader: true}));
    dispatch(getCharacters(pageNum));
  }, [pageNum]);

  // this is used for display footer loader for pagination
  const renderFooter = () => {
    if (!charactersList.apiLoader) return null;
    return (
      <View style={{height: 50}}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.containerStyle}>
      <FlatList
        data={charactersList?.charactersList}
        numColumns={2} //for using flatlist as grid
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString() + 'ds'}
        renderItem={({item, index}) => {
          return (
            <CharacterItem
              key={index}
              data={item}
              onClick={selectedCharacter =>
                navigation.navigate(ROUTES_SCREEN_NAME.CHARACTER_DETAIL, {
                  data: selectedCharacter,
                })
              }
            />
          );
        }}
        onEndReached={() => {
          // checking if all data is not loaded then update page number for getting next page data
          if (
            charactersList?.totalCharactersCount ===
            charactersList?.charactersList?.length
          ) {
            console.log('No More Page Required');
          } else {
            setPageNum(pageNum + 1);
          }
        }}
        onEndReachedThreshold={3}
        ListFooterComponent={renderFooter}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
});
