const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const history = [];

const constructHistory = (user_input, completion_text) => {
  history.push([user_input, completion_text]);

  console.log(history);
};

const openaiCompletion = async ({messages,user_input}) => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: messages,
  });

  const completion_text = completion.data.choices[0].message.content;
  console.log(completion_text);

  constructHistory(user_input, completion_text);
};

const messages = (user_input) => {
  const messages = [];
  for (const [input_text, completion_text] of history) {
    messages.push({ role: "user", content: input_text });
    messages.push({ role: "assistant", content: completion_text });
  }

  messages.push({ role: "user", content: user_input });

  console.log(messages);

  return { messages, user_input };
};

(async () => {
  await openaiCompletion(messages("what is gpt"));
  await openaiCompletion(messages("what is gpt-3"));
  await openaiCompletion(messages("what is the mechanism of gpt-3"));
})();
