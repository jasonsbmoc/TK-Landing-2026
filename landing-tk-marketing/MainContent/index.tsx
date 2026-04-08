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
          title="Become a morning pages person."
          body="You're already a writer. You just need a home for your habit. TK offers prompts, finds connections between your notes, and provides data about your growing body of work."
          imageUrl={writePromptImageUrl}
          imageAlt="Prompt of the Day feature"
          backgroundUrl={bgYellowUrl}
        />
        <FeatureSection
          layout="image-left"
          imageAnchor="right"
          title="Keep it flowing."
          body="Easily distracted? Check facts, find synonyms, and insert links without leaving your tab or derailing your train of thought with a Wikipedia side-quest."
          imageUrl={inlineFeatureImageUrl}
          imageAlt="Inline writing feature"
          backgroundUrl={bgBlueUrl}
        />
        <FeatureSection
          layout="image-right"
          imageAnchor="bottom-right"
          title="Write in good company."
          body="On TK, connection means more. Join shared libraries to find an environment that promotes real enthusiasm, earnest interactions, and nuanced conversations."
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
