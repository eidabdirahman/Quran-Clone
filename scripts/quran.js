let container = document.querySelector(".container");
let loader = document.querySelector("#loader");

const biuldDom = (surahArabic, surahEnglish, surahNumber) => {

    container.innerHTML += `
    <div class="surah-info">
        <div class="surah-names">
            <a href="http://127.0.0.1:5500/tafsiir.html?id=${surahNumber}" id="surah-en">${surahEnglish}</a>
            <a href="http://127.0.0.1:5500/tafsiir.html?id=${surahNumber}" id="surah-ar">${surahArabic}</a>
        </div>
        <span id="ayah-number">${surahNumber}</span>
    </div>`;


}

const searchSurah = (e) => {

    let surahInfo = document.querySelectorAll('.surah-info');
    let term = e.target.value.toUpperCase();

    surahInfo.forEach((surah) => {
        let surahEn = surah.querySelector('#surah-en').innerText.toUpperCase();
        let surahAr = surah.querySelector('#surah-ar').innerText.toUpperCase();

        if (surahEn.indexOf(term) > -1 || surahAr.indexOf(term) > -1) {
            surah.style.display = 'flex';
        } else {
            surah.style.display = 'none';
        }
    });
}

const getAllSurah = async () => {

    loader.style.display = 'block';
    let response = await fetch('http://api.alquran.cloud/v1/quran/quran-uthmani');
    let surah = await response.json();
    loader.style.display = 'none';
    surah.data.surahs.forEach((sura) => {
        // console.log(surah)
        biuldDom(sura.name, sura.englishName, sura.number);
    });
}

getAllSurah();

document.addEventListener('input', searchSurah)