import { TranslateService } from "@ngx-translate/core";
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
} from "@angular/core";

@Component({
  selector: "page-block",
  templateUrl: "./block.component.html",
  styleUrls: ["./block.component.scss"],
})
export class BlockComponent implements OnInit {
  @Input() hostObject: any;
  liveAgent = `<script type="text/javascript"> (function(d, src, c) { var t=d.scripts[d.scripts.length - 1],s=d.createElement('script');s.id='la_x2s6df8d';s.defer=true;s.src=src;s.onload=s.onreadystatechange=function(){var rs=this.readyState;if(rs&&(rs!='complete')&&(rs!='loaded')){return;}c(this);};t.parentElement.insertBefore(s,t.nextSibling);})(document,'https://pepperifront.ladesk.com/scripts/track.js',function(e){ LiveAgent.createButton('s1l3h57y', e); });</script>`;
  zendesk = `<script id=“ze-snippet” src=“https://static.zdassets.com/ekr/snippet.js?key=fdbd81aa-20c5-4c44-975d-0956919574b7“></script>`;
  alert = `<script>(function() {console.log('dor');})()</script>`;
  tawkIo = `<script type="text/javascript">var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();(function(){var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];s1.async=true;s1.src='https://embed.tawk.to/660953021ec1082f04dd333a/1hqa6ogun';s1.charset='UTF-8';s1.setAttribute('crossorigin','*');s0.parentNode.insertBefore(s1,s0);})();</script>`;
  @Output() hostEvents: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private translate: TranslateService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.insertScriptElement(this.tawkIo);
  }

  ngOnChanges(e: any): void {}

  private insertScriptElement(scriptString: string): void {
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
      //if existing id keep it if not generate internal
      scriptElement.hasAttribute('id') ? null : scriptElement.id = 'pep-external-widget-loader';
      //check if widget exists on body
      const existingElement = document.getElementById(scriptElement.id);
      if(existingElement) {
        return;
      }
      this.renderer.appendChild(document.body, scriptElement); // Append to the body
    }
  }
}
