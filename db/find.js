const { connectToDatabase } = require("./conctions");


const findAdmins = async function () {

    const { admins } = await connectToDatabase()

    const result = await admins.find();

    return result
};

const findPhones = async function () {

    const { numbers } = await connectToDatabase()

    const result = await numbers.find().toArray();

    return result
};

const findAllData = async function () {

    const { allData } = await connectToDatabase()

    const result = await allData.find().toArray();
    result[0].data.sort((a, b) => b.chat_show - a.chat_show);
    return result
};

const findAllWordsWithMinTimestamp = async function () {
    const { words } = await connectToDatabase();

    const result = await words
        .find()
        .sort({ 'data.time': 1 })
        .limit(1)
        .toArray();

    return result[0];
};

const findAllAngizeshiWithMinTimestamp = async function () {
    const { angizeshi } = await connectToDatabase();

    const result = await angizeshi
        .find()
        .sort({ 'data.time': 1 })
        .limit(1)
        .toArray();

    return result[0];
};

module.exports = {
    findAdmins: findAdmins,
    findPhones: findPhones,
    findAllData: findAllData,
    findAllWordsWithMinTimestamp: findAllWordsWithMinTimestamp,
    findAllAngizeshiWithMinTimestamp: findAllAngizeshiWithMinTimestamp
}