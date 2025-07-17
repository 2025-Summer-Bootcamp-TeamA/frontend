import React, { useRef, useState } from 'react';
import { View, FlatList, Dimensions } from 'react-native';
import Onboarding1 from './Onboarding1';
import Onboarding2 from './Onboarding2';
import Onboarding3 from './Onboarding3';
import OnboardingIndicator from '../../components/Onboarding/OnboardingIndicator';

const { width } = Dimensions.get('window');

const Onboarding = ({ navigation }) => {
  const [current, setCurrent] = useState(0);
  const flatListRef = useRef();

  const onboardingScreens = [
    <Onboarding1 navigation={navigation} key="1" />,
    <Onboarding2 navigation={navigation} key="2" />,
    <Onboarding3 navigation={navigation} key="3" />,
  ];

  const handleScroll = (event) => {
    const page = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrent(page);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <FlatList
        ref={flatListRef}
        data={onboardingScreens}
        renderItem={({ item }) => <View style={{ width }}>{item}</View>}
        keyExtractor={(_, idx) => idx.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />
      <View style={{ position: 'absolute', bottom: 48, left: 0, right: 0, alignItems: 'center' }}>
        <OnboardingIndicator total={3} current={current} />
      </View>
    </View>
  );
};

export default Onboarding; 