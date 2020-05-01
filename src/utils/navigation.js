import {createRef} from 'react';

export const navigationRef = createRef();

export const navigate = (name, params) => {
  if (navigationRef) {
    navigationRef.current.navigate(name, params);
  }
};

export const getActiveRouteState = function(route) {
  if (
    !route.routes ||
    route.routes.length === 0 ||
    route.index >= route.routes.length
  ) {
    return route;
  }
  const childActiveRoute = route.routes[route.index];
  return getActiveRouteState(childActiveRoute);
};
