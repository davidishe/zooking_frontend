import { Injectable } from '@angular/core';


@Injectable()
export class ThemeService {

  isDarkMode!: boolean;
  constructor(
  ) { }

  switchMode(): void {
    if (this.isDarkMode) {
      this.changeToDefaultTheme();
      localStorage.setItem('app-dark-mode', 'false');
    } else {
      this.changeToDarkTheme();
      localStorage.setItem('app-dark-mode', 'true');
    }
  }

  checkDarkModeStatus(): void {
    const isDarkMode = localStorage.getItem('app-dark-mode');
    if (isDarkMode === 'true') {
      this.changeToDarkTheme();
    } else {
      this.changeToDefaultTheme();
    }
  }


  changeToDarkTheme(): void {
    this.isDarkMode = true;
      const documentStyle = document.documentElement.style;
      documentStyle.setProperty('--background', 'var(--background-dark)');
      documentStyle.setProperty('--background-footer', 'var(--background-footer-dark)');
      documentStyle.setProperty('--svg-banner', 'var(--svg-banner-dark)');
      documentStyle.setProperty('--background-carousel', 'var(--background-carousel-dark)');
      documentStyle.setProperty('--background-card', 'var(--background-card-dark)');
      documentStyle.setProperty('--navbar-background', 'var(--navbar-background-dark)');
      documentStyle.setProperty('--font', 'var(--font-dark)');
      documentStyle.setProperty('--svg-footer', 'var(--svg-footer-dark)');
      documentStyle.setProperty('--font-hover', 'var(--font-hover-dark)');
      documentStyle.setProperty('--logo-color', 'var(--logo-color-dark)');
      documentStyle.setProperty('--form-field-background', 'var(--form-field-background-dark)');
      documentStyle.setProperty('--drop-down-nav', 'var(--drop-down-nav-dark)');
      documentStyle.setProperty('--drop-down-nav-inner', 'var(--drop-down-nav-inner-dark)');
      documentStyle.setProperty('--nav-scroll', 'var(--nav-scroll-dark)');
      documentStyle.setProperty('--nav-scroll-hover', 'var(--nav-scroll-hover-dark)');
      documentStyle.setProperty('--mat-btn-hover', 'var(--mat-btn-hover-dark)');
      documentStyle.setProperty('--mat-btn', 'var(--mat-btn-dark)');

      documentStyle.setProperty('--background-white', '#383838');
      documentStyle.setProperty('--lightgrey', 'lightgrey');
      documentStyle.setProperty('--footer-link-hover', 'white');
  }


  changeToDefaultTheme(): void {
      this.isDarkMode = false;
      const documentStyle = document.documentElement.style;
      documentStyle.setProperty('--background', 'var(--background-default)');
      documentStyle.setProperty('--background-footer', 'var(--background-footer-default)');
      documentStyle.setProperty('--svg-banner', 'var(--svg-banner-default)');
      documentStyle.setProperty('--background-carousel', 'var(--background-carousel-default)');
      documentStyle.setProperty('--background-card', 'var(--background-card-default)');
      documentStyle.setProperty('--navbar-background', 'var(--navbar-background-default)');
      documentStyle.setProperty('--font', 'var(--font-default)');
      documentStyle.setProperty('--svg-footer', 'var(--svg-footer-default)');
      documentStyle.setProperty('--font-hover', 'var(--font-hover-default)');
      documentStyle.setProperty('--logo-color', 'var(--logo-color-default)');
      documentStyle.setProperty('--form-field-background', 'var(--form-field-background-default)');

      documentStyle.setProperty('--drop-down-nav', 'var(--drop-down-nav-default)');
      documentStyle.setProperty('--drop-down-nav-inner', 'var(--drop-down-nav-inner-default)');

      documentStyle.setProperty('--nav-scroll', 'var(--nav-scroll-default)');
      documentStyle.setProperty('--nav-scroll-hover', 'var(--nav-scroll-hover-default)');

      documentStyle.setProperty('--mat-btn-hover', 'var(--mat-btn-hover-default)');
      documentStyle.setProperty('--mat-btn', 'var(--mat-btn-default)');
  }


}
