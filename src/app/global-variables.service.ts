import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalVariablesService implements OnInit {

  //http!: HttpClient;

  constructor(private http: HttpClient) { };

  wordList!: string[];


  // Button labels
  buttonLeftText?: string;
  buttonRightText?: string;
  buttonCenterText?: string;
  buttonUpText?: string;
  buttonDownText?: string;

    // Position of the "mouse"
  selectorLocation?: string; // onCharacters, onResults, complete
  characterCursorPosition?: number; // 0 to 8
  resultCursorPosition?: number; // 1 to 9
  topCharacterSet?: string; // HotKeys, Letters, Numbers
  topCharacterIndex?: number;
  bottomCharacterSet?: string;
  bottomCharacterIndex?: number;

  // Character cursor
  characterCursor1 = "color:whitesmoke";
  characterCursor2 = "color:whitesmoke";
  characterCursor3 = "color:whitesmoke";
  characterCursor4 = "color:black";
  characterCursor5 = "color:whitesmoke";
  characterCursor6 = "color:whitesmoke";
  characterCursor7 = "color:whitesmoke";

  // Results cursor
  resultCursor1 = "color:whitesmoke";
  resultCursor2 = "color:whitesmoke";
  resultCursor3 = "color:whitesmoke";
  resultCursor4 = "color:whitesmoke";
  resultCursor5 = "color:whitesmoke";
  resultCursor6 = "color:whitesmoke";
  resultCursor7 = "color:whitesmoke";
  resultCursor8 = "color:whitesmoke";
  resultCursor9 = "color:whitesmoke";

  // User's search query
  fullSearchString?: string;
  searchString?: string;
  displayString?: string;

  // All the English words that begin with the user's search query
  shortList = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

  // Options displayed on character side of the keyboard
  character1?: string;
  character2?: string;
  character3?: string;
  character4?: string;
  character5?: string;
  character6?: string;
  character7?: string;

  // Options displayed on the result side of the keyboard
  resultUp?: string;
  result1?: string;
  result2?: string;
  result3?: string;
  result4?: string;
  result5?: string;
  result6?: string;
  result7?: string;
  result8?: string;
  result9?: string;

  // The 7 letters most likely to be typed next
  hotKey1?: string;
  hotKey2?: string;
  hotKey3?: string;
  hotKey4?: string;
  hotKey5?: string;
  hotKey6?: string;
  hotKey7?: string;
  hotKeys = ["0", "1", "2", "3", "4", "5", "6"];
  hotKeyPosition? : number;
  numberOfHotKeys?: number // number of active hot keys

  // Key sets
  letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  numbers = "0123456789,.!?-/@#%()";

  // For control flow
  lastButton?: string;
  nextAction?: string;

  results = Array<string>();

  setStartingVariables() {
    console.log("setStartingVariables()");
    this.selectorLocation = "onCharacters";
    this.characterCursorPosition = 4;
    this.resultCursorPosition = 1;
    this.fullSearchString = "";
    this.searchString = "";
    this.displayString = "______________";
    this.shortList = [];
    this.buttonLeftText = "Backspace";
    this.buttonRightText = "To Results";
    this.buttonCenterText = "Select";
    this.buttonUpText = "Scroll Up";
    this.buttonDownText = "Scroll Down";
    this.resultUp = ".";
  }

  ngOnInit() {
  }
}


