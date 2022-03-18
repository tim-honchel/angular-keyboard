import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RemoteControlComponent } from './remote-control/remote-control.component';
import { TvScreenComponent } from './tv-screen/tv-screen.component';
import { CharacterKeysComponent } from './character-keys/character-keys.component';
import { SearchSuggestionsComponent } from './search-suggestions/search-suggestions.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    RemoteControlComponent,
    TvScreenComponent,
    CharacterKeysComponent,
    SearchSuggestionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
