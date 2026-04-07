// In Medium: import {type BasicLayoutConfig} from 'src/app/layouts/BasicLayout'
// This file is structurally identical to other landing pages in the Medium codebase.

export interface BasicLayoutConfig {
  name: string
  lazyLoadingOptions?: {
    shouldUseLoadableComponent: boolean
  }
}

export const layoutConfig: BasicLayoutConfig = {
  name: 'BasicLayout',
  lazyLoadingOptions: {
    shouldUseLoadableComponent: true,
  },
}
