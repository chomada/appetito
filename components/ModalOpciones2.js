import React, { useState } from 'react'
import { Modal, StyleSheet, Text , TouchableOpacity, View } from 'react-native';

import Global from '../styles/Global';




const ModalOpciones2 = ({modalVisible,setModalVisible,titulo,texto1,texto2,funcion1,funcion2}) => {

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
              <TouchableOpacity style={[styles.btnModal, Global.shadows]} onPress={funcion2}


              ><Text style={Global.textBlack}>{texto2}</Text>

              </TouchableOpacity>


            </View>

          </View>
        </View>
      </Modal>

   
  )
}

export default ModalOpciones2;

const styles = StyleSheet.create({
    btnModal: {
        margin: 5,
        width: 110,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 15,
        textAlign: 'center',
        color: 'black',
        fontWeight: 'bold'
    
      },
})