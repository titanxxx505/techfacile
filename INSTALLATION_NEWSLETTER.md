# Activer la newsletter TechFacile (gratuit avec Google Apps Script)

Le site est prêt côté interface, mais GitHub Pages ne peut pas envoyer d’e-mails tout seul. Le dossier `newsletter-backend` contient le petit service Google Apps Script qui enregistre les abonnés dans Google Sheets et envoie le lien de confirmation.

## 1. Créer la feuille Google Sheets

1. Créez une nouvelle feuille Google Sheets, par exemple **TechFacile - Newsletter**.
2. Copiez son identifiant dans l’adresse : dans `https://docs.google.com/spreadsheets/d/IDENTIFIANT/edit`, copiez uniquement `IDENTIFIANT`.

## 2. Créer le script

1. Dans la feuille : **Extensions > Apps Script**.
2. Supprimez le code proposé et collez le contenu de `newsletter-backend/Code.gs`.
3. Remplacez `COLLEZ_ICI_ID_DE_VOTRE_GOOGLE_SHEET` par l’identifiant de la feuille.
4. Enregistrez.

## 3. Déployer comme application Web

1. Dans Apps Script : **Déployer > Nouveau déploiement**.
2. Type : **Application Web**.
3. Exécuter en tant que : **Moi**.
4. Qui a accès : **Tout le monde** (le formulaire public doit pouvoir appeler le script).
5. Autorisez le script lorsqu’un écran Google le demande.
6. Copiez l’URL terminant par `/exec`.

## 4. Relier le site au script

1. Ouvrez `index.html` dans un éditeur de texte.
2. Recherchez :
   `const NEWSLETTER_ENDPOINT='COLLEZ_ICI_URL_WEB_APP_GOOGLE_APPS_SCRIPT';`
3. Remplacez la valeur par votre URL `/exec`. Exemple :
   `const NEWSLETTER_ENDPOINT='https://script.google.com/macros/s/XXXXXXXX/exec';`
4. Enregistrez puis remettez `index.html` sur GitHub et faites un commit.

## 5. Tester

1. Ouvrez votre site GitHub Pages.
2. Inscrivez une adresse e-mail que vous contrôlez et choisissez au moins un thème.
3. Vérifiez la réception du message **Confirmez votre inscription à TechFacile**.
4. Cliquez sur le lien. La ligne correspondante dans Google Sheets doit passer à `CONFIRMED`.

## Ce qui est enregistré

Adresse e-mail, thèmes sélectionnés, statut (PENDING / CONFIRMED / UNSUBSCRIBED), jeton, dates d’inscription/confirmation/désinscription.

## Envoyer une alerte pour un nouveau tutoriel

Le fichier `Code.gs` contient aussi `sendTutorialNotification()`. Modifiez les 4 constantes en début de fonction (thème, titre, URL, résumé), puis exécutez la fonction manuellement. Seuls les abonnés confirmés ayant sélectionné le thème reçoivent le message.

Google Apps Script applique des quotas d’envoi d’e-mails qui dépendent du type de compte Google. Pour un petit site personnel, cette solution permet de démarrer sans hébergement payant ; si la newsletter prend beaucoup d’ampleur, il sera préférable de migrer vers un service d’e-mailing dédié.

## 6. Activer l’envoi automatique selon les thèmes

Une fois le site publié et la newsletter testée :

1. Dans Apps Script, exécutez **une seule fois** la fonction `initTutorialMonitor()`. Elle mémorise les tutoriels déjà présents afin de ne pas envoyer les 32 anciens articles comme s’ils étaient nouveaux.
2. Ouvrez **Déclencheurs** (icône réveil dans Apps Script) > **Ajouter un déclencheur**.
3. Fonction à exécuter : `checkForNewTutorials`.
4. Source de l’événement : **Basé sur le temps**.
5. Choisissez par exemple **Minuteur quotidien**.

Le script lit alors `tutorials.json` sur le site. Lorsqu’un nouveau tutoriel apparaît, il envoie automatiquement un e-mail uniquement aux abonnés **CONFIRMED** qui ont sélectionné le thème correspondant.

Important : quand vous ajoutez plus tard un tutoriel au site, il faut également ajouter son entrée dans `tutorials.json`. Les versions de TechFacile que je génère le font automatiquement.
