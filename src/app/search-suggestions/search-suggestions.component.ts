import { Component, OnInit } from '@angular/core';
import { GlobalVariablesService } from 'src/app/global-variables.service'

@Component({
  selector: 'app-search-suggestions',
  templateUrl: './search-suggestions.component.html',
  styleUrls: ['./search-suggestions.component.css']
})
export class SearchSuggestionsComponent implements OnInit {

  constructor(public globals: GlobalVariablesService) { }

  ngOnInit(): void {
  }

}
