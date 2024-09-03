const { connectToDatabase } = require("./conctions");


const insertAdmins = async function (id, rule) {

    const { admins } = await connectToDatabase()

    const result = await admins.findOne({ id: id });
    if (!result) {
        let adminInfo = {
            id: id,
            rule: rule
        };
        await admins.insertOne(adminInfo);
        return true
    } else {
        return false
    }
};

const insertNumber = async function (phone) {
    try {
        const { numbers } = await connectToDatabase()
        const result = await numbers.findOne({ phone: phone });
        if (!result) {
            let phones = {
                phone: phone,
            };
            await numbers.insertOne(phones);
            return true
        } else {
            return false
        }
    } catch (error) {
        console.log(error + '');
    }
};

const insertAllData = async function (data) {

    const { allData } = await connectToDatabase();

    const existingData = await allData.findOne({});

    if (!existingData) {
        await allData.insertOne({ data: data });
        return true;
    } else {
        await allData.updateOne({}, { $set: { data: data } });
        return false;
    }
};

const insertTheWordsOfElders = async function (data) {
    const { words } = await connectToDatabase()

    const checkHasWords = await words.findOne({ "data.wordsRandom": data.wordsRandom })

    if (checkHasWords) {
        console.log('has words ------------------------------');
    } else {
        console.log('has not words +++++++++++++++++++++++++++++++++');
        await words.insertOne({ data: data });
    }

}

module.exports = {
    insertAdmins,
    insertNumber,
    insertAllData,
    insertTheWordsOfElders
}