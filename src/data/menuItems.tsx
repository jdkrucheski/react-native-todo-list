import React from 'react';
import {AboutScreen} from '../screens/AboutScreen';
import {ConfigScreen} from '../screens/ConfigScreen';
import {ListsScreen} from '../screens/ListsScreen';

export interface Pages {
  [key: string]: JSX.Element;
}

export interface Links {
  name: string;
  link: string;
  icon: string;
  text: string;
}

export interface MenuItem {
  name: string;
  icon: string;
  component: string;
}

export const Pages: Pages = {
  Home: <ListsScreen />,
  About: <AboutScreen />,
  Config: <ConfigScreen />,
};

export const menuItems: MenuItem[] = [
  {
    name: 'Categorías',
    icon: 'home-outline',
    component: 'StackNavigator',
  },
  {
    name: 'Acerca de',
    icon: 'information-circle-outline',
    component: 'AboutScreen',
  },
  {
    name: 'Preferecias',
    icon: 'cog-outline',
    component: 'ConfigScreen',
  },
];

export const socialMedia: Links[] = [
  {
    name: 'google-play',
    link: 'http://play.google.com/store/apps/details?id=com.jonathankrucheski.todolist',
    icon: 'logo-google-playstore',
    text: 'Califica esta aplicación',
  },
  {
    name: 'more-apps',
    link: 'http://play.google.com/store/apps/dev?id=9040862469045992682',
    icon: 'code-download-outline',
    text: 'Más aplicaciones',
  },
  {
    name: 'linkedin',
    link: 'https://www.linkedin.com/in/jkrucheski/',
    icon: 'logo-linkedin',
    text: 'Mi Linkedin',
  },
  {
    name: 'github',
    link: 'https://github.com/jdkrucheski',
    icon: 'logo-github',
    text: 'Mi GitHub',
  },
];
