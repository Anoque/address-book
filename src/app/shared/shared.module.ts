import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule, MatFormFieldModule, MatInputModule, MatToolbarModule} from '@angular/material';
import {AgmCoreModule} from '@agm/core';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAQyMCp0ilXvkgQVXNguHJrp086FBvmujg'
    }),
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class SharedModule { }
