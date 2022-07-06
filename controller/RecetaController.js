import urlWebServices from './WebServices.js';

export const GetRecetas = async () => {
    //url webservices
    let URL_API = urlWebServices.getRecetas;
    

    try {
        const response = await fetch('http://' + URL_API + '/', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });

        let rdo = response.status;

        let data = await response.json();

        switch(rdo) {
            case 200: {

                return ({data,rdo:0, mensaje:"Ok"}); // Correcto
               
                
            }
            case 400: {
                // Usuario invalido
                return ({rdo:1, mensaje:"(Bad Request) Los datos enviados son incorrectos o hay datos obligatorios no enviados."});
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

export const GetRecetaPorId = async (idReceta) => {
    //url webservices
    let URL_API = urlWebServices.getRecetaPorId;
    

    try {
        const response = await fetch('http://' + URL_API + '/'+idReceta, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });

        let rdo = response.status;

        let data = await response.json();

        switch(rdo) {
            case 200: {

                return ({data,rdo:200, mensaje:"Ok"}); // Correcto
               
                
            }
            case 400: {
                // Usuario invalido
                return ({rdo:400, mensaje:"(Bad Request) Los datos enviados son incorrectos o hay datos obligatorios no enviados."});
            }
            
            case 404: {
                // Usuario invalido
                return ({rdo:404, mensaje:"(NotFound) No se encontró información"});
            }
            case 500: {
                // Usuario invalido
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


export const CreateReceta = async (idUsuario,nombreUsuario, nombreReceta, descripcion, imagen, cantidadPersonas, duracion, dificultad, tipo, pasos, ingredientes) => {
    //url webservices
    let URL_API = urlWebServices.createReceta;
    
    let req = JSON.stringify({
        idUsuario: idUsuario,
        nombreUsuario: nombreUsuario,
        nombreReceta: nombreReceta,
        descripcion: descripcion,
        imagen: imagen,
        cantidadPersonas: cantidadPersonas,
        duracion: duracion,
        dificultad: dificultad,
        tipo: tipo,
        validada: false,
        reseñas: [],
        puntuacion: 0,
        pasos: pasos
            
        ,
        ingredientes: 
            ingredientes
        
    })

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
        
        switch(rdo) {
            case 200: {
                return ({ json, rdo:200, mensaje:"receta creada"});
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
export const ReplaceReceta = async (idReceta,idUsuario,nombreUsuario, nombreReceta, descripcion, imagen, cantidadPersonas, duracion, dificultad, tipo, pasos, ingredientes) => {
    //url webservices
    let URL_API = urlWebServices.replaceReceta;
    
    let req = JSON.stringify({
        idUsuario: idUsuario,
        nombreUsuario: nombreUsuario,
        nombreReceta: nombreReceta,
        descripcion: descripcion,
        imagen: imagen,
        cantidadPersonas: cantidadPersonas,
        duracion: duracion,
        dificultad: dificultad,
        tipo: tipo,
        validada: false,
        reseñas: [],
        puntuacion: 0,
        pasos: pasos,
        ingredientes: ingredientes
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
        
        switch(rdo) {
            case 200: {
                return ({ json, rdo:200, mensaje:"receta creada"});
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

export const UpdateReceta = async (idReceta,idUsuario,nombreUsuario, nombreReceta, descripcion, imagen, cantidadPersonas, duracion, dificultad, tipo, pasos, ingredientes) => {
    //url webservices
    let URL_API = urlWebServices.updateReceta;
    
    let req = JSON.stringify({
        idUsuario: idUsuario,
        nombreUsuario: nombreUsuario,
        nombreReceta: nombreReceta,
        descripcion: descripcion,
        imagen: imagen,
        cantidadPersonas: cantidadPersonas,
        duracion: duracion,
        dificultad: dificultad,
        tipo: tipo,
        validada: false,
        reseñas: [],
        puntuacion: 0,
        pasos: pasos,
        ingredientes: ingredientes
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
        
        switch(rdo) {
            case 200: {
                return ({ json, rdo:200, mensaje:"receta actualizada"});
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