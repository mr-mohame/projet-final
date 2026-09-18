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

function enregistrerResultat(id, jour, exercicesTermines, totalExercices){
    // verification d'id
    let apprenantTrouve;
    for(let i=0; i<apprenants.length; i++){
        if(apprenants[i].id === id){
            apprenantTrouve = apprenants[i]
            break;
        }
    }
    if(apprenantTrouve==null){
        console.log("apprenant non Trouve");
        return
    }
    // verification de jour
    let verifieJour= validerResultat(jour, exercicesTermines, totalExercices);
    if(!verifieJour){
        console.log("les donne sont valide");
        return
        
    }
    let reseaultatJour = null;
    for(let i=0; i<apprenantTrouve.resultats.length; i++){
        if(apprenantTrouve.resultats[i].jour==jour){
            reseaultatJour=apprenantTrouve.resultats[i];
            break;

        }
    }
    if(reseaultatJour!==null){
       reseaultatJour.exercicesTermines = exercicesTermines;
       reseaultatJour.totalExercices= totalExercices
       resultatJour.challengeTermine = challengeTermine;
       console.log("mise a jour avec succes ")
    }else{
        apprenants.resultats.push({
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
    let totalProposes = 0
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
        statu ="Excellent";
    }else if(pourcentage>=50 && pourcentage<80){
        statu ="Moyen";
    }else if(pourcentage<50){
        statu ="Insuffisant";
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
        if(apprenants[i].id===recherche || apprenants[i].nomComplet=== normaliserNom(recherche)){
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
            ajouterapprenants();
            break
        case 4:
            console.log("- Consulter un apprenant");
            break
        case 5:
            console.log("- Ajouter ou modifier un résultat");
            break
        case 6:
            console.log("- Rechercher un apprenant");
            
            console.log(rechercherApprenant())
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


    
        


