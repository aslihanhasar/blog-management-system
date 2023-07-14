import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserModule } from './user/user.module';
import { ActionButtonComponent } from './action-button/action-button.component';
@NgModule({
  declarations: [
    AppComponent,
    ActionButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
   
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports:[ActionButtonComponent]
})
export class AppModule { }
