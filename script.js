document.getElementById('age-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Forhindrer skjemaet i å bli sendt
    
    // Henter verdier fra input-feltene
    var day = document.getElementById('Dag').value;
    var month = document.getElementById('Måned').value;
    var year = document.getElementById('År').value;
    
    // Konverterer input-verdiene til tall
    day = parseInt(day);
    month = parseInt(month);
    year = parseInt(year);
    
    // Validerer input-verdiene
    if (isNaN(day) || isNaN(month) || isNaN(year)) {
      alert('Vennligst fyll inn alle feltene med tallverdier');
      return;
    }
    
    // Validerer datoer
    if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1 || year > 2050) {
      alert('Ugyldig dato. Dag skal være mellom 1 og 31, måned skal være mellom 1 og 12, og år skal være mellom 1 og 2050.');
      return;
    }
    
    // Sjekker for skuddår
    var isLeapYear = (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);
    
    // Validerer februar
    if (month == 2) {
      if (isLeapYear && day > 29) {
        alert('Februar i et skuddår har maks 29 dager');
        return;
      } else if (!isLeapYear && day > 28) {
        alert('Februar har maks 28 dager');
        return;
      }
    }
    
    // Validerer måneder med 30 dager
    if ([4, 6, 9, 11].includes(month) && day > 30) {
      alert('Denne måneden har maks 30 dager');
      return;
    }
    
    // Beregner alder
    var today = new Date();
    var birthDate = new Date(year, month - 1, day); // Måned er 0-basert
    
    // Beregner alder i år
    var ageYears = today.getFullYear() - birthDate.getFullYear();
    var monthDiff = today.getMonth() - birthDate.getMonth();
    
    // Justerer alder hvis bursdag ikke har skjedd ennå i år
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      ageYears--;
    }
    
    // Beregner alder i måneder
    var ageMonths = (today.getMonth() + 12 - birthDate.getMonth()) % 12;
    
    // Beregner alder i dager
    var ageDays = today.getDate() - birthDate.getDate();
    if (ageDays < 0) {
      // Justerer dager hvis fødselsdato er senere i måneden enn dagens dato
      var lastDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
      ageDays = lastDayOfMonth + ageDays;
    }
    
    // Viser resultatet
    var resultMessage = 'Du er ' + ageYears + ' år, ' + ageMonths + ' måneder og ' + ageDays + ' dager gammel.';
    document.getElementById('age-result').innerHTML = resultMessage;
  });