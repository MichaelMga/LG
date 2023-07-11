const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { OpenAIApi, Configuration } = require('openai');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//cover types

const defaultCover = "default";
const javaCover = "java";

let coverType = defaultCover;

const initialParagraph = 'PARAGRAPH_EXPLAINING_WHY_I_WANT_TO_JOIN_THIS_COMPANY';

const coverCreator = require("./template");

const javaCoverCreator = require("./templateJava");



const getCoverLetter = (company, paragraph) => {

return  `
 Bonjour,

 En tant que développeur Full Stack, j'assure le développement frontend et backend des différents projets menés par une entreprise dans le secteur musical.

 J'ai un intérêt pour l'algorithmie et je m'efforce d'appliquer au quotidien les concepts du livre Clean Code de Robert C. Martin, tout en restant persuadé qu'il y a toujours quelque chose de nouveau à apprendre.

 Ce qui m'attire dans l'idée de travailler à ${company} :
 ${paragraph}

 Dans mon quotidien, j'utilise des technologies telles que Javascript, Typescript, NestJS, PHP, SQL, Docker..., et je suis toujours ouvert à l'apprentissage de nouveaux langages et frameworks.

 Je serais ravi de discuter plus en détail de ma candidature lors d'un entretien.

 Je vous remercie d'avance pour l'attention que vous porterez à ma candidature.`;
}



const configuration = new Configuration({
  apiKey: "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"
});
const openai = new OpenAIApi(configuration);

const generateText = async (companyName, keywords) => {
  try {
    const prompt = `Voici un template de lettre de motivation pour être embauché en tant que développeur : ${getCoverLetter(companyName,initialParagraph)}.Remplace ${initialParagraph} avec un paragraphe expliquant que je veux rejoindre cette entreprise pour les raisons suivantes : ${keywords}. Ne fais pas simplement une énumération. Ex : je veux rejoindre cette entreprise parceque : a, b, c. Génère un paragraphe convaincant, qui montre que je suis très enthousiaste à l'idée de rejoindre cette entrpise, et qui exprime en meme temps le fait que je veux rejoindre l'entreprise poure les raisons citées. Retourne uniquement le nouveau paragraphe, pas la lettre entière. Please don't start with '.\n'. I noticed in your previous answer, you did. '`;

    const gpt4Response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.5,
      max_tokens: 200
    });


    const newParagraph = gpt4Response.data.choices[0].text.trim();

    return getCoverLetter(companyName, newParagraph);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const saveText = (text, companyName) => {
  const dirPath = path.join(__dirname, companyName);
  const filePath = path.join(dirPath, `cover_${companyName}.txt`);

  if (!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath);
  }

  fs.writeFile(filePath, text, err => {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    coverCreator(companyName);

    console.log(`Text successfully saved in ${filePath}`);
  });
};

const executeProgram = () => {
  rl.question(
    'select a cover type (2 for Java)' , (coverType) => {

        coverType = coverType === '2' ? javaCover : defaultCover;
     
      rl.question('Please, type a companyName: ', (name) => {
        rl.question('Please, type keywords, separated by commas: ', async (keywords) => {
          const generatedText = await generateText(name, keywords);
          console.log(`Generated Text:\n${generatedText}`);
          rl.question('Do you like this text? (c to cancel, r to retry, s to save): ', (answer) => {
            switch (answer.toLowerCase()) {
              case 'c':
                rl.close();
                break;
              case 'r':
                executeProgram();
                break;
              case 's':
                saveText(generatedText, name);
                rl.close();
                break;
              default:
                console.log('Invalid option, please try again.');
                executeProgram();
                break;
            }
          });
        });
      });

    }
  )

};

executeProgram();
