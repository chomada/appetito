import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    flex: 1,
    alignItems: "center"
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ead5b4',
    textAlign: 'center'

  },
  
  modalParent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    height: 500,
    width: 320,
    backgroundColor: 'black',
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20
  },
  btn: {
    padding: 10,
    margin: 'auto',
    marginBottom:20,
    marginTop:20,
    backgroundColor: 'white',
    borderRadius: 15,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold'
  },
  btnPlaceHolder: {
    padding: 10,
    margin: 'auto',
    marginTop:20,
    backgroundColor: 'white',
    borderRadius: 15,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  btnMenu: {
    padding: 2,
    margin: 'auto',
    backgroundColor: 'white',
    borderRadius: 10,
    color: 'black',
    fontWeight: 'bold',
    margin:2,
    textAlign:'center'
  },
  btnPlaceHolderBuscar: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    marginLeft:8,
    marginRight:8
    
  },
  textRecordar:{
    fontSize:10,
    textAlign:'center',
    alignSelf:'center'
  },
  checkbox: {
    alignSelf: "center",
  },
  checkboxContainer: {
    margin:'auto',
    marginTop:10,
    flexDirection: "row",
    marginBottom: 20,
    textAlign:'center'
  },

   
  close: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'right',
    width: 250,
    color:'white'

  },
  
  textBlack: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  textBlackTitle: {
    color: 'black',
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize:40,
    marginRight:150,
    marginTop:100
  },
  menuTitle: {
    color: 'black',
    textAlign: 'justify',
    fontWeight: 'bold',
    fontSize:30,
    marginRight:125,
  },
  menuDesplegable:{
    marginLeft:125,



  }

});

export const colors = {
  darkBlue: '#006d77'
}