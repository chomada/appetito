import urlWebServices from './WebServices.js';

export const CreateReview = async (idReceta, calificacion) => {
    //url webservices
    let URL_API = urlWebServices.createReview;
    console.log("adentro controller")
    let req = JSON.stringify({
        calificacion: calificacion
    })

    try {
        const response = await fetch('http://' + URL_API + '/' + idReceta, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: req
        });

        const json = await response.json();
        let rdo = response.status;
        console.log("rdo: ",rdo);
        
        switch(rdo) {
            case 200: {
                return ({ json, rdo:200, mensaje:"reseña creada"});
            }
            case 400: {
                // (Bad Request)
                return ({ rdo: 400, mensaje:"(Bad Request) Los datos enviados son incorrectos o hay datos obligatorios no enviados."});
            }
            case 404: {
                // ( NotFound )
                return ({ rdo:404, mensaje:"(NotFound) No se encontró información"});
            }
            case 500: {
                // (Internal Server Error)
                return ({rdo:500, mensaje:"(Internal Server Error) Error en servidor"});
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