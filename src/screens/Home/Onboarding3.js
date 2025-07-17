import React from 'react';
import OnboardingTemplate from '../../components/Onboarding/OnboardingTemplate';
import XButton from '../../components/Onboarding/XButton';

const onboardingImg3 = require('../../../assets/Onboarding/Onboarding3.png');

const Onboarding3 = ({ navigation }) => (
  <OnboardingTemplate
    navigation={navigation}
    imageSource={onboardingImg3}
    description={
      <>작품명 판을 촬영해 주세요.</>
    }
    subText={
      <>
        작품 설명이 제공되지 않는 경우,{`\n`}
        제목과 작가명이 보이도록 촬영해 주세요.
      </>
    }
    skipButton={
      <XButton onPress={() => navigation && navigation.replace ? navigation.replace('MainTabs') : null} />
    }
  />
);

export default Onboarding3; 