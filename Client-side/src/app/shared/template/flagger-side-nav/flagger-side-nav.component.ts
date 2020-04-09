import { Component, OnInit } from '@angular/core';
import { ThemeConstantService } from '../../services/theme-constant.service';
import { ROUTES } from './flaggers-side-nave-routes.config';

@Component({
  selector: 'app-flagger-side-nav',
  templateUrl: './flagger-side-nav.component.html',
  styles: []
})
export class FlaggerSideNavComponent implements OnInit {

  public menuItems: any[]
  isFolded : boolean;
  isSideNavDark : boolean;

  constructor( private themeService: ThemeConstantService) {}

  ngOnInit(): void {
      this.menuItems = ROUTES.filter(menuItem => menuItem);
      this.themeService.isMenuFoldedChanges.subscribe(isFolded => this.isFolded = isFolded);
      this.themeService.isSideNavDarkChanges.subscribe(isDark => this.isSideNavDark = isDark);
  }

}
