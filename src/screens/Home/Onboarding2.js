import React from 'react';
import OnboardingTemplate from '../../components/Onboarding/OnboardingTemplate';

const onboardingImg2 = require('../../../assets/Onboarding/Onboarding2.webp');

const Onboarding2 = ({ navigation }) => (
  <OnboardingTemplate
    navigation={navigation}
    imageSource={onboardingImg2}
    description={
      <>작품 설명을 촬영해 주세요.</>
    }
    subText={
      <>
        촬영된 작품 설명은 AI 해설 영상의{`\n`}
        스크립트로 활용됩니다.
      </>
    }
  />
);

export default Onboarding2; 