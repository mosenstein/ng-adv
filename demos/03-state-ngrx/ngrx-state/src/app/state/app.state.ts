import { createFeature, createReducer, on } from '@ngrx/store';
import { MatDrawerMode } from '@angular/material/sidenav';
import { appActions } from './app.actions';

export const appFeatureKey = 'app';

export interface AppState {
  IsMockAuthenticated: boolean;
  sideNavVisible: boolean;
  sideNavPosition: MatDrawerMode;
}

export const initialAppState: AppState = {
  IsMockAuthenticated: false,
  sideNavVisible: true,
  sideNavPosition: 'side',
};

export const appState = createFeature({
  name: appFeatureKey,
  reducer: createReducer(initialAppState,
    on(appActions.toggleSideNav, (state) => (
      {
        ...state,
        sideNavVisible: !state.sideNavVisible,
      }
    )),
    on(appActions.changeSideNavVisible, (state, action) => (
      {
        ...state,
        sideNavVisible: action.visible,
      }
    )),
    on(appActions.changeSideNavPosition, (state, action) => ({
      ...state,
      sideNavPosition: action.position,
    })),
    on(appActions.toggleMockAuthenticated, (state, action) => ({
      ...state, IsMockAuthenticated: !state.IsMockAuthenticated
    }))
  )
})
