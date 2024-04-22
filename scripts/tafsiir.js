let container = document.querySelector(".container");

let url = window.location.href;

let url_variables = url.split("?");

let exactSurah = url_variables[1].split("=");

let offset = 0;



// exactSurah[0] = id
// exactSurah[1] = the actualy surah number

let ayahCounter = 0
const biuldDom = (ayah, ayahNum) => {
    console.log(ayah)

    if(ayahCounter < 1 ){

        let ayahSplit = ayah.split("بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ");

        console.log(ayahSplit);
        
        container.innerHTML += `<div id="bisin"> <a href"#" dir="rtl" lang="ar">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</a></div>`;
        container.innerHTML += `<div style="padding-bottom:450px" id="aayah"><a href="" dir='rtl' lang='ar'>${ayahSplit[1]}<img src="../images/ayah.png" id="ayah-sign"><span id="ayah-number">${ayahNum}</span></a></div>`;
        tafsiirSo(exactSurah[1],ayahNum);
    }else{
        container.innerHTML += `<div id="aayah"><a href="" dir='rtl' lang='ar'>${ayah}<img src="../images/ayah.png" id="ayah-sign"><span id="ayah-number">${ayahNum}</span></a></div>`;
        tafsiirSo(exactSurah[1],ayahNum);
 
    }

    ayahCounter++;
}


const reading = async (num) => {

    let response = await fetch(`http://api.alquran.cloud/v1/surah/${num}?offset=${offset}&limit=1`);

    let surah = await response.json();

    surah.data.ayahs.forEach( (sura) => {
        biuldDom(sura.text, sura.numberInSurah);
    });
    

}
const tafsiirSo = async (surahNum, ayahNum) => {

    let response = await fetch(`./quraanJson/${surahNum}.json`);

    let surah = await response.json();

    // console.log();

    container.innerHTML+=`<div  dir='ltr' lang='en'><a id="aayah-tafsiir"  href="">${surah.result[ayahNum-1].translation}</a></div><hr>`;

    // surah.data.ayahs.forEach( (sura) => {
    //     biuldDom(sura.text, sura.numberInSurah);
    // });
    

}

reading(exactSurah[1]);

document.addEventListener('scroll', () => {
    const {scrollTop,scrollHeight,clientHeight} = document.documentElement;

    if(scrollTop + clientHeight >= scrollHeight){
        
        setTimeout( () => {
            offset++;
            reading(exactSurah[1]);

        },1000);

    }
})