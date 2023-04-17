```


const { Configuration, OpenAIApi } = require("openai");
const readlineSync = require("readline-sync");
require("dotenv").config();

(async () => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const history = [];

  while (true) {
    const user_input = readlineSync.question("Your input: ");

    const messages = [];
    for (const [input_text, completion_text] of history) {
      messages.push({ role: "user", content: input_text });
      messages.push({ role: "assistant", content: completion_text });
    }

    messages.push({ role: "user", content: user_input });

    try {
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: messages,
      });

      const completion_text = completion.data.choices[0].message.content;
      console.log(completion_text);

      history.push([user_input, completion_text]);

      const user_input_again = readlineSync.question(
        "\nWould you like to continue the conversation? (Y/N)"
      );
      if (user_input_again.toUpperCase() === "N") {
        return;
      } else if (user_input_again.toUpperCase() !== "Y") {
        console.log("Invalid input. Please enter 'Y' or 'N'.");
        return;
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        console.log(error.message);
      }
    }
  }
})();


```




```


[
  { role: 'user', content: 'what is gpt' },
  {
    role: 'assistant',
    content: 'GPT (Generative Pre-trained Transformer) is a type of deep learning model that is used for generating human-like natural language texts. It was introduced by OpenAI in 2018 as a language model that can generate text based on a given input prompt. GPT uses a transformer architecture that can learn the context of the text and generate coherent and relevant text content. It has been widely used for tasks such as language translation, text summarization, chatbot development, and more. The latest version of GPT is GPT-3, which has gained significant attention due to its ability to generate high-quality human-like text.'
  },
  { role: 'user', content: 'what is gpt-3' },
  {
    role: 'assistant',
    content: 'GPT-3 (Generative Pre-trained Transformer 3) is the latest and most advanced version of the GPT series of language models developed by OpenAI. It is a deep learning language model that uses neural network architectures to generate text that closely resembles natural human language. GPT-3 has been trained on an enormous amount of data (45 terabytes of text taken from the internet) and has over 175 billion parameters. \n' +
      '\n' +
      'GPT-3 can perform a wide range of natural language processing (NLP) tasks including language translation, question answering, text summarization, and more. It can also be used to build chatbots and conversational agents. It has received significant attention and praise for its ability to generate high-quality and coherent text that is almost indistinguishable from text written by a human.'
  },
  { role: 'user', content: 'what can gpt3 do' },
  {
    role: 'assistant',
    content: 'GPT-3 (Generative Pre-trained Transformer 3) is a state-of-the-art deep learning language model that can perform many natural language processing (NLP) tasks. Here are some things that GPT-3 can do:\n' +
      '\n' +
      '1. Language Translation: GPT-3 can translate text from one language to another, with high accuracy and naturalness.\n' +
      '\n' +
      '2. Answering Questions: GPT-3 can answer a wide range of questions accurately, even ones that require inference or reasoning.\n' +
      '\n' +
      '3. Writing: GPT-3 can write articles, essays, and even pieces of fiction that are indistinguishable from ones written by human authors.\n' +
      '\n' +
      '4. Chatbot Development: GPT-3 can be used to develop chatbots and virtual assistants that can understand natural language and respond to user queries in real-time.\n' +
      '\n' +
      '5. Text Summarization: GPT-3 can summarize a long piece of text into a shorter, more readable one.\n' +
      '\n' +
      '6. Coding: GPT-3 can generate source code based on natural language instructions, making it possible to create software applications without any coding.\n' +
      '\n' +
      "7. Personalization: By training on a specific user's data, GPT-3 can generate text that is personalized to that person's writing style and preferences.\n" +
      '\n' +
      "Overall, GPT-3's immense skill set is continually expanding, and its potential to revolutionize the field of natural language processing is immense."
  },
  {
    role: 'user',
    content: 'exlain the mechanism of gpt3 to a high school students'
  },
  {
    role: 'assistant',
    content: 'Sure, I can explain the mechanism of GPT-3 to a high school student. \n' +
      '\n' +
      'GPT-3 (Generative Pre-trained Transformer 3) is a type of computer program or algorithm that processes natural language. In other words, it can understand human language and produce text that is similar to what a human would write or say. \n' +
      '\n' +
      "First, GPT-3 is trained on a large dataset of text, such as books and websites, using a process called deep learning. GPT-3's training data is then used to create a model composed of many connected parts called neural networks.\n" +
      '\n' +
      'The neural networks are made up of small units called neurons that work together to process information. Each neuron takes in data and performs a calculation, and then it sends the result to other neurons. The neural networks in GPT-3 are designed to learn the structure and patterns of language by processing the training data.\n' +
      '\n' +
      'Once GPT-3 has been trained, it can be used to generate new text based on a given input prompt. For example, if you ask GPT-3 to write a story about a dog and a cat, it will use its neural networks to generate sentences and paragraphs about a dog and a cat interacting. GPT-3 does this by using a process called natural language generation, where it applies its understanding of grammar, syntax, and vocabulary to create coherent and meaningful text.\n' +
      '\n' +
      'Overall, GPT-3 is a highly sophisticated program that uses deep learning, neural networks, and natural language generation to understand and produce human-like text.'
  },
  { role: 'user', content: 'stop' }
]



```