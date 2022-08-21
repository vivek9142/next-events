import {connectDatabase,insertDocument} from '../../helpers/db-util';

export default async function Handler(req,res){
    if(req.method === 'POST'){
        const userEmail = req.body.email;

        if(!userEmail || !userEmail.includes('@')){
            res.status(422).json({message: 'Invalid email address.'})
            return;
        }

        let client;

        try{
            client = await connectDatabase();
        }catch(error){
            res.status(500).json({message: 'Connection to the Database Failed!'});
            return;
        }

        try{
            await insertDocument(client,'newsletters',{email: userEmail});
            client.close();
        }catch(error){
            res.status(500).json({message: ' Inserting Data Failed!'});
            return;
        }
        

        

        console.log(userEmail);
        res.status(201).json({message: 'Signed Up Successfuly!'})
    }
}