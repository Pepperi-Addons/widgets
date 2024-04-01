import { TranslateService } from "@ngx-translate/core";
import { Component, EventEmitter, Input, OnInit, Output,ViewContainerRef } from "@angular/core";
import { FlowService } from "src/app/services/flows.service";
import { PepAddonBlockLoaderService } from "@pepperi-addons/ngx-lib/remote-loader";
import { MatDialogRef } from "@angular/material/dialog";
import { Page, PageConfiguration } from "@pepperi-addons/papi-sdk";
import { PepAddonService } from "@pepperi-addons/ngx-lib";
import { IWidget, IEditorHostObject, IWidgetConfig } from "../widgets.model";

@Component({
  selector: "page-block-editor",
  templateUrl: "./block-editor.component.html",
  styleUrls: ["./block-editor.component.scss"],
})
export class BlockEditorComponent implements OnInit {
  @Input()
  set hostObject(value: IEditorHostObject) {
    if (
      value &&
      value.configuration &&
      Object.keys(value.configuration).length > 0
    ) {
      // Override only if the configuration is not the same object
      if (
        JSON.stringify(this._configuration) !==
        JSON.stringify(value.configuration)
      ) {
        this._configuration = value.configuration;
      }

      if (
        value.configurationSource &&
        Object.keys(value.configuration).length > 0
      ) {
        // Override only if the configuration is not the same object
        if (
          JSON.stringify(this.configurationSource) !==
          JSON.stringify(value.configurationSource)
        ) {
          this.configurationSource = value.configurationSource;
        }
      }

      //prepare the flow host hobject
      this.flowHostObject = this.flowService.prepareFlowHostObject(
        this._configuration.WidgetConfig.OnLoadFlow || null
      );
    } else {
      if (this.blockLoaded) {
        this.loadDefaultConfiguration();
      }
    }

    this.initPageConfiguration(value?.pageConfiguration);
    this._page = value?.page;
    this.flowService.recalculateEditorData(this._page, this._pageConfiguration);
  }

  @Output() hostEvents: EventEmitter<any> = new EventEmitter<any>();

  private _page: Page;
  get page(): Page {
    return this._page;
  }

  private defaultPageConfiguration: PageConfiguration = { Parameters: [] };
  private _pageConfiguration: PageConfiguration;

  private _configuration: IWidget;
  get configuration(): IWidget {
    return this._configuration;
  }
  set configuration(conf: IWidget) {
    this._configuration = conf;
  }

  private blockLoaded = false;
  public configurationSource: IWidget;

  flowHostObject;

  dialogRef: MatDialogRef<any>;

  onLoadFlowName;

  private getDefaultHostObject(): IWidget {
    return { WidgetConfig: new IWidgetConfig(), Widget: "" };
  }

  constructor(
    private translate: TranslateService,
    private flowService: FlowService,
    private pepAddonService: PepAddonService,
    private addonBlockLoaderService: PepAddonBlockLoaderService,
    private viewContainerRef: ViewContainerRef,
  ) {}

  onFlowChange(flowData: any) {
    const base64Flow = btoa(JSON.stringify(flowData));
    this.configuration.WidgetConfig.OnLoadFlow = base64Flow;
    this.updateHostObjectField(`WidgetConfig.OnLoadFlow`, base64Flow);
    //his.updatePageConfigurationObject();
  }

  ngOnInit(): void {}

  ngOnChanges(e: any): void {}

  private loadDefaultConfiguration() {
    this._configuration = this.getDefaultHostObject();
    this.updateHostObject();
    this.flowHostObject = this.flowService.prepareFlowHostObject(
      this._configuration.WidgetConfig.OnLoadFlow || null
    );
  }

  private initPageConfiguration(value: PageConfiguration = null) {
    this._pageConfiguration =
      value || JSON.parse(JSON.stringify(this.defaultPageConfiguration));
  }

