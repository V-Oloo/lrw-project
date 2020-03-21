import { SideNavInterface } from '../../interfaces/side-nav.type';
export const ROUTES: SideNavInterface[] = [
    {
        path: '/dashboard',
        title: 'Dashboard',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'dashboard',
        submenu: []
    },

    {
      path: '/employees',
      title: 'Employees',
      iconType: 'fontawesome',
      iconTheme: 'outline',
      icon: 'fas fa-users',
      submenu: []
    },

    {
      path: '/customers',
      title: 'Customers',
      iconType: 'fontawesome',
      iconTheme: 'outline',
      icon: 'fab fa-servicestack',
      submenu: []
    },

    {
      path: '/projects',
      title: 'Projects',
      iconType: 'fontawesome',
      iconTheme: 'outline',
      icon: 'fab fa-r-project',
      submenu: []
    },


]
