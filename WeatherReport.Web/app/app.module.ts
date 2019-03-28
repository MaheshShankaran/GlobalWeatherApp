import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';
import { WeatherReportComponent } from './components/weather.component';
import { HomeComponent } from './components/home.component';
import { WeatherService} from './Service/weather.service';

@NgModule({
    imports: [BrowserModule, ReactiveFormsModule, HttpModule, routing, Ng2Bs3ModalModule, FormsModule],
    declarations: [AppComponent, HomeComponent, WeatherReportComponent],
    providers: [{ provide: APP_BASE_HREF, useValue: '/' }, WeatherService],
    bootstrap: [AppComponent]

})
export class AppModule { }
