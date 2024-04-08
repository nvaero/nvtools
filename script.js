function calculate() {
    var windSpeed = parseFloat(document.getElementById('windSpeed').value);
    var windDirection = parseFloat(document.getElementById('windDirection').value);
    var planeSpeed = parseFloat(document.getElementById('planeSpeed').value);
    var planeRoute = parseFloat(document.getElementById('planeRoute').value);

    // Calcul de la dérive
    var drift = windSpeed * Math.sin(degreesToRadians(windDirection - planeRoute));

    // Calcul du nouveau cap
    var newHeading = planeRoute + radiansToDegrees(Math.asin(drift / planeSpeed));

    // Affichage du résultat
    document.getElementById('result').innerHTML = "Dérive à prendre : " + drift.toFixed(2) + " noeuds<br>Nouveau cap à prendre : " + newHeading.toFixed(2) + " degrés";
}

function degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
}

function radiansToDegrees(radians) {
    return radians * 180 / Math.PI;
}








function calculate2() {
    var consommation = parseFloat(document.getElementById('consommation').value);
    var tempsRoulage = parseFloat(document.getElementById('tempsRoulage').value);
    var tempsDelestage = parseFloat(document.getElementById('tempsDelestage').value);
    var tempsIntegration = parseFloat(document.getElementById('tempsIntegration').value);
    var tempsDegagement = parseFloat(document.getElementById('tempsDegagement').value);
    var tempsMarge = parseFloat(document.getElementById('tempsMarge').value);
    var tempsCdb = parseFloat(document.getElementById('tempsCdb').value);
    

    // Ajoutez ici la logique pour ajouter les minutes en fonction du type de vol sélectionné
    var minutesSupplementaires = 0;
    var boutonVolLocal = document.querySelector('input[name="typeVol"][value="local"]');
    var boutonNavigationJour = document.querySelector('input[name="typeVol"][value="jour"]');
    var boutonNavigationNuit = document.querySelector('input[name="typeVol"][value="nuit"]');

    if (boutonVolLocal.checked) {
        minutesSupplementaires = 10;
    } else if (boutonNavigationJour.checked) {
        minutesSupplementaires = 30;
    } else if (boutonNavigationNuit.checked) {
        minutesSupplementaires = 45;
    }

    // Calcul du temps total en minutes
    var tempsTotal = tempsRoulage+ tempsDelestage + tempsIntegration + tempsDegagement + tempsMarge + tempsCdb;
    tempsTotal += minutesSupplementaires;
    // Ajoutez ici les autres temps

    // Conversion du temps total en heures
    var tempsTotalHeures = tempsTotal / 60;

    // Calcul du carburant nécessaire
    var carburantNecessaire = tempsTotalHeures * consommation;

    // Affichage des résultats
    document.getElementById('result').innerHTML = "Temps carburant : " + tempsTotalHeures.toFixed(2) + " heures<br>Nombre de litres minimum à emmener : " + carburantNecessaire.toFixed(2) + " litres";
    var popup = document.getElementById('popup');
    var resultDiv = document.getElementById('result');
    resultDiv.innerHTML = "Temps carburant : " + tempsTotalHeures.toFixed(2) + " heures<br>Nombre de litres minimum à emmener : " + carburantNecessaire.toFixed(2) + " litres";
    openPopup();
}
function openPopup() {
    var popup = document.getElementById('popup');
    popup.style.display = "block";
}

function closePopup() {
    var popup = document.getElementById('popup');
    popup.style.display = "none";
}

function resetForm() {
    // Réinitialisation des champs de saisie
    document.getElementById('consommation').value = "";
    document.getElementById('tempsRoulage').value = "";
    document.getElementById('tempsDelestage').value = "";
    document.getElementById('tempsIntegration').value = "";
    document.getElementById('tempsDegagement').value = "";
    document.getElementById('tempsMarge').value = "";
    document.getElementById('tempsCdb').value = "";
    
    // Réinitialisation des boutons radio
    var boutons = document.querySelectorAll('input[name="typeVol"]');
    boutons.forEach(function(bouton) {
        bouton.checked = false;
    });
    // Fermeture de la fenêtre pop-up
    closePopup();
}


function generatePDF() {
    var doc = new jsPDF();

    // Récupération des données saisies par l'utilisateur
    var consommation = parseFloat(document.getElementById('consommation').value);
    var capacite = parseFloat(document.getElementById('capacite').value);
    var tempsRoulage = parseFloat(document.getElementById('tempsRoulage').value);

    // Création d'une chaîne de texte avec les données
    var data = "Résumé du devis carburant\n\n";
    data += "Consommation de l'avion (L/h) : " + consommation + "\n";
    data += "Capacité totale de carburant (L) : " + capacite + "\n";
    data += "Temps de roulage (min) : " + tempsRoulage + "\n";
    // Ajoutez ici les autres données

    // Ajout de la chaîne de texte au PDF
    doc.text(data, 10, 10);

    // Téléchargement du PDF
    doc.save('devis_carburant.pdf');
}