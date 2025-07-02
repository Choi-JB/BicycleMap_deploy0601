//미사용
const axios = require('axios')
const ApiDefault = {
  url: "maps.googleapis.com/maps/api/geocode/json?address=",
  key: "----" //비공개처리
};

const getCoords = async function(place){
  let reqURL = `https://${ApiDefault.url}${place}&key=${ApiDefault.key}`;
  var coords =''
  try{
    const {data} = await axios.get(reqURL);
    var lat = data.results[0].geometry.location.lat
    var lng = data.results[0].geometry.location.lng
    var coord = lng.toString()+','+lat.toString()
    coords += coord

    return coords

  } catch(error){
    console.log(error)
  }
}

const getData = function(place){
  return new Promise(function(resolve, reject){
    resolve(getCoords(place));
  })
}

module.exports = async function (place){
  
  return getData(place)
  //  path.map(async(place) => {
  //     getData(place).then(result => {
  //       console.log(result)
  //       coords += result
  //     })
  // })
  // console.log(coords)
  // return coords
};
  
