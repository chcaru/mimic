import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventHubComponent } from './pages/event-hub/event-hub.component';
import { NewEventHubComponent } from './pages/new-event-hub/new-event-hub.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/new'
    },
    {
        path: 'new',
        pathMatch: 'full',
        component: NewEventHubComponent,
    },
    {
        path: 'event-hubs/:eventHubId',
        pathMatch: 'full',
        component: EventHubComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
