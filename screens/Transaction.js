import * as React from 'react';
import {TouchableOpacity, StyleSheet, Text, View, TextInput, Image} from 'react-native';
import {BarCodeScanner} from "expo-barcode-scanner"
import * as Permissions from "expo-permissions"

export default class Transaction extends React.Component  {
  constructor(){
    super()
    this.state={
      hasCameraPermissions:null,
      scanned:false,
      scannedBook:"",
      scannedStudent:"",
      buttonState:"normal"
    }
  }

  getCameraPermissions=async(id)=>{
    const {status}=await Permissions.askAsync(Permissions.CAMERA)
    this.setState({
      hasCameraPermissions:status==="granted",
      buttonState:id,
      scanned:false
    })
  }

  handleBarCodeScanner=async({type,data})=>{
    const {buttonState}=this.state

    if (buttonState==="bookId"){
      this.setState({scanned:"true", scannedBook:data, buttonState:"normal"})
    }
    else if (buttonState==="studentId"){
      this.setState({scanned:"true", scannedStudent:data, buttonState:"normal"})
    }
  }

  render(){
    const hasCameraPermissions=this.state.hasCameraPermissions
    const buttonState=this.state.buttonState
    const scanned=this.state.scanned

    if (buttonState!="normal"&&hasCameraPermissions===true){
      return(
      <BarCodeScanner onBarCodeScanned={
        scanned ? undefined:this.handleBarCodeScanner
      } style={StyleSheet.absoluteFillObject}>

      </BarCodeScanner>)
    }
    else if(buttonState=="normal"){
      return (
        <View style={styles.container}>
          <View>
        <Image 
        source={require("../assets/booklogo.jpg")} 
        style={{width:200,height:200}}></Image>
        <Text>Transaction screen</Text>
          </View>
          
          <View style={styles.inputView}>
          <TextInput placeholder="book id" style={styles.inputText} value={this.state.scannedBook}></TextInput>
    
          <TouchableOpacity style={styles.scanButton} onPress={()=>this.getCameraPermissions("bookId")}>
          <Text style={styles.scanText}>Scan</Text>
          </TouchableOpacity>
          </View>

          <View style={styles.inputView}>
          <TextInput placeholder="student id" style={styles.inputText} value={this.state.scannedStudent}></TextInput>
    
        <TouchableOpacity style={styles.scanButton} onPress={()=>this.getCameraPermissions("studentId")}>
        <Text style={styles.scanText}>Scan</Text>
        </TouchableOpacity>
        </View>
          
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  scanButton:{
    backgroundColor:"#15f76b",
    height:50
  },

  scanText:{
    padding:10,
    fontSize:16,
    textDecorationLine: "underline",
    fontWeight: "300"
  },

  inputView:{
    flexDirection:'row',
    margin:20,
  },
  inputText:{
    width:200,
    height:50,
    fontSize:20,
    borderWidth:2,
    marginRight:20
  }
});