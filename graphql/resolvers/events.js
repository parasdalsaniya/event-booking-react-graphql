const Event = require('../../models/event');
const User = require('../../models/user');
const { transformEvent } = require('./merge');


const user = async userId => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      _id: user.id,
      createdEvents: events.bind(this, user._doc.createdEvents),
    };
  } catch (err) {
    throw err;
  }
}


module.exports = {
  
  events: async () => {
     try {
      const events = await Event.find();
      return events.map(event => {
        return transformEvent(event);
      });
    } catch (err) {
      throw err;
    }  
  },

  createEvent: async args => {
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: new Date(args.eventInput.date),
      creator: '61cad884acae866798f13523'
    });
    let createdEvent;
    try {
      const result = await event.save() 
      createdEvent = transformEvent(event);
      const creator = await User.findById('61cad884acae866798f13523');
    
      if(!creator) {
        throw new Error('User not found');
      }
      creator.createdEvents.push(event);
      await creator.save();
    
      return createdEvent
    } catch(err) {
      throw err;
    }
  },

};