const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: '', // This is the default and can be omitted
});

exports.gen = async (prompt) => {
    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'gpt-3.5-turbo',
    });

    return chatCompletion.choices[0].message.content
}