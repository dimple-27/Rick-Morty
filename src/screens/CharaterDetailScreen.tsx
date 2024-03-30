/**
 * This is Chatacter Detail screen which will show when we click on any characters
 */
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../redux/store';
import {useFocusEffect} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getEpisode, getLocation, getOrigin} from '../redux/action/characters';
import TextHeader from '../components/TextHeader';
import {
  LocationDataObject,
  OriginDataObject,
} from '../models/CharacterDataModal';
import {getIdFromUrl} from '../utils/Utils';
const width = Dimensions.get('window').width - 40;

export default function CharaterDetailScreen(props: any) {
  const dispatch = useDispatch<AppDispatch>();
  const [location, setLocation] = useState<LocationDataObject>();
  const [episode, setEpisode] = useState<any>([]);
  const [origin, setOrigin] = useState<OriginDataObject>();
  const {data} = props.route.params;

  useFocusEffect(
    React.useCallback(() => {
      // get location data for given location url
      dispatch(getLocation(data?.location?.url)).then((response: Object) => {
        setLocation(response?.payload);
      });

      // get origin data for given origin url
      dispatch(getOrigin(data?.origin?.url)).then((response: Object) => {
        setOrigin(response?.payload);
      });

      // get episodes ids for given list of episodes
      const chapterIds = data?.episode.map((episode: string) =>
        getIdFromUrl(episode),
      );

      // get episode data for given episodes Ids
      dispatch(getEpisode(chapterIds.toString())).then((response: Object) => {
        // checking if response is array then direct store into state and if object then covert it to array and then store itno state
        if (response?.payload instanceof Array) {
          setEpisode(response?.payload);
        } else {
          let convertedArray: object[] = new Array();
          convertedArray.push(response?.payload);
          setEpisode(convertedArray);
        }
      });
    }, [dispatch]),
  );

  return (
    <SafeAreaView style={styles.containerStyle}>
      <ScrollView contentContainerStyle={{paddingBottom: 60}}>
        <View>
          <Image source={{uri: data.image}} style={styles.imageStyle}></Image>
          <TextHeader name={'Character'} />
          <Text style={styles.desTextStyle}>{`Name : ${data?.name}`}</Text>
          <Text style={styles.desTextStyle}>{`Spices : ${data?.species}`}</Text>
          <Text style={styles.desTextStyle}>{`Status : ${data?.status}`}</Text>
          <Text style={styles.desTextStyle}>{`Gender : ${data?.gender}`}</Text>
          <TextHeader name={'Origin'} />
          {origin ? (
            <>
              <Text
                style={styles.desTextStyle}>{`Name : ${origin?.name}`}</Text>
              <Text
                style={styles.desTextStyle}>{`Type : ${origin?.type}`}</Text>
              <Text
                style={
                  styles.desTextStyle
                }>{`Dimension : ${origin?.dimension}`}</Text>
              <Text
                style={
                  styles.desTextStyle
                }>{`Amount of Resident : ${origin?.residents.length}`}</Text>
            </>
          ) : (
            <Text style={styles.desTextStyle}>{`No Origin Found`}</Text>
          )}
          <TextHeader name={'Location'} />
          {location ? (
            <>
              <Text
                style={styles.desTextStyle}>{`Name : ${location?.name}`}</Text>
              <Text
                style={styles.desTextStyle}>{`Type : ${location?.type}`}</Text>
              <Text
                style={
                  styles.desTextStyle
                }>{`Dimension : ${location?.dimension}`}</Text>
              <Text
                style={
                  styles.desTextStyle
                }>{`Amount of Resident : ${location?.residents.length}`}</Text>
            </>
          ) : (
            <Text style={styles.desTextStyle}>{`No Location Found`}</Text>
          )}
          <TextHeader name={'Chapter'} />
          {episode ? (
            <>
              {episode.map((chapter: any) => {
                return <Text key={chapter.name} style={styles.desTextStyle}>{chapter?.name}</Text>;
              })}
            </>
          ) : (
            <Text style={styles.desTextStyle}>{`No Episode Found`}</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
  imageStyle: {
    width: width,
    height: width,
    overflow: 'hidden',
    borderRadius: 15,
    alignSelf: 'center',
  },
  desTextStyle: {
    fontSize: 16,
    marginVertical: 2,
    marginHorizontal: 20,
  },
});
