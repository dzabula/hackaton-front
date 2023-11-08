import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from '@angular/router';

export class CustomReuseStrategy implements RouteReuseStrategy {
  private storedHandles: { [key: string]: DetachedRouteHandle | null } = {};

  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return future.routeConfig === curr.routeConfig;
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    return this.storedHandles[this.getKey(route)];
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return !!this.storedHandles[this.getKey(route)];
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle | null): void {
    this.storedHandles[this.getKey(route)] = handle;
  }

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return true; // Detach always, you can add your own conditions here
  }

  private getKey(route: ActivatedRouteSnapshot): string {
    let key = route.routeConfig ? route.routeConfig.path : '';
    while (route.parent) {
      route = route.parent;
      key = route.routeConfig ? route.routeConfig.path + '/' + key : key;
    }
    return key;
  }
}