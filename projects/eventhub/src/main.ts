import { Buffer } from 'buffer';
const w = (window as any);
w.Buffer = Buffer;
w.process = {
    env: {},
    nextTick: x => x(),
};

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
