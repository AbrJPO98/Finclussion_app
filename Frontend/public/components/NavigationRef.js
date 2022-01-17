import {createNavigationContainerRef, DrawerActions} from '@react-navigation/native'

export const navigationRef = createNavigationContainerRef()

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

export function closeDrawer() { 
    if (navigationRef.isReady()) {
        navigationRef.dispatch(DrawerActions.closeDrawer());
      }
}