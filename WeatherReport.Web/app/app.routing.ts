import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home.component';
import { WeatherReportComponent } from './components/weather.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'weather', component: WeatherReportComponent }
];

export const routing: ModuleWithProviders =
    RouterModule.forRoot(appRoutes);