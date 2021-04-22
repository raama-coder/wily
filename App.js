import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet,Image} from 'react-native';
import { createAppContainer} from "react-navigation"
import { createBottomTabNavigator} from "react-navigation-tabs"

import Search from "./screens/Search"
import Transaction from "./screens/Transaction"

export default class App extends React.Component  {
  render(){
  return (
    <AppContainer/>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Tabs=createBottomTabNavigator({
Search:{screen:Search},
Transaction:{screen:Transaction}
},
{defaultNavigationOptions:({navigation})=>({
  tabBarIcon:({})=>{
    const routeName=navigation.state.routeName
    if(routeName==="Transaction"){
      return(
        <Image source={require("./assets/book.png")} style={{marginLeft:200,width:50,height:50}}></Image>
      )
    }
    else if(routeName==="Search"){
      return(
        <Image source={require("./assets/searchingbook.png")} style={{marginLeft:200,width:50,height:50}}></Image>
      )
    }
  }
})
  })

const AppContainer= createAppContainer(Tabs)
