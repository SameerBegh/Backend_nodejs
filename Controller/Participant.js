import Tournament from "../DataBase/MongoDb/Schema/TournamentSchema.js";

// Add Participant
export const addParticipant = async (request, response) => {
  const { _id, name, email, mobile } = request.body;
  try {
    const existParticipant = await Tournament.findOne({
      _id: _id,
      "participants.name": name,
    });

    if (existParticipant) {
      return response.status(422).json({ error: "Participant Already Exist" });
    }

    const newParticipant = await Tournament.findByIdAndUpdate(
      { _id: _id },
      {
        $push: {
          participants: {
            name,
            email,
            mobile,
          },
        },
      },
      { returnDocument: "after" }
    );

    return response
      .status(201)
      .json({ newParticipant, message: "Joined Successfully" });
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
};

// Edit participant
export const editParticipant = async (request, response) => {
  const { _id, name, email, mobile, id } = request.body;
  try {
    const findTournament = await Tournament.findOneAndUpdate(
      { _id: _id, "participants._id": id },
      {
        $set: {
          "participants.$.name": name,
          "participants.$.email": email,
          "participants.$.mobile": mobile,
        },
      },
      {
        returnDocument: "after",
      }
    );
    return response
      .status(200)
      .json({ findTournament, message: "Update Successfully" });
  } catch (error) {
    return response.status(500).json(error);
  }
};

//   Delete Participant
export const deleteParticipant = async (request, response) => {
  const { _id, id } = request.body;
  try {
    const delete_Participant = await Tournament.findByIdAndUpdate(
      {
        _id: _id,
        "participants._id": id,
      },

      { $pull: { participants: { _id: { $in: [id] } } } },
      { returnDocument: "after" }
    );
    return response.status(200).json({
      delete_Participant,
      message: "Participant Deleted Successfully",
    });
  } catch (error) {
    return response.status(500).json(error.message);
  }
};
