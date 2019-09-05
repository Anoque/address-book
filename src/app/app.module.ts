import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddressBookListComponent } from './address-book-list/address-book-list.component';
import {SharedModule} from './shared/shared.module';
import { AddressBookFormComponent } from './address-book-form/address-book-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {AgmCoreModule} from '@agm/core';
import { AddressBookAddComponent } from './address-book-add/address-book-add.component';
import { AddressBookEditComponent } from './address-book-edit/address-book-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    AddressBookListComponent,
    AddressBookFormComponent,
    AddressBookAddComponent,
    AddressBookEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    AgmCoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
