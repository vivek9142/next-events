import { connectDatabase,getAllDocuments,insertDocument } from "../../../helpers/db-util";

export default async function handler(req, res) {
  const eventId = req.query.eventid;
  let client;
  try{
    client = await connectDatabase();
  }catch(err){
    res.status(500).json({message: 'Connection to the Database Failed!'});
     eturn;
  }

  if (req.method === "POST") {
    // add server side validation
    const { email, name, text } = req.body;

    if (
      !email.includes("@") ||
      !name ||
      !name.trim() === "" ||
      !text ||
      !text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid Input." });
      client.close();
      return;
    }
    console.log(eventId);
    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    let result;
    try{
      result = await insertDocument(client,'comments',newComment);

      newComment.id = result.insertedId;

      res.status(201).json({ message: "Added Comment.", comment: newComment });
    }catch(error){
      console.log(error);
      res.status(500).json({message: 'Inserting Data Failed! '});
      return;
    }
    
  }

  if (req.method === "GET") {
    let documents;
    try{
      documents = await getAllDocuments(client,'comments',{ _id: -1 },{ eventId: eventId });
    }catch(error){
      res.status(500).json({message: 'Getting Data Failed!'});
      return;
  }

    res.status(200).json({ comments: documents });
  }

  client.close();
}
