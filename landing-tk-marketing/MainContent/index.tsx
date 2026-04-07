import React from 'react'

import bgGreenUrl from '../../images/bg-green.png'
import bgYellowUrl from '../../images/bg-yellow.png'
import bgBlueUrl from '../../images/bg-blue.png'
import bgRedUrl from '../../images/bg-red.png'
import heroImageUrl from '../../images/TK-UI-HeaderFeature.png'
import writePromptImageUrl from '../../images/TK-UI-Section-1-WritePrompt.png'
import inlineFeatureImageUrl from '../../images/TK-UI-Section-2-InlineFeature.png'
import socialImageUrl from '../../images/TK-UI-Section-3-Social.png'

import {NavBar} from './NavBar'
import {HeroSection} from './HeroSection'
import {FeatureSection} from './FeatureSection'
import {FriendsSection} from './FriendsSection'
import {Footer} from './Footer'

// In Medium, this would wrap with:
//   <LandingPageMetadata ... />
//   <LandingPageContainer susiEntry="landing_tk_marketing" ...>
//     ...
//   </LandingPageContainer>

export function MainContent() {
  return (
    <div>
      <NavBar />
      <main>
        <HeroSection
          imageUrl={heroImageUrl}
          backgroundUrl={bgGreenUrl}
        />
        <FeatureSection
          layout="image-right"
          imageAnchor="bottom"
          title="Write more, and more, and more."
          body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          imageUrl={writePromptImageUrl}
          imageAlt="Prompt of the Day feature"
          backgroundUrl={bgYellowUrl}
        />
        <FeatureSection
          layout="image-left"
          imageAnchor="right"
          title="Stay in the flow."
          body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          imageUrl={inlineFeatureImageUrl}
          imageAlt="Inline writing feature"
          backgroundUrl={bgBlueUrl}
        />
        <FeatureSection
          layout="image-right"
          imageAnchor="bottom-right"
          title="Great minds write alike."
          body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          imageUrl={socialImageUrl}
          imageAlt="Social writing features"
          backgroundUrl={bgRedUrl}
        />
        <FriendsSection />
      </main>
      <Footer />
    </div>
  )
}
