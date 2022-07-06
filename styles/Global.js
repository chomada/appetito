import { StyleSheet } from 'react-native';

export default StyleSheet.create({
 
  shadows:{
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity:0.45,
    shadowRadius:1
  },
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
  container2: {
    flex: 1,
    backgroundColor: '#ead5b4'
   

  },
  errores:{
    color:'red',
    textAlign:'center'

  }
  ,
  modalParent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalGrid:{
    flexDirection: "row",
  },
  modalContainer: {
    height: 200,
    width: 250,
    
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor:'orange',
   
    
    textAlign: 'center',
    justifyContent: 'space-around',

    alignItems: 'center'
  },
  btn: {
   
    padding: 10,
    margin: 'auto',
    marginBottom:20,
    marginTop:5,
    backgroundColor: 'white',
    borderRadius: 15,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold'
    
  },
  btn2: {
   
    padding: 10,
    margin: 'auto',
    marginBottom:10,
    marginTop:10,
    backgroundColor: '#ead5b4',
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
  textBlack3: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize:18,

  },
  textOpacity:{
    opacity:0.2,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold'
  }
,
  textBlack2: {
    color: 'black',
    textAlign: 'center'
  },
  textBlackTitle: {
    width:300,
    color: 'black',
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize:40,
    margin:0,
    marginBottom:20
  },
  recetaTitle: {
    color: 'black',
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize:40,
    margin:5,
    width:'75%'
  },
  recetaTitleChico:{
    color: 'black',
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize:20,
    margin:5,
    width:'75%'

  },
  titlePersonalizar:{

    color: 'black',
    textAlign: 'right',
    fontWeight: 'bold',
    fontSize:20

  },
  btnPersonalizar:{
    marginTop:10,
    marginBottom:5,
    marginRight:5,
    marginLeft:215,
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 15
  },
  like:{
    margin:10,
    marginLeft:30
  },
  menuTitle: {
    color: 'black',
    textAlign: 'justify',
    fontWeight: 'bold',
    fontSize:30,
    marginRight:20,
  },
  picker: {
    // marginVertical: 30,
    // width: 300,
    // padding: 10,
    // borderWidth: 1,
    // borderColor: "#fff",
    // color:"#000"

    
    margin: 'auto',
    marginTop:20,
    backgroundColor: 'white',
    
    textAlign: 'center',
    fontWeight: 'bold'
  },
  menuDesplegable:{
    marginLeft:140,

  }
  

});

export const colors = {
  darkBlue: '#006d77'
}