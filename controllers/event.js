import {
  createEvent,
  fetchEvent,
  listEvents,
  updateEvent,
  removeEvent,
} from "../services/event.js";

const store = async (req, res) => {
  const { name, startDate, endDate, location } = req.body;
  const thumbnail = req.file ? req.file.filename : null;

  const eventData = { name, startDate, endDate, location, thumbnail };
  try {
    const result = await createEvent(eventData);
    if (result.success) {
      return res.status(201).json({ message: "Event creation successful" });
    } else {
      return res.status(500).json({ message: "Event creation failed" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const index = async (req, res) => {
  try {
    const result = await listEvents();
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const fetch = async (req, res) => {
  const { _id } = req.params;
  try {
    const result = await fetchEvent(_id);
    if (!result) {
      return res.status(404).json({ message: "Event not found" });
    }
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const update = async (req, res) => {
  const { _id } = req.params;
  const { name, startDate, endDate, location, status } = req.body;
  const thumbnail = req.file ? req.file.filename : undefined;

  const eventData = { name, startDate, endDate, location, status };

  if (thumbnail) {
    eventData.thumbnail = thumbnail;
  }

  try {
    const result = await updateEvent(_id, eventData);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const remove = async (req, res) => {
  const { _id } = req.params;
  try {
    const result = await removeEvent(_id);
    if (result.success) {
      return res.status(200).json({ message: "Event deletion successful" });
    } else {
      return res.status(500).json({ message: "Event deletion failed" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { store, index, fetch, update, remove };
