const fs = require("fs");
const download = require('image-downloader');

const baseURL = "https://pokeapi.co/api/v2/pokemon/";
const movesURL = "https://pokeapi.co/api/v2/move/";
const photosFolder = "D:\\CodingProjects\\PokeAPI\\photos";
const statsFolder = "D:\\CodingProjects\\PokeAPI\\stats";
const movesFolder = "D:\\CodingProjects\\PokeAPI\\moves";
const pokemonCount = 1015;

async function writeStats(){
    for(let i = 1; i <= pokemonCount; i++){
        var response = await fetch(`${baseURL}${i}`);
        let data = await response.json();
        var stats = {
            "id": data.id,
            "name": data.name,
            "types": data.types.map(t => t.type.name),
            "hp": data.stats[0].base_stat,
            "atk": data.stats[1].base_stat,
            "def": data.stats[2].base_stat,
            "spAtk": data.stats[3].base_stat,
            "spDef": data.stats[4].base_stat,
            "speed": data.stats[5].base_stat,
            "hpEffort": data.stats[0].effort,
            "atkEffort": data.stats[1].effort,
            "defEffort": data.stats[2].effort,
            "spAtkEffort": data.stats[3].effort,
            "spDefEffort": data.stats[4].effort,
            "speedEffort": data.stats[5].effort,
        }
        fs.writeFile(`${statsFolder}\\${stats.name}.json`, JSON.stringify(stats), err => {
            if (err) throw err; 
            if(i % 100 == 0){
                console.log(`Done writing stats file for pokemon ${i}`); // Success
            }
            
        });
    }
}
//writeStats();

async function writeMoves(){
    for(let i = 1; i <= 1000; i++){
        var response = await fetch(`${movesURL}${i}`);
        let data = await response.json();
        var stats = {
            "id": data.id,
            "name": data.name,
            "accuracy": data.accuracy,
            "pp": data.pp,
            "priority": data.priority,
            "power": data.power,
            "type": data.type.name,
            "damageClass": data.damage_class.name,
            "description": data.flavor_text_entries[0].flavor_text
        }
        fs.writeFile(`${movesFolder}\\${stats.name}.json`, JSON.stringify(stats), err => {
            if (err) throw err; 
            if(i % 100 == 0){
                console.log(`Done writing stats file for pokemon ${i}`); // Success
            }
        });
    }
}
//writeMoves();

function downloadImage(url, filepath) {
    return download.image({
       url,
       dest: filepath 
    });
}

async function writePhotos(){
    for(let i = 1; i <= pokemonCount; i++){
        var response = await fetch(`${baseURL}${i}`);
        let data = await response.json();
        var stats = {
            "id": data.id,
            "name": data.name,
            "front": data.sprites.front_default,
            "back": data.sprites.back_default,
            "frontShiny": data.sprites.front_shiny,
            "backShiny": data.sprites.back_shiny,
        }
        downloadImage(stats.front, `${photosFolder}\\${stats.name}_front.png`);
        downloadImage(stats.back, `${photosFolder}\\${stats.name}_back.png`);
        downloadImage(stats.frontShiny, `${photosFolder}\\${stats.name}_frontShiny.png`);
        downloadImage(stats.backShiny, `${photosFolder}\\${stats.name}_backShiny.png`);
    }
}
writePhotos();