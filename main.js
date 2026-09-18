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
    if(!nom) return "";
    return nom.trim().toLowerCase();

}

// fonction pour valide le reseaultat 
function validerResultat(jour, exercicesTermines, totalExercices){
    if(jour<1 || jour>7){
        return false
    }
    if(exercicesTermines<0 || totalExercices<=0){
        return false
    }
    if(exercicesTermines>totalExercices){
        return false
    }
    return true
} 
  
// fonction ajouter un apprenant 
function ajouterapprenants(id, nom, ville){
    id = parseInt(prompt("Entre l'id :"));
    let existeID= true;
    while(existeID || isNaN(id)){
        existeID = false;
        for(let i=0; i<apprenants.length; i++){
            if(apprenants[i].id===id){
                existeID =true;
                break;
            }
        }
        if(existeID || isNaN(id)){
            id = parseInt(prompt("erreur : id existe deja , enter un nouveau id :  "));
        }
    }
     
    nom = prompt("Entre le nom complet :");
    ville = prompt("Entre la ville :");

    let nouvelApprenant ={
        id: id,
        nomComplet: normaliserNom(nom),
        ville:normaliserNom(ville) ,
        resultats:[]
    }
    apprenants.push(nouvelApprenant);
    console.log("apprenant ajoute avec succes.");
    return nouvelApprenant
    

}

//function pour enregistrer les resultat

function enregistrerResultat(id, jour, exercicesTermines, totalExercices, challengeTermine){
    // verification d'id
    let apprenantTrouve;
    for(let i=0; i<apprenants.length; i++){
        if(apprenants[i].id === parseInt(id)){
            apprenantTrouve = apprenants[i]
            break;
        }
    }
    if(!apprenantTrouve){
        console.log("apprenant non Trouve");
        return
    }
    // verification de jour
    let verifieJour= validerResultat(jour, exercicesTermines, totalExercices);
    if(!verifieJour){
        console.log("les donne sont valide");
        return
        
    }
    let resultatJour = null;
    for(let i=0; i<apprenantTrouve.resultats.length; i++){
        if(apprenantTrouve.resultats[i].jour == jour){
            resultatJour=apprenantTrouve.resultats[i];
            break;

        }
    }
    if(resultatJour!==null){
       resultatJour.exercicesTermines = exercicesTermines;
       resultatJour.totalExercices= totalExercices
       resultatJour.challengeTermine = challengeTermine;
       console.log("mise a jour avec succes ")
    }else{
        apprenantTrouve.resultats.push({
            jour : jour,
            exercicesTermines : exercicesTermines,
            totalExercices : totalExercices,
            challengeTermine: challengeTermine
        })
        console.log("jour ajoute");
    }
}

 // function pour calcule la pourcentage de chaque apprenant.
function calculerProgression(apprenant){
    let totalExercices =0;
    let totalProposes = 0;
    let joursRs= apprenant.resultats.length;

    for(let i=0; i<joursRs; i++){
        let res = apprenant.resultats[i];
        totalExercices += res.exercicesTermines
        totalProposes += res.totalExercices;
        //if(res.challengeTermine){challengecount ++;}
    }
    
    if(totalExercices===0){
        return {pourcentage: 0, statut: "Insuffisant"};
    }
    let pourcentage= (totalExercices / totalProposes)*100;
    pourcentage=Number(pourcentage.toFixed(2))

    let statut ="";
    if(pourcentage>=80){
        statut ="Excellent";
    }else if(pourcentage>=50 && pourcentage<80){
        statut ="Moyen";
    }else if(pourcentage<50){
        statut ="Insuffisant";
    }
    return{
        pourcentage : pourcentage,
        statut : statut

    }
}
// function pour rechrche un apprenant par id or par nom 
function rechercherApprenant(recherche){
    let apprenantRecherche= null;
    for(let i=0; i<apprenants.length; i++){
        if(apprenants[i].id===parseInt(recherche) || apprenants[i].nomComplet.includes(normaliserNom(recherche))){
            apprenantRecherche = apprenants[i]
            break;
        }
    }
    if(apprenantRecherche === null){
        console.log("appreant non trouve.")
        return;
    }
    console.log(`ID : ${apprenantRecherche.id}`);
    console.log(`nomComplet : ${apprenantRecherche.nomComplet}`);
    console.log(`Ville : ${apprenantRecherche.ville}`);

    if(apprenantRecherche.resultats.length == 0){
        console.log("aucun resultat enregistre");
    }else{
        for(let i=0; i<apprenantRecherche.resultats.length; i++){
            let rech = apprenantRecherche.resultats[i];
            console.log(`jour : ${rech.jour} : ${rech.exercicesTermines} : ${rech.totalExercices} exercices`)
        }
    }
    let prog = calculerProgression(apprenantRecherche);
    console.log(`Pourcentage: ${prog.pourcentage}%`);
    console.log(`statut : ${prog.statut}`);
}
// fonction pour filter les apprenant par niveau
function filtrerParNiveau(niveauRecherche){
    let niveauNom = normaliserNom(niveauRecherche);
    let trouve = 0;
    for(let i=0; i<apprenants.length; i++){
        let appreant = apprenants[i];
        let statut = calculerProgression|(appreant);
        if(normaliserNom(statut.statut)=== niveauNom){
            console.log(`id: ${appreant.id} | nom: ${appreant.nomComplet} | villa: ${appreant.ville} || progression: ${statut.pourcentage}% | statut: ${statut.statut}`);
            trouve++;
        }
    }
    if(trouve===0){
        console.log("aucun apprenant trouve pour ce niveau");
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
            for(let i=0; i<apprenants.length; i++){
                console.log(`${apprenants[i].id}. ${apprenants[i].nomComplet}. ${apprenants[i].ville}`)
            }
            break;
        case 3:
            console.log("- Ajouter un apprenant");
            ajouterapprenants();
            break;
        case 4:
            console.log("- Consulter un apprenant");
            break
        case 5:
            console.log("- Ajouter ou modifier un résultat");
            let idRes = parseInt(prompt("enter l'id de l'apprenant: "));
            let jour = parseInt(prompt("enter le jour enter 1 et 7 :"));
            let exTermines = parseInt(prompt("enter le nomber d'exercices termine: "));
            let exTotal = parseInt(prompt("enter le nomber total d'exercices :"));
            let challenge = prompt("le challenge est termine ? (oui/non) : ");
            let challengeTermine=(normaliserNom(challenge)==="oui");
            enregistrerResultat(idRes, jour, exTermines,exTotal,challengeTermine);
            break;
        case 6:
            console.log("- Rechercher un apprenant");
            let recherche =prompt("enter l'id ou nom: ");
            rechercherApprenant(recherche);
            break
        case 7:
            console.log("- Filtrer par niveau");
            let niveau=prompt("enter le niveau (exellent/ satisfaisant/insuffisant): ");
            filtrerParNiveau(niveau);
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


    
        


