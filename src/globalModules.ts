import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
// import { AuthService } from '../../core/services/auth.service';
//import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatHint } from '@angular/material/form-field';
import { NgModule } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { FormControl, ReactiveFormsModule} from '@angular/forms';
import {MatBadgeModule} from '@angular/material/badge';

//import { FormsModule } from '@angular/forms';
//


import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  
} from '@angular/material/dialog';
import { MatOption, MatSelect } from '@angular/material/select';

//import { MatButtonModule } from '@angular/material/button';
// https://stackoverflow.com/questions/78129075/how-to-globally-import-some-module-in-angular-with-standalone-components
export const globalModules = [
  // Globally loaded modules
  CommonModule,
  MatCardModule,
  CommonModule,
  MatButtonModule,
  MatCardModule,
  MatHint,
  MatInputModule,
  MatFormFieldModule,
  MatTableModule,
  MatInputModule,
  MatBadgeModule,
  MatSelect,
  MatOption,
  ReactiveFormsModule
  //FormControl,
  //FormsModule
  //BrowserModule,
  // should this be here
  //ReactiveFormsModule
    //MAT_DIALOG_DATA,
//  MatDialog,
//   MatDialogActions,
//   MatDialogClose,
//   MatDialogRef,
//   MatDialogTitle,
//   MatDialogContent

  //NgModule
]