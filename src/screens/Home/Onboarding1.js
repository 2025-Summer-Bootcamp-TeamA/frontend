import React from 'react';
import OnboardingTemplate from '../../components/Onboarding/OnboardingTemplate';

const onboardingImg1 = require('../../../assets/Onboarding/Onboarding1.webp');

const Onboarding1 = ({ navigation }) => (
  <OnboardingTemplate
    navigation={navigation}
    imageSource={onboardingImg1}
    description={
      <>
        작품을 화면 가운데에 오도록{`\n`}
        촬영해 주세요.
      </>
    }
    subText={
      <>
        촬영한 작품 사진은 영상 제작에 사용되며,{`\n`}
        얼굴이 감지되지 않을 경우 자동으로{`\n`}
        아바타 이미지가 생성되어 사용됩니다.
      </>
    }
  />
);

export default Onboarding1; 