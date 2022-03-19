
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { GlobalVariablesService } from 'src/app/global-variables.service'
import { Observable } from 'rxjs';
import { map } from "rxjs/operators"


@Injectable({
  providedIn: 'root'
})
export class HelperFunctionsService {

  //http!: HttpClient;
  constructor(public globals: GlobalVariablesService, private http: HttpClient) { }

  addCharacter() {
    console.log("addCharacter()");
    var characterToAdd;
    switch (this.globals.characterCursorPosition) {
      case 1:
        characterToAdd = this.globals.character1;
        break;
      case 2:
        characterToAdd = this.globals.character2;
        break;
      case 3:
        characterToAdd = this.globals.character3;
        break;
      case 4:
        characterToAdd = this.globals.character4;
        break;
      case 5:
        characterToAdd = this.globals.character5;
        break;
      case 6:
        characterToAdd = this.globals.character6;
        break;
      case 7:
        characterToAdd = this.globals.character7;
        break;
      default:
        characterToAdd = "";
        break;
    }
    this.globals.fullSearchString += characterToAdd!;
  }

  addSpace() {
    console.log("addSpace()");
    this.globals.fullSearchString += " ";
  }

  changeCursorLocation() {
    console.log("changeCursorLocation()");
    switch (this.globals.lastButton) {
      case "up":
        if (this.globals.selectorLocation == "onCharacters" && this.globals.characterCursorPosition! > 0) {
          this.globals.characterCursorPosition! -= 1;
        }
        else if (this.globals.selectorLocation == "onResults" && this.globals.resultCursorPosition! > 1) {
          this.globals.resultCursorPosition! -= 1;
        }
        break;
      case "down":
        if (this.globals.selectorLocation == "onCharacters" && this.globals.characterCursorPosition! < 8) {
          this.globals.characterCursorPosition! += 1;
        }
        else if (this.globals.selectorLocation == "onResults" && this.globals.resultCursorPosition! < 9) {
          this.globals.resultCursorPosition! += 1;
        }
        break;
      case "left":
        if (this.globals.selectorLocation == "onCharacters") {
          this.globals.nextAction = "deleteCharacter";
        }
        else if (this.globals.selectorLocation == "onResults") {
          this.globals.selectorLocation = "onCharacters";
          this.globals.resultCursorPosition = 1;
          this.globals.nextAction = "resetCursor";
        }
        else if (this.globals.selectorLocation == "complete") {
          this.globals.nextAction = "setStartingVariables"
        }
        break;
      case "right":
        if (this.globals.selectorLocation == "onCharacters") {
          this.globals.selectorLocation = "onResults";
          this.globals.nextAction = "resetCursor";
        }
        else if (this.globals.selectorLocation == "onResults") {
          this.globals.selectorLocation = "onCharacters";
          this.globals.nextAction = "addSpace";
        }
        break;
      case "center":
        if (this.globals.selectorLocation == "onCharacters") {
          this.globals.nextAction = "addCharacter";
        }
        else if (this.globals.selectorLocation == "onResults") {
          this.globals.nextAction = "selectResult";
        }
        break;
        break;
    }
  }

  checkForScrolling() {
  console.log("checkForScrolling()")
  if (this.globals.selectorLocation == "onCharacters") {
    if (this.globals.characterCursorPosition == 0) {
      this.globals.nextAction = "moveCharacterKeysUp";
    }
    else if (this.globals.characterCursorPosition == 8) {
      this.globals.nextAction = "moveCharacterKeysDown";
    }
  }
}

  clearCharacterCursor() {
    console.log("clearCharacterCursor()");
    this.globals.characterCursor1 = "color:whitesmoke";
    this.globals.characterCursor2 = "color:whitesmoke";
    this.globals.characterCursor3 = "color:whitesmoke";
    this.globals.characterCursor4 = "color:whitesmoke";
    this.globals.characterCursor5 = "color:whitesmoke";
    this.globals.characterCursor6 = "color:whitesmoke";
    this.globals.characterCursor7 = "color:whitesmoke";
  }

