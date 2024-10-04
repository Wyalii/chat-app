export const searchContacts = async (request,response,next) => {
    try {
     const {searchTerm} = request.body

     if(searchTerm === undefined || searchTerm === null){
        return response.status(400).send("search term is required.")
     }

     const sanitizedSearchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")
     return response.status(200).send("Logout successfull.")
       
    } catch (error) {
       console.log(error)
       return response.status(500).send("Internal server Error")
    }
 }
 