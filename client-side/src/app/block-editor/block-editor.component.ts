import { TranslateService } from '@ngx-translate/core';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'page-block-editor',
    templateUrl: './block-editor.component.html',
    styleUrls: ['./block-editor.component.scss']
})
export class BlockEditorComponent implements OnInit {
    @Input() hostObject: any;

    @Output() hostEvents: EventEmitter<any> = new EventEmitter<any>();

    flowHostObject;

    constructor(private translate: TranslateService) {
    }

    onFlowChange(flowData: any) {
        const base64Flow = btoa(JSON.stringify(flowData));
        // this.configuration.ButtonsBarConfig.OnLoadFlow = base64Flow;
        // this.updateHostObjectField(`ButtonsBarConfig.OnLoadFlow`, base64Flow);
        // this.updatePageConfigurationObject();
    }

    ngOnInit(): void {
    }

    ngOnChanges(e: any): void {
    }


    // openFlowPickerDialog() {
    //     const flow = this.configuration.OnLoadFlow ? JSON.parse(atob(this.configuration.OnLoadFlow)) : null;
    //     let hostObj = {};
        
    //     if(flow){
    //         hostObj = { 
    //             runFlowData: { 
    //                 FlowKey: flow.FlowKey, 
    //                 FlowParams: flow.FlowParams 
    //             },
    //             fields: {
    //                 OnLoad: {
    //                     Type: 'Object',
    //                 },
    //                 Test: {
    //                     Type: 'String'
    //                 }
    //             }
    //         };
    //     } else{
    //         hostObj = { 
    //             fields: {
    //                     OnLoad: {
    //                         Type: 'Object',
    //                     },
    //                     Test: {
    //                         Type: 'String'
    //                     }
    //                 },
    //             }
    //     }
        
    //     this.dialogRef = this.addonBlockLoaderService.loadAddonBlockInDialog({
    //         container: this.viewContainerRef,
    //         name: 'FlowPicker',
    //         size: 'large',
    //         hostObject: hostObj,
    //         hostEventsCallback: async (event) => {
    //             if (event.action === 'on-done') {
    //                             const base64Flow = btoa(JSON.stringify(event.data));
    //                             this.configuration.OnLoadFlow = event.data?.FlowKey !== '' ? base64Flow : null;
    //                             this.updateHostObject();
    //                             this.dialogRef.close();
    //                             this.onLoadFlowName = this.configuration.OnLoadFlow ?  await this.richTextService.getFlowName(event.data?.FlowKey) : undefined;
    //             } else if (event.action === 'on-cancel') {
    //                             this.dialogRef.close();
    //             }
    //         }
    //     });
    // }
}
