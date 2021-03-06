const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    firstName: { type: String },
    lastName: { type: String },
    mode: { type: String, default: "light" },
    chats: [{ type: Schema.Types.ObjectId, ref: "Chat" }],
    rooms: [{ type: Schema.Types.ObjectId, ref: "Room" }],
  },
  { timestamps: true }
);

exports.User = model("User", UserSchema);
