import { Component, OnInit } from '@angular/core';
import { GlobalVariablesService } from 'src/app/global-variables.service';

@Component({
  selector: 'app-character-keys',
  templateUrl: './character-keys.component.html',
  styleUrls: ['./character-keys.component.css']
})
export class CharacterKeysComponent implements OnInit {

  constructor(public globals: GlobalVariablesService) { }

  ngOnInit(): void {
  }

}
