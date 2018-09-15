import { Menu } from './menu.model';

export const verticalMenuItems = [ 
    new Menu (1, 'Dashboard', '/pages/dashboard', null, 'tachometer', null, false, 0,'any'),

    new Menu (3, 'User KYC', '/pages/form-elements/UserKYC', null, 'magic', null, false, 0,'user'),
    new Menu (4, 'User Ticketing', '/pages/ticketing/UserTicket', null, 'magic', null, false, 0,'user'),
    new Menu (5, 'Admin KYC', '/pages/form-elements/AdminKYC', null, 'caret-right', null, false, 0,'admin'),
    new Menu (6, 'Admin Ticketing', '/pages/ticketing/AdminTicket', null, 'caret-right', null, false, 0,'admin'),
    new Menu (7, 'Packages', null, null, 'caret-right', null, true, 0,'user'),
    new Menu (8, 'LongTerm', '/pages/package/LongTerm', null, 'keyboard-o', null, false, 7,'user'),
    new Menu (9, 'ShortTerm', '/pages/package/ShortTerm', null, 'keyboard-o', null, false, 7,'user'),
    new Menu (10, 'Change Role', '/pages/ChangeRole', null, 'caret-right', null, false, 0,'admin'),
    new Menu (11, 'Referal', '/pages/referal', null, 'keyboard-o', null, false, 0,'user'),
    new Menu (12, 'Usres List', '/pages/UserList', null, 'caret-right', null, false, 0,'admin'),
    // new Menu (30, 'NGX DataTable', '/pages/tables/dynamic-tables/ngx', null, 'caret-right', null, false, 28,'admin'), 
]

