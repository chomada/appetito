const URL_API = "app-appetito.herokuapp.com";


const urlWebServices = {
	
	// Users	
    login: URL_API + "/api/users/login",
    createUser: URL_API + "/api/users/create",
    updateUser: URL_API + "/api/users/update",
    createRecipeInUser: URL_API + "/api/users/nuevaReceta",

    // Favorite
    createFavourite: URL_API+"/api/users/favorito",
    deleteFavourite: URL_API+"/api/users/favorito",

    //Recetas
    getRecetas:URL_API + "/api/recetas",
    porNombre:URL_API+"/api/recetas/porNombre",
    porTipo:URL_API+"/api/recetas/porTipo",
    porNoIngrediente:URL_API+"/api/recetas/porNoIngrediente",
    porIngrediente:URL_API+"/api/recetas/porIngrediente",
    porUsuario:URL_API+"/api/recetas/porUsuario",
    recover:URL_API+"/api/users/recover/",
    getRecetaPorId:URL_API + "/api/recetas",
    createReceta:URL_API + "/api/recetas",
    replaceReceta: URL_API + "/api/recetas/replace",
    updateReceta: URL_API + "/api/recetas",
}

export default urlWebServices;