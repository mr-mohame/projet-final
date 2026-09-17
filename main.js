const prompt = require('prompt-sync')();
// Les données de départ
const apprenants = [
{ id: 1,
  nomComplet: "Sara Dev",
  ville: "Nador",
resultats: [
{ jour: 1, exercicesTermines: 18,
totalExercices: 20, challengeTermine: true },
{ jour: 2, exercicesTermines: 14,
totalExercices: 20, challengeTermine: false }
]
},
{
id: 2,
nomComplet: "Yassine Code",
ville: "Oujda",
resultats: [
{ jour: 1, exercicesTermines: 12,
totalExercices: 20, challengeTermine: false }
]
}
];
// fonction pour normaliser le nom 
function normaliserNom(nom){
    nom = nom.toLowerCase();
    nom =nom.trim(); 
    return nom;

}

// fonction pour valide le reseaultat 
function validerResultat(jour, exercicesTermines, totalExercices){
    let jour = parseInt(prompt("enter saisir le jour  (1-7): "));
    let totalExercices = parseInt(prompt("enter le total d'exercices: "));
    let exercicesTermines = parseInt(prompt("enter combien d'exercices terminés: "));
    
    while(jour<1 || jour>7 || isNaN(jour)){
        jour = parseInt(prompt("Erreur : enter saisir le jour  (1-7): "));
        
    }
    while(exercicesTermines<0 || exercicesTermines> totalExercices || isNaN(exercicesTermines)){
    totalExercices = parseInt(prompt("Erreur : enter le total d'exercices: "));
    }
    return {
        resultats: [
            { jour: jour, 
            exercicesTermines: exercicesTermines,
            totalExercices: totalExercices
            }
        ]

    };
}    

// fonction ajouter 
function ajouterapprenants(id, nom, ville){
    id = parseInt(prompt("Entre l'id :"));
    nom = prompt("Entre le nom complet :");
    ville = prompt("Entre la ville :");

    return{
        id ,
        nomComplet: normaliserNom(nom),
        ville:normaliserNom(ville) ,
        resultats:[]
    }


}
 


// function pour affiche le menu 
let choix;
console.log("=== SAS PROGRESS CONSOLE ===");
console.log("1. Afficher le tableau de bord");
console.log("2. Afficher la liste des apprenants");
console.log("3. Ajouter un apprenant");
console.log("4. Consulter un apprenant par identifiant");
console.log("5. Ajouter ou modifier le résultat d'une journée");
console.log("6. Rechercher un apprenant par nom");
console.log("7. Filtrer les apprenants par niveau");
console.log("8. Trier les apprenants par progression décroissante");
console.log("9. Trier les apprenants par ordre alphabétique");
console.log("0. Quitter");   
do{
    choix = Number(prompt("entre le choix :"));
    switch(choix){
        case 1:
            console.log("- le tableau de bord");
            break;
        case 2:
            console.log("- Liste des apprenants");
            break
        case 3:
            console.log("- Ajouter un apprenant");
            console.log(ajouterapprenants());
            break
        case 4:
            console.log("- Consulter un apprenant");
            break
        case 5:
            console.log("- Ajouter ou modifier un résultat");
            break
        case 6:
            console.log("- Rechercher un apprenant");
            break
        case 7:
            console.log("- Filtrer par niveau");
            break
        case 8:
            console.log("- Trier par progression");
            break
        case 9:
            console.log("- Trier par ordre alphabétique");
            break
        case 0:
            console.log("- Quiter");
            break
        default:
            console.log("- le choix invalide");
            break                                        
    }
}while(choix!==0)


    
        


