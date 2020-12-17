import React from 'react';
import { Dimensions, SafeAreaView, Text, StyleSheet, View, Button } from 'react-native';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
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

class DrawerMenusu extends React.Component{
  render(){
    return(
      <SafeAreaView style={{flex: 1}}>
        <View style={{height:150, alignItems:'center',justifyContent:'center'}}>
          <Button title="Profil Sayfası" onPress={() => this.props.navigation.navigate('Profile')} />
        </View>
      </SafeAreaView>
    );
  }
};

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

const AppDrawerNavigator = createDrawerNavigator(
  {
    AppTabNavigator:AppTabNavigator,
    Profile:ProfileScreen,
  },
  {
    contentComponent: DrawerMenusu,
    initialRouteName:'AppTabNavigator',
    drawerWidth:(Dimensions.get('window').width*3/4),
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
    App:AppDrawerNavigator,
    Auth:AuthStack,
  },
  {
    initialRouteName:"Yukleyici"
  })
)