// In Medium, this would use @loadable/component for code splitting.
// Standalone preview: simple re-export.
//
// Medium equivalent:
//   import loadable from '@loadable/component'
//   import {renderLoadableContent} from 'src/app/codegen/loadableComponentUtils'
//   const LoadableMainContent = loadable(
//     () => import('src/app/pages/landing-tk-marketing/MainContent'),
//     {resolveComponent: renderLoadableContent('MainContent')},
//   )
//   export const MainModule = {content: LoadableMainContent}

import {MainContent} from '../MainContent/index'

export const MainModule = {content: MainContent}
