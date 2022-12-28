import fetch from "node-fetch";
const response = await fetch(
  `https://apartmentsanalytics-default-rtdb.europe-west1.firebasedatabase.app/tes.json`,
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ key: "yes" }),
  }
).catch((err) => {
  console.log(err);
});
console.log(response);
// const data = await response.json();


function result() {
  for (let i = 0; i < apartmentsOld.length; i++) {
    let apa = new Apartment(apartmentsOld[i]);
    let data = apa.newAppCreator();
    fetching(data, apartmentsOld[i]);
    async function fetching(data, apartmentOld) {
      if (apartmentOld.districtNum < 14) {
        let city = "Yerevan";
        await fetch(
          `https://apartmentsanalytics-default-rtdb.europe-west1.firebasedatabase.app/yerevan/${apartmentOld.districtNum}.json`,
          {
            method: "PATCH",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
          }
        ).catch((err) => console.log(err));
        let dataT = {
          price: {
            //   key: "12",
            [apartmentOld.timeStamp.replaceAll(".", "")]: apartmentOld.price,
          },
        };
      }
    }
  }
}