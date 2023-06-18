const { jsPDF } = require('jspdf');

const getResume = (company) => {

const doc = new jsPDF();

 const cvData = {
    objet: `Candidature poste de développeur ${company}`,
    nom: "Michael",
    adresse: "Manga",
    ville: "Stains",
    telephone: "0652298970",
    email: "michaelmga.dev@gmail.com",
    profil: "Passionné par l'informatique, je suis développeur web full stack en CDI depuis bientôt 2 ans, \nau sein de l'entreprise Bam Karaoké Box, à Paris.\nJe souhaite m'investir dans un nouveau projet sur la durée.\nSelon Bjarn Strousrup un développeur avancé doit maîtriser au moins 5 languages.\nJe serais donc ravi de découvrir Java!\nJ'ai un grand intérêt pour l'apprentissage continu, le partage des connaissances et la résolution de problèmes.\nMon profil Medium : https://michaelmanga.medium.com/ \nMa chaîne YouTube : https://www.youtube.com/@michaelmanga9874",
    competences: "ReactJS, TypeScript, Git, Github, NestJS, Postgresql, ForestAdmin, Docker, AWS(S3, CodeBuild, CodePipeline), Git, Github",
    langues: "Français : Natif\nAnglais : Courant",
    experience: "Développeur Web Full Stack | BAM | 2021 - Présent\n\n- Développement et maintenance de nos applications (ReactJS/Typescript/Redux en frontend, NestJs/Postgresql en backend).\n- Utilisation de ForestAdmin pour la gestion des interfaces administratives.\n- Utilisation de Docker (Docker-compose) pour la conteneurisation des différents environnement.\n- Utilisation de services AWS tels que S3, CodeBuild et CodePipeline pour nos déploiements.\n- Collaboration interne avec les autres développeurs, et les autres départements de l'entreprise.\n- Résolution de problèmes complexes de développement web et d'optimisation des performances.\n-J'ai également été amené à implémenter des fonctionnalités sur une application SwiftUI \n\nPrincipales réalisations :\n\nAu sein d'une équipe multidisciplinaire, j'étais l'un des deux développeurs en charge du développement complet d'une application cloud pour les établissements BAM. Projet a lancé mi-2022 et a aujourd'hui abouti avec succès. Les retours sont très positifs de la part de nos clients et des équipes opérationnels concernant l'experience utilisateur en général. Il y'a encore des ajustements, mais le taux d'erreur est faible et beaucoup de problèmes potentiels ont été anticipés en amont.",
    projets: "Eva\n\nDéveloppement de A à Z de Eva, une intelligence artificielle jouant aux échecs, en \"vanilla\" JS.\nConception et implémentation d'un algorithme AlphaBeta permettant à l'IA d'échecs d'anticiper, et d'évaluer efficacement les mouvements futurs, en élaguant les branches moins prometteuses de l'arbre de recherche du jeu.\nMise en œuvre de la technique de hachage pour optimiser la performance de l'algorithme en mémorisant les états précédemment explorés du jeu, ce qui a permis d'économiser un temps de calcul précieux en évitant les opérations inutiles.\nUtilisation d'algorithmes de tri pour classer efficacement les mouvements possibles et pour orienter l'IA vers les coups les plus prometteurs, réduisant ainsi la taille de l'arbre de recherche.\nCe projet a permis de mettre en œuvre une IA capable de rivaliser avec les joueurs d'échecs de niveau intermédiaire, tout en offrant une performance de calcul efficace et une expérience utilisateur fluide.\n\nGithub : https://github.com/MichaelMga/eva-chess-AI-\n\nMike Framework\n\nJ'ai développé mon framework PHP, inspiré de Symfony.\nGithub : https://github.com/MichaelMga/mikeFramework/tree/master",
    diplomes: "Baccalauréat Economique et social\nBachelor international Business Management | Kedge Business School",
    references: "Disponibles sur demande",
};

  const possiblyAddPage = () => {
    if (yPosition > 250) { // If the yPosition exceeds the limit of the page.
      doc.addPage();
      yPosition = 10; // Reset yPosition for the new page.
  }

}

doc.setFontSize(9); // Set font size


let yPosition = 10;
doc.setFont('helvetica', 'bold');
doc.text(`Objet: ${cvData.objet}`, 10, yPosition);
yPosition += 10;
possiblyAddPage()

doc.setFont('helvetica', 'normal');
doc.text(`Nom: ${cvData.nom}`, 10, yPosition);
yPosition += 10;
possiblyAddPage()
doc.text(`Adresse: ${cvData.adresse}`, 10, yPosition);
yPosition += 10;
possiblyAddPage()
doc.text(`Ville: ${cvData.ville}`, 10, yPosition);
yPosition += 10;
possiblyAddPage()
doc.text(`Téléphone: ${cvData.telephone}`, 10, yPosition);
yPosition += 10;
possiblyAddPage()
doc.text(`Email: ${cvData.email}`, 10, yPosition);
yPosition += 10;
possiblyAddPage()
doc.setFont('helvetica', 'bold');
doc.text('Profil professionnel:', 10, yPosition);
yPosition += 10;
possiblyAddPage()

doc.setFont('helvetica', 'normal');
const profilLines = doc.splitTextToSize(cvData.profil, 200);
doc.text(profilLines, 10, yPosition);
yPosition += profilLines.length * 5;
doc.setFont('helvetica', 'bold');
doc.text('Compétences Techniques:', 10, yPosition);
yPosition += 10;
possiblyAddPage()

doc.setFont('helvetica', 'normal');
doc.text(cvData.competences, 10, yPosition);
yPosition += 10;
possiblyAddPage()
doc.setFont('helvetica', 'bold');
doc.text('Langues:', 10, yPosition);
yPosition += 10;
possiblyAddPage()

doc.setFont('helvetica', 'normal');
doc.text(cvData.langues, 10, yPosition);
yPosition += 10;
possiblyAddPage()
doc.setFont('helvetica', 'bold');
yPosition += 5;
possiblyAddPage()

doc.text('Expérience Professionnelle:', 10, yPosition);
yPosition += 10;
possiblyAddPage()

doc.setFont('helvetica', 'normal');
const experienceLines = doc.splitTextToSize(cvData.experience, 180);
doc.text(experienceLines, 10, yPosition);
yPosition += experienceLines.length * 7;
doc.setFont('helvetica', 'bold');
yPosition += 10;
possiblyAddPage()

doc.text('Projets personnels:', 10, yPosition);
yPosition += 10;
possiblyAddPage()

doc.setFont('helvetica', 'normal');
const projetsLines = doc.splitTextToSize(cvData.projets, 180);
doc.text(projetsLines, 10, yPosition);
yPosition += projetsLines.length * 4.5;
doc.setFont('helvetica', 'bold');
doc.text('Diplômes:', 10, yPosition);
yPosition += 10;
possiblyAddPage()

doc.setFont('helvetica', 'normal');
doc.text(cvData.diplomes, 10, yPosition);
yPosition += 15;
possiblyAddPage()
doc.setFont('helvetica', 'bold');
doc.text('Références:', 10, yPosition);

doc.setFont('helvetica', 'normal');
yPosition += 10;
possiblyAddPage();
doc.text(cvData.references, 10, yPosition);

doc.save(`${company}/CV_Michael_Manga_${company}.pdf`);

}


module.exports = getResume;
