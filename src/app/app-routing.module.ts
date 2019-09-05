import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddressBookListComponent } from './address-book-list/address-book-list.component';
import { AddressBookAddComponent } from './address-book-add/address-book-add.component';
import { AddressBookEditComponent } from './address-book-edit/address-book-edit.component';


const routes: Routes = [
  { path: '', component: AddressBookListComponent },
  { path: 'add', component: AddressBookAddComponent },
  { path: 'edit/:id', component: AddressBookEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
