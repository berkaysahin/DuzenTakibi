import React from 'react';
import { Dimensions, SafeAreaView, Text, StyleSheet, View, Button, Image, TouchableOpacity } from 'react-native';

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

import {DrawerItems} from 'react-navigation-drawer'

import firebase from 'firebase'

const getTabBarIcon = icon => ({ tintColor }) => (
  <MaterialIcons name={icon} size={26} style={{ color: tintColor }} />
);

const DrawerMenusu = (props) => (
  <View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
        <View style={{height:150, backgroundColor:'white'}}>
          <Image source={require('./assets/logo.png')} style={{ width: 120, height: 120, borderRadius:40 }} />
        </View>
        <View style={{alignItems:'center'}}>
          <Text>{firebase.auth().currentUser.email}</Text>
          <View style={{ margin: 10 }}>
          <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.props.navigation.navigate('Profile')}
                    >
                        <Text style={{ fontSize: 20 }}>Giriş Yap</Text>
                    </TouchableOpacity>
                </View>
          </View>
          <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => firebase.auth().signOut()}
                    >
                        <Text style={{ fontSize: 20 }}>Çıkış Yap</Text>
                    </TouchableOpacity>
          </View>
        </View>
      </View>
);

const styles = StyleSheet.create({
  input: {
      backgroundColor: Colors.white,
      fontSize: 14,
      height: 40,
      width: 250,
      borderRadius: 20,
      paddingLeft: 20,
  },
  button: {
      alignItems: 'center',
      backgroundColor: Colors.button,
      padding: 8,
      width: Dimensions.get('window').width*3/5,
      borderRadius: 20,
      paddingLeft: 20,
  },
});

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