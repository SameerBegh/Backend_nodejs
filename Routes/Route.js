import express from "express";
import {
  addTournament,
  deleteTournament,
  editTournament,
  getTournament,
  viewTournament,
} from "../Controller/Tournament.js";
import {
  addParticipant,
  deleteParticipant,
  editParticipant,
} from "../Controller/Participant.js";

const router = express.Router();

// Post API
router.post("/Create", addTournament);
router.post("/participant", addParticipant);

// Get API
router.get("/Tournaments", getTournament);
router.get("/Tournament/:id", viewTournament);

// Edit/Update API
router.put("/update_Tournament", editTournament);
router.put("/update_Participant", editParticipant);
router.put("/delete_Participant", deleteParticipant);

// Delete API
router.delete("/deleteTournament/:id", deleteTournament);

export default router;
