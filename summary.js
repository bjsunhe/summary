const { Configuration, OpenAIApi } = require("openai");
const fs=require('fs');
const { Console } = require("console");
require("dotenv").config();

const history = [];

const constructHistory = (user_input, completion_text) => {
  history.push([user_input, completion_text]);

  console.log(history);
};

const openaiCompletion = async ({messages,user_input},filename) => {
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
  console.log(completion_text.length)
  fs.writeFileSync(`${filename.split('.')[0]}-summary.md`,completion_text)

  constructHistory(user_input, completion_text);
};

const messages = (user_input) => {
  const messages = [{"role": "system", "content": "You are a professional financial analyst. I will give you articles one by one. Summarize each article without omitting any numbers mentioned in the article. Be sure not to omit any of the numbers mentioned in the article. Never miss any numbers in the article. You should integrate all the numbers appeared in the article to the summary. The summary can be very long. The length of the summary should be at least 30% of the original article. The length of the summary or the completion on your side should not be less than 30% of the original article. "}];
  for (const [input_text, completion_text] of history) {
    messages.push({ role: "user", content: input_text });
    messages.push({ role: "assistant", content: completion_text });
  }

  messages.push({ role: "user", content: user_input });

  console.log(messages);
  
  return { messages, user_input };
};

const summarize=async (article,filename) => {
  console.log(article.length)
  console.log(article.length/4/1000)
  console.log(article.length/4/1000*0.002*7+'cny')
  if(article.length/4/1000>4){
    console.log('too large')
    return 
  }
  await openaiCompletion(messages(`Summarize this article: "{article}"  ${article}`),filename);
  
}

const articleSummarize=async (file,filename)=>{
    const content=fs.readFileSync(file,{encoding:'utf8'})
    // const contentJSON=JSON.parse(content)
    // ${contentJSON.content}

    await summarize(`


        
        ${content}


    `,filename)



}


const summarizeAllData = (dirname)=>{
  let filenames=fs.readdirSync(dirname);


  filenames.forEach(async function(filename,index) {
    (function (filename,index){
        setTimeout(()=>{
          articleSummarize(dirname+filename,filename)
          console.log(filename)
        },index*5000)
      }
    )(filename,index)
    
    
    
  });
}

summarizeAllData('./data-source/')



