import { TranslateService } from "@ngx-translate/core";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "page-block",
  templateUrl: "./block.component.html",
  styleUrls: ["./block.component.scss"],
})
export class BlockComponent implements OnInit {
  @Input() hostObject: any;
  externalScript = `<script id=“ze-snippet” src=“https://static.zdassets.com/ekr/snippet.js?key=fdbd81aa-20c5-4c44-975d-0956919574b7“></script>`;
  @Output() hostEvents: EventEmitter<any> = new EventEmitter<any>();

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    debugger;
    const script = document.createElement("script");
    script.id = "ze-snippet";
    script.src = 'https://static.zdassets.com/ekr/snippet.js?key=fdbd81aa-20c5-4c44-975d-0956919574b7';
    document.body.appendChild(script);
  }

  ngOnChanges(e: any): void {}
}
