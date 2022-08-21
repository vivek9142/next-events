import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  const eventId = req.query.eventid;

  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.gnmor.mongodb.net/${rpocess.env.DB}?retryWrites=true&w=majority`
  );

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
      return;
    }
    console.log(eventId);
    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    const db = client.db();
    const result = await db.collection("comments").insertOne(newComment);

    console.log(result);

    newComment.id = result.insertedId;

    res.status(201).json({ message: "Added Comment.", comment: newComment });
  }

  if (req.method === "GET") {
    const db = client.db();
    const documents = await db
      .collection("comments")
      .find({ eventId: eventId })
      .sort({ _id: -1 })
      .toArray();

    res.status(200).json({ comments: documents });
  }

  client.close();
}
