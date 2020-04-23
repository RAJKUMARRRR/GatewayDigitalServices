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
