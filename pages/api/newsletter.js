import {MongoClient} from 'mongodb';

export default async function Handler(req,res){
    if(req.method === 'POST'){
        const userEmail = req.body.email;

        if(!userEmail || !userEmail.includes('@')){
            res.status(422).json({message: 'Invalid email address.'})
            return;
        }

        const client = await MongoClient.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.gnmor.mongodb.net/${rpocess.env.DB}?retryWrites=true&w=majority`);
        const db = client.db();

        await db.collection('newsletters').insertOne({email: userEmail});

        client.close();

        console.log(userEmail);
        res.status(201).json({message: 'Signed Up Successfuly!'})
    }
}