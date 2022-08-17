function sumArray(array, num){
    for (let i = 0; i < array.length-1; i++) {
        for (let j = i+1; j < array.length; j++) {
          if(array[i]+array[j]===num){
            return true
          }
        }
      }
      return false
    }


 function arrProp (array, string){
   let newArr = []
   for (let i = 0; i < array.length; i++) {
     
       if (array[i].hasOwnProperty(string)) {
         newArr.push(array[i][string])
     }
   }
   return newArr
 }   
    module.exports = { sumArray, arrProp };

   