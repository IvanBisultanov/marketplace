import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterOutlet } from '@angular/router';

import { ShellModule } from '@ultra/shell';
import { PRODUCT_API_SERVICE_URL, WEALTH_API_SERVICE_URL } from '@ultra/tokens';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, RouterOutlet, ShellModule, HttpClientModule],
  providers: [
    {
      provide: WEALTH_API_SERVICE_URL,
      useValue: environment.wealthApiServiceBaseUrl,
    },
    {
      provide: PRODUCT_API_SERVICE_URL,
      useValue: environment.productApiServiceBaseUrl,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