  clearResultCursor() {
    console.log("clearResultCursor()");
    this.globals.resultCursor1 = "color:whitesmoke";
    this.globals.resultCursor2 = "color:whitesmoke";
    this.globals.resultCursor3 = "color:whitesmoke";
    this.globals.resultCursor4 = "color:whitesmoke";
    this.globals.resultCursor5 = "color:whitesmoke";
    this.globals.resultCursor6 = "color:whitesmoke";
    this.globals.resultCursor7 = "color:whitesmoke";
    this.globals.resultCursor8 = "color:whitesmoke";
    this.globals.resultCursor9 = "color:whitesmoke";
  }

  completeSearch() {
    console.log("completeSearch()");
    this.globals.selectorLocation = "complete";
    this.globals.resultUp = "Search complete!";
  }

  deleteCharacter() {
    console.log("deleteCharacter()");
    if (this.globals.fullSearchString!.length > 0) {
      this.globals.fullSearchString = this.globals.fullSearchString!.substring(0, this.globals.fullSearchString!.length - 1);
    }
  }

  determineKeyLayout() {
    console.log("determineKeyLayout()");
    this.globals.topCharacterIndex = 0;
    if (this.globals.numberOfHotKeys == 0) {
      this.globals.bottomCharacterIndex = 6;
      this.globals.topCharacterSet = "Letters";
      this.globals.bottomCharacterSet = "Letters";
    }
    else if (this.globals.numberOfHotKeys == 7) {
      this.globals.bottomCharacterIndex = 6;
      this.globals.topCharacterSet = "HotKeys";
      this.globals.bottomCharacterSet = "HotKeys";
    }
    else {
      this.globals.bottomCharacterIndex = 6 - this.globals.numberOfHotKeys!;
      this.globals.topCharacterSet = "HotKeys";
      this.globals.bottomCharacterSet = "Letters";
    }
    this.globals.character1 = this.globals.numberOfHotKeys! >= 1 ? this.globals.hotKey1 : this.globals.letters[this.globals.numberOfHotKeys!];
    this.globals.character2 = this.globals.numberOfHotKeys! >= 2 ? this.globals.hotKey2 : this.globals.letters[1 - this.globals.numberOfHotKeys!];
    this.globals.character3 = this.globals.numberOfHotKeys! >= 3 ? this.globals.hotKey3 : this.globals.letters[2 - this.globals.numberOfHotKeys!];
    this.globals.character4 = this.globals.numberOfHotKeys! >= 4 ? this.globals.hotKey4 : this.globals.letters[3 - this.globals.numberOfHotKeys!];
    this.globals.character5 = this.globals.numberOfHotKeys! >= 5 ? this.globals.hotKey5 : this.globals.letters[4 - this.globals.numberOfHotKeys!];
    this.globals.character6 = this.globals.numberOfHotKeys! >= 6 ? this.globals.hotKey6 : this.globals.letters[5 - this.globals.numberOfHotKeys!];
    this.globals.character7 = this.globals.numberOfHotKeys == 7 ? this.globals.hotKey7 : this.globals.letters[6 - this.globals.numberOfHotKeys!];
  }

