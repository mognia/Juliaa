import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { PagesComponent } from './pages.component';


import { AdminUserListComponent } from './admin-user-list/admin-user-list.component';
import { ReferalComponent } from './referal/referal.component';
import { ResetPassComponent } from './reset-pass/reset-pass.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UsersListComponent } from './users-list/users-list.component';
export const routes: Routes = [
    {
        path: '', 
        component: PagesComponent,
        children:[
            { path:'', redirectTo:'dashboard', pathMatch:'full' },
            { path: 'dashboard', loadChildren: 'app/pages/dashboard/dashboard.module#DashboardModule', data: { breadcrumb: 'Dashboard' }  },          
          

            { path: 'form-elements', loadChildren: 'app/pages/form-elements/form-elements.module#FormElementsModule', data: { breadcrumb: 'Form Elements' } },
            { path: 'package', loadChildren: 'app/pages/package/package.module#PackageModule', data: { breadcrumb: 'Packages' } },
            { path: 'ChangeRole', component:AdminUserListComponent, data: { breadcrumb: 'Change Role' } },
            { path: 'UserList', component:UsersListComponent, data: { breadcrumb: 'Users List' } },
            { path: 'referal', component:ReferalComponent, data: { breadcrumb: 'Referals' } },
            { path: 'userDashboard', component:UserDashboardComponent, data: { breadcrumb: 'Dashboard' } },
            { path: 'resetPass', component:ResetPassComponent, data: { breadcrumb: 'Reset Password' } },             
            { path: 'ticketing', loadChildren: 'app/pages/ticketing/ticketing.module#TicketingModule', data: { breadcrumb: 'Ticketing' } },


       ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);