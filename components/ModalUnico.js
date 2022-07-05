import React, { useState } from 'react'
import { Modal, StyleSheet, Text , TouchableOpacity, View } from 'react-native';

import Global from '../styles/Global';




const ModalUnico = ({modalVisible,setModalVisible,titulo,texto1,funcion1}) => {

  return (

    <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false)
        }}
      >
        <View style={Global.modalParent}>

          <View style={[Global.modalContainer,Global.shadows]}>
            <Text style={Global.textBlack}>{titulo}</Text>
            <View style={Global.modalGrid}>

              <TouchableOpacity style={[styles.btnModal, Global.shadows]} onPress={funcion1}


              ><Text style={Global.textBlack}>{texto1}</Text>

              </TouchableOpacity>
              


            </View>

          </View>
        </View>
      </Modal>

   
  )
}

export default ModalUnico;

const styles = StyleSheet.create({
    btnModal: {
        margin: 5,
        width: 100,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 15,
        textAlign: 'center',
        color: 'black',
        fontWeight: 'bold'
    
      },
})