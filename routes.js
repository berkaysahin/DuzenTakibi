import React from 'react';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { MaterialIcons } from '@expo/vector-icons';

import GirisScreen from './screens/GirisScreen';
import KayitScreen from './screens/KayitScreen';
import YukleyiciScreen from './screens/YukleyiciScreen';
import AnaScreen from './screens/AnaScreen';
import ProfileScreen from './screens/ProfileScreen';
import Colors from './utils/Colors.js';

const getTabBarIcon = icon => ({ tintColor }) => (
  <MaterialIcons name={icon} size={26} style={{ color: tintColor }} />
);

const AppTabNavigator = createBottomTabNavigator(
  {
    Ana:{
      screen: AnaScreen,
      navigationOptions:{
        tabBarIcon: getTabBarIcon('list'),
      }
    },
    Profile:{
      screen: ProfileScreen,
      navigationOptions:{
        tabBarIcon: getTabBarIcon('person'),
      }
    }
  },
  {
    tabBarOptions:{
      style: {
        backgroundColor: Colors.themeOrangeDark,
      },
      tabBarPosition: 'bottom',
      showLabel:false,
      showIcon:true,
      activeTintColor: Colors.themeYellow,
      inactiveTintColor: Colors.white,
    }
  }
);

const AuthStack = createStackNavigator(
    {
        Giris:GirisScreen,
        Kayit:KayitScreen,
    },
    {
        headerMode: 'none',
        // navigationOptions: {
        //     tabBarIcon: getTabBarIcon('list'),
        // },
    }
)

export default createAppContainer(
  createSwitchNavigator({
    Yukleyici:YukleyiciScreen,
    App:AppTabNavigator,
    Auth:AuthStack,
  },
  {
    initialRouteName:"Yukleyici"
  })
)