import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'BMX';

  constructor(private translateServ: TranslateService) {
    this.translateServ.addLangs(['en', 'es']);
    this.translateServ.setDefaultLang('es');
    this.translateServ.use(localStorage.getItem('lang') || 'es');  
    
  }
}
