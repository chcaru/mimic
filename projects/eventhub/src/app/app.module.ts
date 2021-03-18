import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { en_US } from 'ng-zorro-antd/i18n';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCodeEditorModule } from 'ng-zorro-antd/code-editor';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { registerLocaleData } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import en from '@angular/common/locales/en';
import { LineChartModule } from '@swimlane/ngx-charts';

import { AppComponent } from './app.component';
import { AppEffects } from './store/effects';
import { AppRoutingModule } from './app-routing.module';
import { EventHubComponent } from './pages/event-hub/event-hub.component';
import { IconsProviderModule } from './icons-provider.module';
import { MimicDefinerComponent } from './components/mimic-definer/mimic-definer.component';
import { NewEventHubComponent } from './pages/new-event-hub/new-event-hub.component';
import { reducers, metaReducers } from './store';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

registerLocaleData(en);

@NgModule({
    declarations: [
        AppComponent,
        EventHubComponent,
        MimicDefinerComponent,
        NewEventHubComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        StoreModule.forRoot(reducers, {
            metaReducers,
        }),
        EffectsModule.forRoot([AppEffects]),
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        IconsProviderModule,
        NzCodeEditorModule,
        NzButtonModule,
        NzInputModule,
        NzLayoutModule,
        NzMenuModule,
        NzPopconfirmModule,
        NzSelectModule,
        NzSliderModule,
        LineChartModule,
        StoreRouterConnectingModule.forRoot(),
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ],
    providers: [{ provide: NZ_I18N, useValue: en_US }],
    bootstrap: [AppComponent],
})
export class AppModule { }
