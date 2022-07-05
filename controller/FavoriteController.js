import urlWebServices from './WebServices.js';

export const CreateFavourite = async (email, idReceta, nameReceta, image, createdAt) => {
    //url webservices
    let URL_API = urlWebServices.createFavourite;
    console.log("datos: ",email, idReceta, nameReceta, image, createdAt)
    let req = JSON.stringify({
        idReceta: idReceta,
        nameReceta: nameReceta,
        image: image,
        createdAt: createdAt
    })

    try {
        const response = await fetch('http://' + URL_API + '/' + email, {
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
                // Respuesta exitosa, favorito creado, retorna el usuario actualizado.
            case 200: {
                return ({ user:json.userUpdated, rdo:200, mensaje:"Favorito creado"});
            }
            case 400: {
                // (Bad Request)
                return ({ rdo:400, mensaje:"(Bad Request) Los datos enviados son incorrectos o hay datos obligatorios no enviados."});
            }
            case 404: {
                // (NotFound)
                return ({ rdo:404, mensaje:"(NotFound) No se encontró información"});
            }
            case 500: {
                // (Internal Server Error)
                return ({ rdo:500, mensaje:"(Internal Server Error) Error en servidor"});
            }
            default: {
                // Otro error
                return ({ rdo:1, mensaje:"Ha ocurrido un error"});                
            }
        }
    }
    catch (error) {
        console.log(error);
    };
}

export const DeleteFavourite = async (email, idReceta) => {
    //url webservices
    let URL_API = urlWebServices.deleteFavourite;

    let req = JSON.stringify({
        idReceta: idReceta,
    })
    
    try {
        const response = await fetch('http://' + URL_API + '/' + email, {
            method: 'DELETE',
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
                // Respuesta exitosa, favorito borrado, retorna el usuario actualizado.
            case 200: {
                return ({ user:json.userUpdated, rdo:200, mensaje:"Favorito borrado"});
            }
            case 400: {
                // (Bad Request)
                return ({ rdo:400, mensaje:"(Bad Request) Los datos enviados son incorrectos o hay datos obligatorios no enviados"});
            }
            case 404: {
                // (NotFound)
                return ({ rdo:404, mensaje:"(NotFound) No se encontró información"});
            }
            case 500: {
                // (Internal Server Error)
                return ({ rdo:500, mensaje:"(Internal Server Error) Error en servidor"});
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
