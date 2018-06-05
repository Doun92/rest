# R.E.S.T.

R.E.S.T. est l'acronyme de Réseau d'Entraide Sociale pour Tous. Notre projet a pour but de faciliter le lien entre une personne proposant un lit pour une nuitée et une personne sans abri, par l'intermédiaire d'un travailleur social sur le terrain.
Nous proposons une interface épurée et simple d'accès tant pour l'accueillant que pour le travailleur social.

## Description
La personne qui souhaite accueillir un sans-abri complète son adresse ou celle du logement proposé si différente. Il sélectionne ensuite les dates où le logement est disponible. Seuls les travailleurs sociaux peuvent consulter la liste des logements disponibles la journée courante.

Lorsqu'un travailleur social propose un lit à un sans-abri, il réserve le logement qui devient indisponible pour les autres travailleurs sociaux.

Le travailleur social contacte alors l'accueillant par téléphone. Après discussion, l'accueillant signale s'il accepte ou décline la réservation.

Un historique est disponible aussi bien pour l'accueillant que pour le travailleur social et un e-mail de confirmation aux deux parties.
![Impression d'écran de la page "Proposition de logement"](https://raw.githubusercontent.com/Doun92/rest/master/public/01_Proposition%20de%20logement.PNG)
![Impression d'écran de la page "Réservation de logement"](https://github.com/Doun92/rest/blob/master/public/02_R%C3%A9servation%20de%20logement.PNG)
![Impression d'écran de la page "Confirmation de réservation"](https://github.com/Doun92/rest/blob/master/public/03_Confirmation%20de%20r%C3%A9servation.PNG)

## Installation

Notre projet est développé sous l'environnement Meteor.js, un package particulier de javascript. Pour le télécharger, veuillez suivre les instructions présentes sur leur site Internet : (https://www.meteor.com/).

Lorsque vous aurez finalisé l'installation de Meteor sur votre machine, téléchargez les sources de notre projet.

Dans un terminal, accédez au dossier du projet et effectuer les commandes suivantes.

```
# pour installer les packages
meteor npm install

# pour démarrer le serveur Meteor
meteor
```

Dans votre navigateur, vous pouvez maintenant consulter le projet à l'adresse suivante : http://localhost:3000

### Packages utilisés

#### via NPM
- Bootstrap 4
- jQuery (dépendance de Bootstrap 4)

#### Atmosphere
- `kadira:flow-router`, `kadira:blaze-layout`, `arillo:flow-router-helpers` et `zimme:active-route`: pour un rendu en fonction de l'URL
- `kevohagan:sweetalert` et `matdutour:popup-confirm`: pour des fenêtres modales
- `fortawesome:fontawesome`: pour des icônes
- `gwendall:auth-client-callbacks`: utiliser pour tester l'authentification


## Version

Version beta 0.6

## Contributeurs

Les collaborateurs sont Aubrays (Loïc Aubrays), Doun (Daniel Escoval), MicTs01 (John Rose) et rerouj (Renato Diaz).

## Contexte de développement

Le projet R.E.S.T. est produit dans le cadre du cours Programmation pour Internet II, enseigné par le professeur Isaac Pante et le tuteur Loris Rimaz au sein de la [Section des Sciences du langage et de l'information](http://www.unil.ch/sli) de la Faculté des Lettres de l'Université de Lausanne.

## Licence

Sous licence UNIL.