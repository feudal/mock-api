import mongoose from "mongoose";

const connection = {
  isConnected: 0,
};

async function connect() {
  mongoose.set("strictQuery", true);

  if (connection.isConnected) {
    console.log("Already connected");
    return;
  }
  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log("use previous connection");
      return;
    }
    await mongoose.disconnect();
  }
  const db = await mongoose.connect(process.env.MONGODB_URI || "");
  console.log("new connection");
  connection.isConnected = db.connections[0].readyState;
}

async function disconnect() {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === "production") {
      await mongoose.disconnect();
      connection.isConnected = 0;
    } else {
      console.log("not disconnected");
    }
  }
}

function convertDocToObj(doc: {
  _id: { toString: () => any };
  createdAt: { toString: () => any };
  updatedAt: { toString: () => any };
}) {
  doc._id = doc._id.toString();
  doc.createdAt = doc.createdAt.toString();
  doc.updatedAt = doc.updatedAt.toString();
  return doc;
}

export const db = { connect, disconnect, convertDocToObj };
