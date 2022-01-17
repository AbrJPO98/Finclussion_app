import React, {useState, useRef} from 'react';
import { View, Text, StyleSheet, FlatList, Animated, ScrollView} from 'react-native';
import slides from '../slides';
import CarrouselItem from './CarrouselItem';
import Paginator from './Paginator';
import NextButton from './NextButton';
import Logo from '../assets/images/logo_name.svg';
import Svg from "react-native-svg";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
 
const Carrousel = ({nav}) => {

  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollX = useRef(new Animated.Value(0)).current;
  
  const slideRef = useRef(null);

  const viewableItemsChanged = useRef(( {viewableItems} ) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

  const scrollTo = () => {
    if(currentIndex < slides.length - 1){
      slideRef.current.scrollToIndex({index:currentIndex+1});
    } else {
      final();
    }
  }

  const final = () => {
    
    nav.navigate('Log');
  }

  return (
    <View style={styles.container}>
      <View style={{flex:0.5, paddingTop:hp('2.5%')}}>
        <Svg height={wp('100%')} width={wp('80%')} viewBox="-7 15 330 330">
          <Logo />
        </Svg>
      </View>
      <View style={{flex:2}}>
          <FlatList 
            data={slides} 
            renderItem={({item}) => <CarrouselItem item={item} />}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            bounces={false}
            keyExtractor={(item) => item.id}
            onScroll={Animated.event([{nativeEvent: {contentOffset: { x: scrollX}}}],{
              useNativeDriver: false
            })}
            scrollEventThrottle={32}
            onViewableItemsChanged={viewableItemsChanged}
            viewabilityConfig={viewConfig}
            ref={slideRef}
            />
        </View>
        <View style={{flex:0.2}}>
          <Paginator data={slides} scrollX={scrollX}/>
        </View>
        <View style={{flex:0.45}}>
          <NextButton scrollTo={scrollTo} final={final}/>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    }
})

export default Carrousel;
