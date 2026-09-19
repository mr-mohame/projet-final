# SAS Progress Console - Gestion des Apprenants
c'est une application console simple devloppee avec node.js pour gerer et suivre la progression des apprenants.

---

## c'est quoi ce projet 
ce projet permet de :
- ajouter et enregister les informations des apprenent (ID, Nom, Ville).
- calculer le pourcentage de progression de chaque apprenant.
- classer les apprenants selon leur niveau (*Solide*, *En progression*, *À renforcer*) .
- chercher, et filtrer et trier le liste par niveau et par order alphabetique.

--

## structure des donnees
chaque apprenant est stocke sous form d'objet:
```javascript
{
    id: 2,
    nomComplet: "Yassine Code", 
    ville: "Oujda", 
    resultats: [
            { jour: 1, exercicesTermines: 12,
                totalExercices: 20, challengeTermine: false }
    ]
}
```


## les fonctionnalites disponibles
1. *tableau de bord* : affiche le nombre total, la moyenne de la promo et la repartition par niveau.
2. *liste des apprenant* : affiche tous les apprenants enrigistres.
3. *Ajouter un apprenant* : Pour ajouter un nouveau membre avec son nom et sa ville.
4. *Consulter par ID* : Affiche toutes les informations dun seul apprenant.
5. *Modifier les résultats* : Pour mettre à jour les validations quotidiennes.
6. *Recherche par nom* : Pour trouver un apprenant par son nom.
7. *Filtrer par niveau* : Pour afficher seulement un groupe (ex: Solide).
8. *Tri par progression* : Tri avec lalgorithme Bubble Sort (du plus grand au plus petit).
9. *Tri alphabétique* : Tri A-Z avec Bubble Sort selon le nom.
0. *Quiter* : quiter le programme .

---

## comment lancer le projet 
1. ouvrir le terminal dans le dossier de projet 
2. executer la commande: 
```bash
node main.js 
```

---

##  Technologies utilisées
- *Langage* : JavaScript (Node.js).
- *Environnement* : VS Code / Terminal.
- *Gestionnaire de version* : Git & GitHub.

---

##  Auteur
- *Nom & Prénom* : Mohamed Lamssiah
- *Formation* : SAS / YouCode / 2026



