import urlWebServices from './WebServices.js';

export const CreateUser = async (email,alias) => {
    //url webservices
    let URL_API = urlWebServices.createUser;
    let req = JSON.stringify({
        email:email,
        alias:alias
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
                if(json.alias){
                    return ({alias:json.alias,rdo:0, mensaje:"ya existe"}); // Correcto
                }else if(json.email){
                    
                    return ({rdo:0, mensaje:"recuperar contraseña"}); // Correcto
                }else if(json.email==false){
                    
                    return ({rdo:0, mensaje:"no se puede usar ese email"}); // Correcto
                }else{
                    return ({user:json.user,rdo:0, mensaje:"se ha creado satisfactoriamente"}); // Correcto
                }
                
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

export const UpdateUser = async (alias, name, password, gender, birth,image) => {
    //url webservices
    let URL_API = urlWebServices.updateUser;

    let req = JSON.stringify({

        name: name,
        password: password,
        gender: gender,
        birth: birth,
        enabled: true,
        image:image

    })
    
    try {
        const response = await fetch('http://' + URL_API + '/' + alias, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },

            body: req
        });

        let rdo = response.status;

        switch(rdo) {
            case 200: {
                return ({rdo:0, mensaje:"(Created) Usuario actualizado"}); // Correcto
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

export const RecoverUser = async (email,password,codigo) => {
    //url webservices
    let URL_API = urlWebServices.recover;
    let req = JSON.stringify({
        password:password,
        recoveryCode:codigo
    })

    try {
        const response = await fetch('http://' + URL_API+email, {
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
               
                    return ({user:json.user,rdo:200, mensaje:"Ok"}); // Correcto 
            }
            case 400: {
                
                return ({rdo:400, mensaje:"(Bad Request) Código inválido."});
            }
            
            case 403: {
                
                return ({rdo:403, mensaje:"(Warning) Registro incompleto o usuario no es invitado"});
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

export const CreateRecipeInUser = async (email, idReceta, nameReceta, image, createdAt) => {
    //url webservices
    let URL_API = urlWebServices.createRecipeInUser;

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

        switch(rdo) {
            case 200: {
                return ({data:json,rdo:200, mensaje:"(Created) Usuario actualizado"}); // Correcto
            }
            case 400: {
                // Usuario invalido
                return ({rdo:400, mensaje:"(Bad Request) Los datos enviados son incorrectos o hay datos obligatorios no enviados"});
            }
         
            case 404: {
                // Usuario invalido
                return ({rdo:404, mensaje:"(NotFound) No se encontró información"});
            }
            case 500: {
                // Usuario invalido
                return ({rdo:400, mensaje:"(Internal Server Error) Error en servidor"});
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