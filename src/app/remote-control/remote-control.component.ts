import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { GlobalVariablesService } from 'src/app/global-variables.service'
import { HelperFunctionsService} from 'src/app/helper-functions.service'

@Component({
  selector: 'app-remote-control',
  templateUrl: './remote-control.component.html',
  styleUrls: ['./remote-control.component.css']
})
export class RemoteControlComponent implements AfterViewInit {

  @ViewChild('buttonUp') buttonUp!: ElementRef;
  @ViewChild('buttonDown') buttonDown!: ElementRef;
  @ViewChild('buttonLeft') buttonLeft!: ElementRef;
  @ViewChild('buttonRight') buttonRight!: ElementRef;
  @ViewChild('buttonCenter') buttonCenter!: ElementRef;

  constructor(
    private renderer: Renderer2,
    public globals: GlobalVariablesService,
    private helper: HelperFunctionsService
  ) { }

  ngAfterViewInit() {

  }

  // Determines what to do when the up button is pressed
  pressButtonUp(): void {
    console.log("---UP BUTTON---");
    this.globals.lastButton = "up";
    this.globals.nextAction = "";
    this.flashButtonColor();
    this.helper.changeCursorLocation();
    this.helper.checkForScrolling();
    if (this.globals.nextAction == "moveCharacterKeysUp") {
      this.helper.moveCharacterKeysUp();
    }
    if (this.globals.selectorLocation == "onCharacters") {
      this.helper.clearCharacterCursor();
      this.helper.updateCharacterCursor();
    }
    else if (this.globals.selectorLocation == "onResults") {
      this.helper.clearResultCursor();
      this.helper.updateResultCursor();
    }
  }

  // Determines what to do when the down button is pressed
  pressButtonDown(): void {
    console.log("---DOWN BUTTON---");
    this.globals.lastButton = "down";
    this.globals.nextAction = "";
    this.flashButtonColor();
    this.helper.changeCursorLocation();
    this.helper.checkForScrolling();
    if (this.globals.nextAction == "moveCharacterKeysDown") {
      this.helper.moveCharacterKeysDown();
    }
    if (this.globals.selectorLocation == "onCharacters") {
      this.helper.clearCharacterCursor();
      this.helper.updateCharacterCursor();
    }
    else if (this.globals.selectorLocation == "onResults") {
      this.helper.clearResultCursor();
      this.helper.updateResultCursor();
    }
    if (this.globals.buttonCenterText == "Finish Search") {
      this.helper.updateButtonLabels();
    }
    //
  }

  // Determines what to do when the left button is pressed
  pressButtonLeft(): void {
    console.log("---LEFT BUTTON---");
    this.globals.lastButton = "left";
    this.globals.nextAction = "";
    this.flashButtonColor();
    this.helper.changeCursorLocation();
    switch (this.globals.nextAction) {
      case "setStartingVariables":
        this.globals.setStartingVariables();
        this.helper.resetKeyboard();
        this.helper.clearResultCursor();
        this.helper.updateCharacterCursor();
        this.helper.checkForScrolling();
        this.helper.updateSearchString();
        this.helper.updateButtonLabels();
        break;
      case "resetCursor":
        this.helper.resetCursor();
        this.helper.clearResultCursor();
        this.helper.updateCharacterCursor();
        this.helper.updateButtonLabels();
        break;
      case "deleteCharacter":
        this.globals.nextAction = "";
        this.helper.deleteCharacter();
        this.helper.updateSearchString();
        if (this.globals.nextAction == "findPossibleResults") {
          this.helper.getRequest();
          setTimeout(() => this.helper.getCharactersAndResults(), 100);
          setTimeout(() => this.helper.determineKeyLayout(), 100);
          setTimeout(() => this.helper.resetCursor(), 100);
          setTimeout(() => this.helper.clearCharacterCursor(), 100);
          setTimeout(() => this.helper.updateCharacterCursor(), 100);
        }
        else if (this.globals.nextAction == "resetKeyboard") {
          this.helper.resetKeyboard();
          this.helper.resetCursor();
          this.helper.updateCharacterCursor();
        }
        break;
    }
  }

