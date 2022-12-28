 import apartments12 from './apartments12722.json' assert { type: "json" };
 import apartments15 from './apartments15722.json' assert { type: "json" };
 console.log(apartments12.length)
console.log(apartments15.find(findApartment))

    // function findApartment(apartmentIDd){
    //     return apartments12.apartmentID
    // }
    function hasAnythingInCommon(obj1, obj2) {
    for (const key in obj1){
        if(obj1[key] === obj2[key]) return true
      }
    }
    for(let i=0; i <= apartments12.length; i++){
        apartments12[i].apartmentID
    }