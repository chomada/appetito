import urlWebServices from './WebServices.js';


export const Login = async (userMail, pass) => {
    //url webservices
    let URL_API = urlWebServices.login;
   // console.log(userMail, pass);
    let req;
if(userMail.includes('@')){
     req = JSON.stringify({
        
        email: userMail,
        password: pass,
         
    })

}else{
     req = JSON.stringify({
        
        alias: userMail,
        password: pass,
        
    })

}
    

    try {
        const response = await fetch('http://' + URL_API, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: req
        });

        const json = await response.json();
        let rdo = response.status;
        //console.log(rdo);

        switch(rdo) {
            case 200: {
                if(json.user.enabled) {

                    return ({user: json, rdo:0, mensaje:"Ok"}); // Correcto    
                } else {
                    return ({user: json, rdo:2, mensaje:"Ok"}); // Correcto
                }
            }
            case 400: {
                // Usuario invalido
                return ({rdo:1, mensaje:"(Bad Request) Los datos enviados son incorrectos o hay datos obligatorios no enviados"});
            }
            case 401: {
                // Usuario invalido
                return ({rdo:1, mensaje:"(Unauthorized) No hay autorización para llamar al servicio"});
            }
            case 404: {
                // Usuario invalido
                return ({rdo:1, mensaje:"(NotFound) No se encontró información"});
            }
            case 500: {
                // Usuario invalido
                return ({rdo:1, mensaje:"(Internal Server Error) Error en servidor"});
            }
            default: {
                // Otro error
                return ({rdo:1, mensaje:"Ha ocurrido un error"});                
            }
        }
    }
    catch (error) {
        console.log(error);
    };
}