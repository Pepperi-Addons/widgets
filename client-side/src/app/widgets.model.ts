import { Page } from "@pepperi-addons/papi-sdk";
import { v4 as uuid } from "uuid";

export const addonUUID = "c62f8195-4eeb-4231-a63e-6e53d90b5f96";

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
}

export class IWidgetConfig {
  widgetSnippet: string;
  widgetId: string;
  OnLoadFlow: any;

  constructor(widgetStnippet = "", widgetId = "", OnLoadFlow = null) {
    this.widgetSnippet = widgetStnippet;
    this.widgetId = `${addonUUID}_${uuid()}`;
    this.OnLoadFlow = OnLoadFlow;
  }
}

export interface IEditorHostObject {
  state: any;
  configuration: IWidget;
  configurationSource: IWidget;
  pageConfiguration: any;
  page: Page;
}
