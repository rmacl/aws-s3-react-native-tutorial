import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  TouchableHighlight,
  Image,
  Modal,
  Text
} from 'react-native';

import { defaultStyles } from './style/common';

const { width, height } = Dimensions.get('window');


export default React.memo(function PopupPhoto(props) {
  
        const { photoUri, fileName } = props;
        console.log('photoUri', photoUri, '      props      ', props);
        return (
        <View> 
          <Modal 
            animationType="slide"
            transparent={true}
            visible={true}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
            <TouchableHighlight style = {styles.backdrop} onPress = {props.onClose}>
              <Text> This text is the target to be highlighted </Text>
            </TouchableHighlight>
            <View style = {styles.modal}>
                <View style = {styles.imageContainer}>
                  <Text style ={styles.textContainer}>{fileName} : {photoUri || 'Failed to upload image, please try it again'}</Text>
                  <Image source={{ uri: photoUri || 'https://catasy.cafe24.com/dummy/dummycat2.jpg' }} style={styles.image} />
                </View>
            </View>
          </Modal>
        </View>)
    });
  
  



const styles = StyleSheet.create({
    // Main container
    container: {
      ...StyleSheet.absoluteFillObject,   // fill up all screen
               // align popup at the bottom
      backgroundColor: 'transparent',     // transparent background
    },
    // Semi-transparent background below popup
    backdrop: {
      ...StyleSheet.absoluteFillObject,   // fill up all screen
  
      backgroundColor: 'black',
      opacity: 0.5,
    },
    // Popup
    modal: {
      height: height / 2,
      width : '100%',
      bottom: 0,        
      position: 'absolute',         // take half of screen height
      backgroundColor: 'white',
    },
    imageContainer: {
      flex: 2,
      flexDirection: 'column',    
      justifyContent: 'center',
      alignItems: 'stretch',                    
    },
    textContainer : {
      height : 23,
      ...defaultStyles.text,
      color: '#BBBBBB',
      fontSize: 15,
      lineHeight: 17,
      marginTop: 4,
    },
    image: {
      borderRadius: 10,                 // rounded corners
      height : (height / 2) - 25,
    //  ...StyleSheet.absoluteFillObject, // fill up all space in a container
    },
  });