  // Determines what to do when the right button is pressed
  pressButtonRight(): void {
    console.log("---RIGHT BUTTON---");
    this.globals.lastButton = "right";
    this.globals.nextAction = "";
    this.flashButtonColor();
    this.helper.clearCharacterCursor();
    this.helper.changeCursorLocation();
    switch (this.globals.nextAction) {
      case "resetCursor":
        this.helper.resetCursor();
        this.helper.updateResultCursor();
        this.helper.updateButtonLabels();
        break;
      case "addSpace":
        this.helper.addSpace();
        this.helper.updateSearchString();
        this.helper.resetKeyboard();
        this.helper.resetCursor();
        this.helper.updateCharacterCursor();
        this.helper.updateButtonLabels();
        break;
    }
  }

  // Determines what to do when the center button is pressed
  async pressButtonCenter(): Promise<void> {
    console.log("---CENTER BUTTON---");
    this.globals.lastButton = "center";
    this.globals.nextAction = "";
    this.flashButtonColor();
    this.helper.changeCursorLocation();
    switch (this.globals.nextAction) {
       case "addCharacter":
          this.helper.addCharacter();
          this.helper.updateSearchString();
          await this.helper.getRequest();
          this.helper.getCharactersAndResults();
          this.helper.determineKeyLayout();
          this.helper.updateButtonLabels();
          this.helper.updateSearchString();
          this.helper.resetCursor();
          this.helper.clearCharacterCursor();
          this.helper.updateCharacterCursor();
          this.helper.clearResultCursor();
          break;
      case "selectResult":
        this.globals.nextAction = "";
        this.helper.selectResult();
        if (this.globals.nextAction == "completeSearch") {
          this.helper.completeSearch();
          this.helper.updateButtonLabels();
        }
        if (this.globals.nextAction == "findPossibleResults") {
          this.helper.updateSearchString();
          this.helper.getRequest();
          setTimeout(() => this.helper.getCharactersAndResults(), 100);
          setTimeout(() => this.helper.determineKeyLayout(), 100);
          setTimeout(() => this.helper.updateButtonLabels(), 100);
          setTimeout(() => this.helper.updateSearchString(), 100);
          setTimeout(() => this.helper.resetCursor(), 100);
          setTimeout(() => this.helper.clearResultCursor(), 100);
          setTimeout(() => this.helper.updateResultCursor(),100);
        }
        break;
    }
  }

  // Temporarily turns a button yellow when it is pressed
  flashButtonColor(): void {
    console.log("flashButtonColor()");
    if (this.globals.lastButton == "up") {
      this.renderer.setStyle(this.buttonUp.nativeElement, 'backgroundColor', 'yellow');
      setTimeout(() => this.renderer.setStyle(this.buttonUp.nativeElement, 'backgroundColor', 'whitesmoke'), 250);
    }
    else if (this.globals.lastButton == "down") {
      this.renderer.setStyle(this.buttonDown.nativeElement, 'backgroundColor', 'yellow');
      setTimeout(() => this.renderer.setStyle(this.buttonDown.nativeElement, 'backgroundColor', 'whitesmoke'), 250);
    }
    else if (this.globals.lastButton == "left") {
      this.renderer.setStyle(this.buttonLeft.nativeElement, 'backgroundColor', 'yellow');
      setTimeout(() => this.renderer.setStyle(this.buttonLeft.nativeElement, 'backgroundColor', 'whitesmoke'), 250);
    }
    else if (this.globals.lastButton == "right") {
      this.renderer.setStyle(this.buttonRight.nativeElement, 'backgroundColor', 'yellow');
      setTimeout(() => this.renderer.setStyle(this.buttonRight.nativeElement, 'backgroundColor', 'whitesmoke'), 250);
    }
    if (this.globals.lastButton == "center") {
      this.renderer.setStyle(this.buttonCenter.nativeElement, 'backgroundColor', 'yellow');
      setTimeout(() => this.renderer.setStyle(this.buttonCenter.nativeElement, 'backgroundColor', 'whitesmoke'), 250);
    }
    

  }
}
