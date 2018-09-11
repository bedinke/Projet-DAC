# DAC Project

##Authors:
-Kévin BEDIN
-Quentin DUCASSE
-Steve Carlson KASSE MIKUI
-Guillaume LE BOUCHER
-Luc LONGIN

##Mise en place Github
Obtenir une copie du projet sur votre compte github : ==fork==
Créer une copie locale du projet git sur votre ordinateur :
[[[language=bash
$ git clone https://github.com/NomDeCompte/Projet-DAC
]]]

Dès que vous modifiez un élément de votre dossier git, une ==working copy== est créée. Pour mettre à jour votre copie locale :
Ajout à la pile de ==commit== 
[[[language=bash
$ git add nomDuFichier
]]]
Puis commit pour modifier les fichiers locaux :
[[[language=bash
$ git commit -m 'Message du commit'
]]]
La modification n'opère que sur votre copie locale, ni le dossier github de votre compte ni celui du compte d'où provient le ==fork== a été modifié.

Pour modifier votre copie virtuelle :
[[[language=bash
$ git push
]]]

Maintenant, pour mettre à jour votre copie virtuelle et locale en cas de modification du dossier initial (celui que vous avez ==fork==) il faut utiliser un ==remote==. Le ==remote== est un pointeur vers un le dossier git voulu :
Mise en place du ==remote== appelé ==upstream== par :
[[[language=bash
$ git remote add upstream https://github.com/bedinke/Projet-DAC
]]]
Mise à jour de votre dossier local et virtuel :
[[[language=bash
$ git fetch upstream
$ git checkout master
$ git merge upstream/master
]]]