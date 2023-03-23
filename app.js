async function fetchAndDisplayData() {
    const response = await fetch('./data.json');
    const data = await response.json();
    const parentElement = document.querySelector('.calender');
    const tiles = [];
  
    data.forEach(item => {
      const div = document.createElement('div');
      div.classList.add('tile');
      div.setAttribute('data-date', item.dateInE);
  
      const dateInE = document.createElement('p');
      dateInE.textContent = item.dateInE;
      div.appendChild(dateInE);
  
      const ramadanDate = document.createElement('h4');
      ramadanDate.textContent = item.ramadanDate;
      div.appendChild(ramadanDate);
  
      parentElement.appendChild(div);
      tiles.push(div);
    });
  
    // Assign a red background to the first tile
    tiles[0].style.backgroundColor = "#E7BD6A";
    tiles[0].style.color = "#000F4D"
  
    // Move the background color to the next tile every day
    setInterval(() => {
      const today = new Date();
  
      // Define options for formatting the date string
      const options = {
          year: "numeric",
          month: "long",
          day: "numeric"
      };
  
      const currentDateString = today.toLocaleDateString("en-US", options);
  
      tiles.forEach((tile, index) => {
        const tileDate = new Date(tile.getAttribute("data-date"));
        const tileDateString = tileDate.toLocaleDateString("en-US", options);
  
        if (tileDateString === currentDateString) {
          tile.style.backgroundColor = "#E7BD6A";
          tile.style.color = "#000F4D"
        } else {
          tile.style.backgroundColor = "";
        }
  
        if (index === tiles.length - 1) {
          tiles[0].style.backgroundColor = "red";
        } else {
          tiles[index + 1].style.backgroundColor = "red";
        }
      });
    }, 86400000); // 24 hours in milliseconds
  }
  
  
  function getRandomAyah() {
    setInterval(
        fetch('https://api.alquran.cloud/v1/ayah/random')
            .then(response => response.json())
            .then(data => {
            const ayahText = data.data.text;
            const chapterNum = data.data.surah.number;
            const verseNum = data.data.surah.numberOfAyahs;
            
            // Update the content of the elements with class names "ayat", "chapter", and "verse"
            const ayatElement = document.querySelector('.ayat');
            ayatElement.textContent = ayahText;
            
            const chapterElement = document.querySelector('.chapter');
            chapterElement.textContent = chapterNum;
            
            const verseElement = document.querySelector('.verse');
            verseElement.textContent = verseNum;
            })
            .catch(error => {
            console.error('Error:', error);
        }), 160000) // 10 minutes in milliseconds
  }
  

  fetchAndDisplayData();
  getRandomAyah();