  getCharactersAndResults() {
    console.log("getCharactersAndResults()")
    if (this.globals.fullSearchString != null) {
      const headerDict = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
      }

      const requestOptions = {
        headers: new HttpHeaders(headerDict),
      };
      this.globals.searchString = this.globals.fullSearchString.split(" ").slice(-1)[0];
      var urlAPI = "https://localhost:44350/api/Values/" + this.globals.searchString;
      console.log("sending get request to: " + urlAPI)
      var words = this.http.get(urlAPI, requestOptions);
      console.log(words);
    }
  }

  moveCharacterKeysDown() {
    console.log("moveCharacterKeysDown()");
    this.globals.characterCursorPosition = 7;
    if (this.globals.bottomCharacterIndex! < this.globals.letters.length - 1) {
      this.globals.character1 = this.globals.character2;
      this.globals.character2 = this.globals.character3;
      this.globals.character3 = this.globals.character4;
      this.globals.character4 = this.globals.character5;
      this.globals.character5 = this.globals.character6;
      this.globals.character6 = this.globals.character7;
      if (this.globals.topCharacterSet == "Numbers") {
        this.globals.topCharacterIndex! -= 1;
      }
      else {
        this.globals.topCharacterIndex! += 1;
      }
      if (this.globals.bottomCharacterSet == "Numbers") {
        this.globals.bottomCharacterIndex! -= 1;
      }
      else {
        this.globals.bottomCharacterIndex! += 1;
      }
      if (this.globals.bottomCharacterIndex! >= 0) {
        switch (this.globals.bottomCharacterSet) {
          case "Numbers":
            this.globals.character7 = this.globals.numbers[this.globals.bottomCharacterIndex!];
            break;
          case "Letters":
            this.globals.character7 = this.globals.letters[this.globals.bottomCharacterIndex!];
            break;
          case "HotKeys":
            if (this.globals.bottomCharacterIndex! < this.globals.numberOfHotKeys!) {
              this.globals.character7 = this.globals.hotKeys[this.globals.bottomCharacterIndex!];
            }
            else {
              this.globals.bottomCharacterSet = "Letters";
              this.globals.bottomCharacterIndex = 0;
              this.globals.character7 = this.globals.letters[0];
            }
            break;
        }
      }
      else if (this.globals.bottomCharacterSet == "Numbers" && this.globals.numberOfHotKeys! > 0) {
        this.globals.bottomCharacterIndex = 0;
        this.globals.bottomCharacterSet = "HotKeys";
        this.globals.character7 = this.globals.hotKeys[0];
      }
      else {
        this.globals.bottomCharacterIndex = 0;
        this.globals.bottomCharacterSet = "Letters";
        this.globals.character7 = this.globals.letters[0];
      }
      if (this.globals.topCharacterSet == "Numbers" && this.globals.topCharacterIndex! < 0) {
        this.globals.topCharacterIndex = 0;
        if (this.globals.numberOfHotKeys! > 0) {
          this.globals.topCharacterSet = "HotKeys";
        }
        else {
          this.globals.topCharacterSet = "Letters";
        }
      }
      else if (this.globals.topCharacterSet == "HotKeys" && this.globals.topCharacterIndex! >= this.globals.numberOfHotKeys!) {
        this.globals.topCharacterSet = "Letters";
        this.globals.topCharacterIndex = 0;
      }
    }
  }

  moveCharacterKeysUp() {
    console.log("moveCharacterKeysUp()");
    this.globals.characterCursorPosition = 1;
    if (this.globals.topCharacterIndex! < this.globals.numbers.length - 1) {
      this.globals.character7 = this.globals.character6;
      this.globals.character6 = this.globals.character5;
      this.globals.character5 = this.globals.character4;
      this.globals.character4 = this.globals.character3;
      this.globals.character3 = this.globals.character2;
      this.globals.character2 = this.globals.character1;
      if (this.globals.topCharacterSet == "Numbers") {
        this.globals.topCharacterIndex! += 1;
      }
      else {
        this.globals.topCharacterIndex! -= 1;
      }
      if (this.globals.bottomCharacterSet == "Numbers") {
        this.globals.bottomCharacterIndex! += 1;
      }
      else {
        this.globals.bottomCharacterIndex! -= 1;
      }
      if (this.globals.topCharacterIndex! >= 0) {
        switch (this.globals.topCharacterSet) {
          case "Numbers":
            this.globals.character1 = this.globals.numbers[this.globals.topCharacterIndex!];
            break;
          case "Letters":
            this.globals.character1 = this.globals.letters[this.globals.topCharacterIndex!];
            break;
          case "HotKeys":
            if (this.globals.topCharacterIndex! < this.globals.numberOfHotKeys!) {
              this.globals.character1 = this.globals.hotKeys[this.globals.topCharacterIndex!].toString();
            }
            else {
              this.globals.topCharacterSet = "Numbers";
              this.globals.topCharacterIndex = 0;
              this.globals.character1 = this.globals.numbers[0];
            }
            break;
        }
      }
      else if (this.globals.topCharacterSet == "Letters" && this.globals.numberOfHotKeys! > 0) {
        this.globals.topCharacterIndex = this.globals.numberOfHotKeys! - 1;
        this.globals.topCharacterSet = "HotKeys";
        this.globals.character1 = this.globals.hotKeys[this.globals.topCharacterIndex].toString();
      }
      else {
        this.globals.topCharacterIndex = 0;
        this.globals.topCharacterSet = "Numbers";
        this.globals.character1 = this.globals.numbers[0];
      }
      if (this.globals.bottomCharacterSet == "Letters" && this.globals.bottomCharacterIndex! < 0) {
        if (this.globals.numberOfHotKeys! > 0) {
          this.globals.bottomCharacterSet = "HotKeys";
          this.globals.bottomCharacterIndex = this.globals.numberOfHotKeys! - 1;
        }
        else {
          this.globals.bottomCharacterSet = "Numbers";
          this.globals.bottomCharacterIndex = 0;
        }
      }
      else if (this.globals.bottomCharacterSet == "HotKeys" && this.globals.bottomCharacterIndex! < 0) {
        this.globals.bottomCharacterSet = "Numbers";
        this.globals.bottomCharacterIndex = 0;
      }
    }
  }

  resetCursor() {
    console.log("resetCursor()");
    if (this.globals.selectorLocation == "onCharacters") {
      this.globals.characterCursorPosition = this.globals.numberOfHotKeys! > 0 ? Math.round(this.globals.numberOfHotKeys! / 2) : 4;
      this.globals.nextAction = "updateCharacterCursor";
    }
    else if (this.globals.selectorLocation = "onResults") {
      this.globals.resultCursorPosition = 1;
      this.globals.nextAction = "updateResultCursor";
    }
  }

  resetKeyboard() {
  console.log("resetKeyboard()")
  this.globals.character1 = 'A';
  this.globals.character2 = 'C';
    this.globals.character3 = 'M';
    this.globals.character4 = 'P';
    this.globals.character5 = 'S';
    this.globals.character6 = 'T';
    this.globals.character7 = 'U';
    this.globals.result1 = "and";
    this.globals.result2 = "for";
    this.globals.result3 = "have";
    this.globals.result4 = "not";
    this.globals.result5 = "that";
    this.globals.result6 = "this";
    this.globals.result7 = "the";
    this.globals.result8 = "with";
    this.globals.result9 = "you";
    this.globals.hotKey1 = this.globals.character1;
    this.globals.hotKey2 = this.globals.character2;
    this.globals.hotKey3 = this.globals.character3;
    this.globals.hotKey4 = this.globals.character4;
    this.globals.hotKey5 = this.globals.character5;
    this.globals.hotKey6 = this.globals.character6;
    this.globals.hotKey7 = this.globals.character7;
    this.globals.numberOfHotKeys = 7;
    this.globals.hotKeys = [this.globals.hotKey1, this.globals.hotKey2, this.globals.hotKey3, this.globals.hotKey4, this.globals.hotKey5, this.globals.hotKey6, this.globals.hotKey7];
    this.globals.topCharacterSet = "HotKeys";
    this.globals.topCharacterIndex = 0;
    this.globals.bottomCharacterSet = "HotKeys";
    this.globals.bottomCharacterIndex = 6;
    this.globals.shortList = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    this.globals.nextAction = "updateCharacterCursor";
}

  selectResult() {
    console.log("selectResult()")
    var resultSelected;
    switch (this.globals.resultCursorPosition) {
      case 1:
        resultSelected = this.globals.result1;
        break;
      case 2:
        resultSelected = this.globals.result2;
        break;
      case 3:
        resultSelected = this.globals.result3;
        break;
      case 4:
        resultSelected = this.globals.result4;
        break;
      case 5:
        resultSelected = this.globals.result5;
        break;
      case 6:
        resultSelected = this.globals.result6;
        break;
      case 7:
        resultSelected = this.globals.result7;
        break;
      case 8:
        resultSelected = this.globals.result8;
        break;
      case 9:
        resultSelected = this.globals.result9;
        break;
      default:
        resultSelected = "";
        break;
    }
    var lastWordOfSearch = this.globals.fullSearchString!.split(" ").slice(-1)[0];
    var theFirstPartOfSearch = this.globals.fullSearchString!.substring(0, this.globals.fullSearchString!.length - lastWordOfSearch.length);
    if (resultSelected!.toUpperCase() == lastWordOfSearch) {
      this.globals.nextAction = "completeSearch";
    }
    else if (resultSelected != "&nbsp") {
      this.globals.fullSearchString = theFirstPartOfSearch + resultSelected!.toUpperCase();
      this.globals.nextAction = "findPossibleResults";
    }
  }

  updateButtonLabels() {
    console.log("updateButtonLabels()");
    switch (this.globals.selectorLocation) {
      case "onCharacters":
        this.globals.buttonLeftText = "Backspace";
        this.globals.buttonRightText = "To Results";
        this.globals.buttonCenterText = "Select";
        this.globals.buttonUpText = "Scroll Up";
        this.globals.buttonDownText = "Scroll Down";
        break;
      case "complete":
        this.globals.buttonLeftText = "New Search";
        this.globals.buttonRightText = "&nbsp";
        this.globals.buttonCenterText = "&nbsp";
        this.globals.buttonUpText = "&nbsp";
        this.globals.buttonDownText = "&nbsp";
        break;
      case "onResults":
        this.globals.buttonLeftText = "To Keyboard";
        this.globals.buttonRightText = "Space";
        var resultHovered;
        switch (this.globals.resultCursorPosition) {
          case 1:
            resultHovered = this.globals.result1;
            break;
          case 2:
            resultHovered = this.globals.result2;
            break;
          case 3:
            resultHovered = this.globals.result3;
            break;
          case 4:
            resultHovered = this.globals.result4;
            break;
          case 5:
            resultHovered = this.globals.result5;
            break;
          case 6:
            resultHovered = this.globals.result6;
            break;
          case 7:
            resultHovered = this.globals.result7;
            break;
          case 8:
            resultHovered = this.globals.result8;
            break;
          case 9:
            resultHovered = this.globals.result9;
            break;
          default:
            resultHovered = "";
            break;
        }
        if (resultHovered!.toUpperCase() == this.globals.searchString) {
          this.globals.buttonCenterText = "Finish Search";
        }
        else {
          this.globals.buttonCenterText  = "Select";
        }
        break;
    }
  }

  updateCharacterCursor() {
    console.log("updateCharacterCursor()");
    switch (this.globals.characterCursorPosition) {
      case 1:
        this.globals.characterCursor1 = "color:black";
        break;
      case 2:
        this.globals.characterCursor2 = "color:black";
        break;
      case 3:
        this.globals.characterCursor3 = "color:black";
        break;
      case 4:
        this.globals.characterCursor4 = "color:black";
        break;
      case 5:
        this.globals.characterCursor5 = "color:black";
        break;
      case 6:
        this.globals.characterCursor6 = "color:black";
        break;
      case 7:
        this.globals.characterCursor7 = "color:black";
        break;
    }
  }

  updateResultCursor() {
    console.log("updateResultCursor()");
    switch (this.globals.resultCursorPosition) {
      case 1:
        this.globals.resultCursor1 = "color:black";
        break;
      case 2:
        this.globals.resultCursor2 = "color:black";
        break;
      case 3:
        this.globals.resultCursor3 = "color:black";
        break;
      case 4:
        this.globals.resultCursor4 = "color:black";
        break;
      case 5:
        this.globals.resultCursor5 = "color:black";
        break;
      case 6:
        this.globals.resultCursor6 = "color:black";
        break;
      case 7:
        this.globals.resultCursor7 = "color:black";
        break;
      case 8:
        this.globals.resultCursor8 = "color:black";
        break;
      case 9:
        this.globals.resultCursor9 = "color:black";
        break;
    }
  }

  updateSearchString() {
    console.log("updateSearchString()");
    if (this.globals.fullSearchString!.length == 0) {
      this.globals.nextAction = "resetKeyboard";
    }
    else {
      this.globals.nextAction = "findPossibleResults";
    }
    this.globals.displayString = this.globals.fullSearchString + "_";
    for (var i = this.globals.fullSearchString!.length; i < 12; i++) {
      this.globals.displayString += "_";
    }
  }

}
