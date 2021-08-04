const connectToDatabase = async (moongose, urlConnection, options)=>{
    try{
        const connection = await moongose.createConnection(urlConnection, options);
    }catch (error){
        console.log("There was an error trying to connect to the database");
        console.log(error.message);
    }
}

module.exports = {
    getConnection : connectToDatabase
}