const { Configuration, OpenAIApi } = require("openai");
const fs=require('fs')
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

const summarize=async (article) => {
  console.log(article.length/4/1000)
  console.log(article.length/4/1000*0.002*7+'cny')
  await openaiCompletion(messages(`This article is from Wall Street Journal. You are a financial analyst, please summarize this article without missing any numbers mentioned in the article. Be sure not to omit any of the numbers mentioned in the article. Never miss any numbers in the article. The summary can be very long.  Article: ${article}`));
  
}

(async ()=>{
    const content=fs.readFileSync('./2-1.md',{encoding:'utf8'})
    const contentJSON=JSON.parse(content)

    await summarize(`


        ${contentJSON.content}


    `)
})()