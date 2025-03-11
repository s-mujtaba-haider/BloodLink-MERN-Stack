const express = require("express");
const { createRequest, getRequests, updateRequest, deleteRequest } = require("../controllers/requestController");
const { protect, authorize } = require("../config/authMiddleware");

const router = express.Router();

// Only recipients can create a blood request
router.post("/", protect, authorize("recipient"), createRequest);

// Admins and recipients can view requests
router.get("/", protect, authorize("admin", "recipient"), getRequests);

// Only recipients can update or delete their requests
router.put("/:id", protect, authorize("recipient"), updateRequest);
router.delete("/:id", protect, authorize("recipient"), deleteRequest);

module.exports = router;
