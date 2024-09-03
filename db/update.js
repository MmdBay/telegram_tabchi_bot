const { connectToDatabase } = require("./conctions");
const { ObjectId } = require('mongodb');


const updateTheWords = async function (id) {
    const { words } = await connectToDatabase();
    const objectId = new ObjectId(id);
    const newTimestamp = new Date().getTime();
    const result = await words.updateOne(
        { _id: objectId },
        {
            $set: {
                'data.time': newTimestamp,
            },
        }
    );
    return result;
};

const updateTheAngizeshi = async function (id) {
    const { angizeshi } = await connectToDatabase();
    const objectId = new ObjectId(id);
    const newTimestamp = new Date().getTime();
    const result = await angizeshi.updateOne(
        { _id: objectId },
        {
            $set: {
                'data.time': newTimestamp,
            },
        }
    );
    return result;
};


module.exports = {
    updateTheWords: updateTheWords,
    updateTheAngizeshi: updateTheAngizeshi
}