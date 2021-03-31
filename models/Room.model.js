const { Schema, model } = require("mongoose");

const RoomSchema = new Schema(
  {
    roomName: { type: String, require: true },
    roomAuthor: { type: Schema.Types.ObjectId, ref: "User", require: true },
    roomUsers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

exports.Room = model("Room", RoomSchema);
