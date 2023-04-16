import mongoose from "mongoose";

const tournamentSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  participants: [
    {
      name: {
        type: String,
      },
      email: {
        type: String,
      },
      mobile: {
        type: Number,
      },
    },
  ],
  status: {
    type: String,
    enum: ["Pending", "Active", "Completed"],
    default: "Pending",
  },
});

const Tournament = mongoose.model("tournament", tournamentSchema);
export default Tournament;