  private updatePageConfigurationObject() {
    this.initPageConfiguration();

    // Get the consume parameters keys from the filters.
    const consumeParametersKeys = this.getConsumeParametersKeys();
    this.addParametersToPageConfiguration(consumeParametersKeys, false, true);

    // After adding the params to the page configuration need to recalculate the page parameters.
    this.flowService.recalculateEditorData(this._page, this._pageConfiguration);

    this.emitSetPageConfiguration();
  }

  private getConsumeParametersKeys(): Map<string, string> {
    const parametersKeys = new Map<string, string>();

    // Move on all load flows
    const onLoadFlow = this.configuration?.WidgetConfig.OnLoadFlow || null;
    if (onLoadFlow) {
      let flowParams = JSON.parse(atob(onLoadFlow)).FlowParams;
      Object.keys(flowParams).forEach((key) => {
        const param = flowParams[key];
        if (param.Source === "Dynamic") {
          parametersKeys.set(param.Value, param.Value);
        }
      });
    }

    return parametersKeys;
  }

  private addParametersToPageConfiguration(
    paramsMap: Map<string, string>,
    isProduce: boolean,
    isConsume: boolean
  ) {
    const params = Array.from(paramsMap.values());

    // Add the parameters to page configuration.
    for (let index = 0; index < params.length; index++) {
      const parameterKey = params[index];
      if (parameterKey !== "configuration") {
        const paramIndex = this._pageConfiguration.Parameters.findIndex(
          (param) => param.Key === parameterKey
        );

        // If the parameter exist, update the consume/produce.
        if (paramIndex >= 0) {
          this._pageConfiguration.Parameters[paramIndex].Consume =
            this._pageConfiguration.Parameters[paramIndex].Consume || isConsume;
          this._pageConfiguration.Parameters[paramIndex].Produce =
            this._pageConfiguration.Parameters[paramIndex].Produce || isProduce;
        } else {
          // Add the parameter only if not exist.
          this._pageConfiguration.Parameters.push({
            Key: parameterKey,
            Type: "String",
            Consume: isConsume,
            Produce: isProduce,
          });
        }
      }
    }
  }

  private updateHostObject() {
    this.hostEvents.emit({
      action: "set-configuration",
      configuration: this.configuration,
    });
  }

  private updateHostObjectField(fieldKey: string, value: any) {
    this.hostEvents.emit({
      action: "set-configuration-field",
      key: fieldKey,
      value: value,
    });
  }

  private emitSetPageConfiguration() {
    this.hostEvents.emit({
      action: "set-page-configuration",
      pageConfiguration: this._pageConfiguration,
    });
  }

    openFlowPickerDialog() {
      const flow = this.configuration.WidgetConfig.OnLoadFlow
        ? JSON.parse(atob(this.configuration.WidgetConfig.OnLoadFlow))
        : null;
      let hostObj = {};

      if (flow) {
        hostObj = {
          runFlowData: {
            FlowKey: flow.FlowKey,
            FlowParams: flow.FlowParams,
          },
          fields: {
            OnLoad: {
              Type: "Object",
            },
            Test: {
              Type: "String",
            },
          },
        };
      } else {
        hostObj = {
          fields: {
            OnLoad: {
              Type: "Object",
            },
            Test: {
              Type: "String",
            },
          },
        };
      }

      this.dialogRef = this.addonBlockLoaderService.loadAddonBlockInDialog({
        container: this.viewContainerRef,
        name: "FlowPicker",
        size: "large",
        hostObject: hostObj,
        hostEventsCallback: async (event) => {
          if (event.action === "on-done") {
            const base64Flow = btoa(JSON.stringify(event.data));
            this.configuration.WidgetConfig.OnLoadFlow =
              event.data?.FlowKey !== "" ? base64Flow : null;
            this.updateHostObject();
            this.dialogRef.close();
            this.onLoadFlowName = this.configuration.WidgetConfig.OnLoadFlow;
          } else if (event.action === "on-cancel") {
            this.dialogRef.close();
          }
        },
      });
    }
}
