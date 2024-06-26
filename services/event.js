import Event from "../models/event.js";

const createEvent = async (eventData) => {
  try {
    const newEvent = new Event(eventData);
    await newEvent.save();
    return { success: true };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

const listEvents = async () => {
  try {
    const events = await Event.find();
    return events;
  } catch (err) {
    return { message: err.message };
  }
};

const fetchEvent = async (_id) => {
  try {
    const event = await Event.findById(_id);
    return event;
  } catch (err) {
    return { message: err.message };
  }
};

const updateEvent = async (_id, eventData) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(_id, eventData, {
      new: true,
    });
    return updatedEvent;
  } catch (err) {
    return { message: err.message };
  }
};

const removeEvent = async (_id) => {
  try {
    const removedEvent = await Event.findByIdAndDelete(_id);
    return {success: true};
  } catch (err) {
    return { success: false, message: err.message };
  }
}

export { createEvent, listEvents, fetchEvent, updateEvent, removeEvent };
