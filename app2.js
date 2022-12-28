// importing all neccessary files

import * as cheerio from 'cheerio';
import fetch from 'node-fetch';
import fs from 'fs';
import { stringify } from 'querystring';
import { addAbortSignal } from 'stream';

// creating main link for Listam
let mainUrl = 'https://www.list.am/item/15515871';
let subPart = '?n=';
let subPart2 = '&crc=-1'


let pageNumFront = '/'; // should be added when pageNum > 1

// calculating Time Stamp when data was created
const today = new Date();
const day = today.getDate();
const month = today.getMonth();
const year = today.getFullYear();
const timeStamp = day + '.' + month + '.' + year;
let apartments = [];


// let districtNum = 5; // 1 is Yerevan, 12 Nubarashen;
// let pageNum = 1;

// for(let pageNum =1; pageNum < 21; pageNum ++){
//     for(let districtNum = 2; districtNum <13; districtNum++){
//         getApartments(pageNum, districtNum);
//     }
// }

async function getApartments(){
  try {

    for(let pageNum =1; pageNum < 21; pageNum ++){
        for(let districtNum = 2; districtNum <13; districtNum++){
    let urlCall = `${mainUrl}${pageNumFront}${pageNum}${subPart}${districtNum}${subPart2}`;
    const response = await fetch(urlCall);
    const body = await response.text();
    const $ = cheerio.load(body);
    
    $('a').map((index,element) => {
        let apartmentID = '';
        const apartmentIdRaw = $(element).attr('href');
        if(apartmentIdRaw){
            if(apartmentIdRaw.startsWith('/item') & apartmentIdRaw != ''){
                apartmentID = apartmentIdRaw.slice(6);
            }     
        }
        const price = $(element).find('.p').text().trim();
        const region = $(element).find('.at').text().trim();
        if(price != '' & apartmentID != '' & price != ''){
            apartments.push({
                region,
                apartmentID,
                price,
                districtNum,
                timeStamp
            })
        };
        
    });
};
};

fs.writeFile(`apartments_${timeStamp}.json`, JSON.stringify(apartments),function(error){
    if (error) return console.log(error);
    console.log('file saved');
    });

  } catch (error) {
      console.log(error);
  }
}

setInterval(()=>{
    getApartments();
},'86400000')


