import { Component, OnInit } from '@angular/core';
import { GlobalVariablesService } from 'src/app/global-variables.service'
import { HelperFunctionsService } from 'src/app/helper-functions.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'keyboard-angular';

  constructor(public globals: GlobalVariablesService, private helper: HelperFunctionsService) { }

  ngOnInit() {
    this.globals.setStartingVariables();
    this.helper.resetKeyboard();
    this.globals.getWordList();
    
  }
  
}
