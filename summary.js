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

const summarize=async (article) => {
  console.log(article.length/4/1000)
  console.log(article.length/4/1000*0.002*7+'cny')
  await openaiCompletion(messages(`You are a financial analyst, please summarize this article without missing any numbers. Be sure not to omit any of the numbers mentioned in the article. The summary can be of any length.Article: ${article}`));
  
}

(async ()=>{
    await summarize(`

Fed Pause Wouldn’t Necessarily Refresh Stock Market - WSJStocks have historically rallied after the Federal Reserve has finished raising interest rates. Markets might not get the same boost this time around, some investors and analysts warn.Going back to 1982, the S&P 500 returned an average of 19% in the 12 months after the federal-funds rate peaked, according to a Goldman Sachs team led by chief U.S. equity strategist David Kostin. Goldman studied six Fed tightening cycles over that time period. Stocks rose after all but one of them.Yet Goldman is skeptical markets will rally again once the Fed is done with its current set of interest-rate increases. Many on Wall Street believe that the Fed might finish raising rates sometime this year.Earnings growth has faltered. S&P 500 companies are expected to report profits declining at the start of the year by the biggest amount since the second quarter of 2020. Stocks also look expensive relative to history. The S&P 500 trades at about 18 times its next 12 months of expected earnings. That ranks in the 81st percentile for valuations going back the past 40 years, according to Goldman. “There’s this great relief in the equity markets right now,” said Brad Conger, deputy chief investment officer at Hirtle Callaghan & Co. “I think that’s a mistake.”Mr. Conger said his firm has been focusing on investing in companies in industries such as healthcare, software and payment processing that look as though they’ll be able to continue increasing their profits, even if the U.S. economy cools significantly later this year, as he expects.“It’s hard to see a recession that doesn’t impact corporate earnings to a greater degree,” he said.So far, markets have appeared to shrug off the possibility of a downturn. The S&P 500 has risen 7.8% for the year, while the Dow Jones Industrial Average has gained 2.2% and the Nasdaq Composite has climbed 16%.This coming week, investors will get a look at earnings from companies including Bank of America Corp., Netflix Inc., and United Airlines Holdings Inc., as well as fresh data on existing home sales and manufacturing activity. A big part of the reason many investors have remained optimistic is the strength of the labor market. Jobs growth, which many feared would take a sharp hit when the Fed began raising interest rates last year, has instead stayed robust. U.S. employers added 236,000 workers in March, the smallest gain in more than two years but still above prepandemic levels, Labor Department data from earlier in the month showed. “We’re in this period of calm right now because there’s clearly no sign of recession just yet,” said Jeff Schulze, director and investment strategist at ClearBridge Investments.Inflation has also continued to pull back. Data the past week showed inflation in consumer goods and services rose at the slowest pace in nearly two years in March. Wholesale inflation also eased.Yet price pressures remain well above the Fed’s 2% target. That could push the Fed to keep raising rates and then holding them at high levels for longer than investors currently anticipate.Inflation is “still much too high and so my job is not done,” Fed governor Christopher Waller said in a speech Friday. The Fed needs to keep tightening monetary policy, he added.Elevated inflation is likely to weigh on earnings in the coming quarters, especially if consumers become less willing to pay higher prices for goods and services.Goldman expects earnings growth to be almost flat for S&P 500 companies for the full year. That would be well below the average 9% growth rate seen at the end of hiking cycles that weren’t accompanied by recessions, the bank said.“One of the things that’s propelling the market higher here is the strength of the economic data we’ve seen in the first quarter,” Mr. Schulze said. “But importantly, a lot of that data is lagging. It doesn’t tell us where we’re going to be in three to six months.”Some investors say that, with so much uncertainty around when the Fed will finish raising interest rates, when it will begin cutting them, and when or if a recession will materialize, it is best to focus on creating portfolios that can withstand a variety of outcomes.“I think investors often make mistakes by trying to overanalyze and overpredict market cycles…when they begin, when they end,” said Darrell Cronk, president of Wells Fargo Investment Institute. “Probably more important than predicting is positioning.”Write to Akane Otani at akane.otani@wsj.com



    `)
})()