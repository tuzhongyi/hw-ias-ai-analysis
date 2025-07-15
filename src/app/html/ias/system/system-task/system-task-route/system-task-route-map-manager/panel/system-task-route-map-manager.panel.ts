import { SystemTaskRouteMapManagerDetailsPanel } from './system-task-route-map-manager-details.panel';
import { SystemTaskRouteMapManagerListPanel } from './system-task-route-map-manager-list.panel';

export class SystemTaskRouteMapManagerPanel {
  constructor() {}
  details = new SystemTaskRouteMapManagerDetailsPanel();
  list = new SystemTaskRouteMapManagerListPanel();
}
