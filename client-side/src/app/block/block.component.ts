import { TranslateService } from "@ngx-translate/core";
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
} from "@angular/core";
import { IHostObject, IWidget } from "../widgets.model";

@Component({
  selector: "page-block",
  templateUrl: "./block.component.html",
  styleUrls: ["./block.component.scss"],
})
export class BlockComponent implements OnInit {
  @Input()
  set hostObject(value: IHostObject) {
    debugger;
    //this._configuration = value?.configuration;
    if (value?.configuration && Object.keys(value.configuration).length) {
      this.configuration = value?.configuration;
    }
  }

  private _configuration: IWidget;
  get configuration(): IWidget {
    return this._configuration;
  }
  set configuration(conf: IWidget) {
    this._configuration = conf;
  }

  @Output() hostEvents: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private translate: TranslateService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    const script = this.configuration.WidgetConfig.widgetSnippet || "";
    const id = this.configuration.WidgetConfig.widgetId || "";
    if (script.length > 0) {
      this.insertScriptElement(script, id);
    }
  }

  ngOnChanges(e: any): void {}

  private insertScriptElement(scriptString: string, id: string): void {
    // Replace curly quotes with straight quotes
    scriptString = scriptString.replace(/[\u201C\u201D]/g, '"');

    const div = this.renderer.createElement("div");
    div.innerHTML = scriptString;

    const scripts = div.getElementsByTagName("script");
    //running on all scripts - can be slightly modified to run on multiple
    for (let i = 0; i < scripts.length; i++) {
      const script = scripts[i];
      const scriptElement = this.renderer.createElement("script");
      //running on all atrributes and generating their script object
      for (let j = 0; j < script.attributes.length; j++) {
        const attr = script.attributes[j];
        this.renderer.setAttribute(scriptElement, attr.name, attr.value);
      }
      if (script.innerHTML.trim() !== "") {
        this.renderer.appendChild(
          scriptElement,
          this.renderer.createText(script.innerHTML)
        );
      }
      scriptElement.type = "text/javascript";
      //if existing id keep it if not generate internal - need to remove after widget name comes from config input
      scriptElement.hasAttribute("id") ? null : (scriptElement.id = id);
      //check if widget exists on body - need to change according to the name brought from configuration
      const existingElement = document.getElementById(scriptElement.id);
      if (existingElement) {
        return;
      }
      this.renderer.appendChild(document.body, scriptElement); // Append to the body
    }
  }
}
