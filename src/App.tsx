/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { Component } from 'react';
import { View, Button, ImagePickerIOS, StyleSheet, 
  TouchableOpacity, TextInput } from 'react-native';

import PopupPhoto from './popupPhoto';
import uploadPhoto from './uploadPhoto';


export default class App extends Component {

    constructor(props){
      super(props);
      this.state = { photoSource : '', photoUploadedUri : '', modalOpen : false, textInput : 'test.jpg' };
    }


    openModal = () => {
      this.setState({ modalOpen: true });
    }
  
    closeModal = () => {
      this.setState({ modalOpen: false });
    }

    handleImageSelect = (data) => {
      return uploadPhoto(data, this.state.textInput)
        .then((url) => this.setState({photoUploadedUri : url}))
        .then(() => this.openModal());
    }
  

    imagePickerLoad = () => {
      ImagePickerIOS.openSelectDialog(
        {showImages:true,showVideos:false,},
        this.handleImageSelect,
        () => {console.log('User canceled the action');});
    }

  render(){
    
    return(

      <TouchableOpacity style={styles.container} onPress= {this.openModal} >
          {this.state.modalOpen && (
              <PopupPhoto photoUri = {this.state.photoUploadedUri} fileName = {this.state.textInput} onClose={this.closeModal}/>
          )}
          <View style={styles.buttonContainer}>
               <TextInput style={styles.textInput} onChangeText={(textInput) => this.setState({textInput})}
                value={this.state.textInput}>
               </TextInput>
               <Button title = "UPLOAD PHOTO TO S3"  color="#8C92AC" onPress = {this.imagePickerLoad}> </Button>
          </View>
      </TouchableOpacity>
      );
  
}
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20
  },
  buttonContainer : {
    marginTop : 130,
    alignItems : 'center',
  },
  textInput : {
    height: 40, 
    width : 180,
    borderColor: '#8C92AC', 
    borderWidth: 1,
    fontSize: 16,
    lineHeight: 20,
    color : '#8C92AC',
    marginBottom : 20,
  }
});