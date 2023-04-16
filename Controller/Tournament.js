import Tournament from "../DataBase/MongoDb/Schema/TournamentSchema.js";

// Create Tournament
export const addTournament = async (request, response) => {
  const { name, startDate, endDate, status } = request.body;

  try {
    const Exist_Tournament = await Tournament.findOne({
      name: name,
    });

    if (Exist_Tournament) {
      return response.status(422).json({ error: "Tournament Already Exist" });
    }

    const newTournament = new Tournament({ name, startDate, endDate, status });
    await newTournament.save();

    return response
      .status(201)
      .json({ newTournament, message: "Tournament Created Successfully" });
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
};

// Get all Tournaments Data
export const getTournament = async (request, response) => {
  try {
    const get_tournament = await Tournament.find({});
    return response.status(200).json(get_tournament);
  } catch (error) {
    return response.status(500).json(error.message);
  }
};

// Edit Tournament
export const editTournament = async (request, response) => {
  const { name, startDate, endDate, status, _id } = request.body;
  try {
    const findTournament = await Tournament.findByIdAndUpdate(
      { _id: _id },
      {
        $set: {
          name,
          startDate,
          endDate,
          status,
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

// View Tournament
export const viewTournament = async (request, response) => {
  const id = request.params.id;
  try {
    const get_View = await Tournament.findById({ _id: id });
    return response.status(201).json(get_View);
  } catch (error) {
    response.status(500).json(error.message);
  }
};

// Delete Tournament
export const deleteTournament = async (request, response) => {
  const id = request.params.id;
  try {
    const delete_Tournament = await Tournament.findByIdAndDelete({ _id: id });
    return response
      .status(200)
      .json({ delete_Tournament, message: "Tournament Deleted Successfully" });
  } catch (error) {
    return response.status(500).json(error.message);
  }
};
