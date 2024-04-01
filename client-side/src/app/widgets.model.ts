import { Page } from "@pepperi-addons/papi-sdk";

export const addonUUID = 'c62f8195-4eeb-4231-a63e-6e53d90b5f96';

export interface IHostObject {
  configuration: IWidget;
  parameters: any;
}

export class WidgetEditor {
  id: number;
  Flow: any;
  widget: string;
}

export interface IWidget {
  WidgetConfig: IWidgetConfig;
  Widget: string;
}

export class IWidgetConfig {
  widget: string;
  widgetId: string;
  OnLoadFlow: any;
}

export interface IEditorHostObject {
  state: any;
  configuration: IWidget;
  configurationSource: IWidget;
  pageConfiguration: any;
  page: Page;
}
