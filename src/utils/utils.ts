export const isRequired = (reqArray: any[], prop: any) => {
    return Array.isArray(reqArray)
      && reqArray.includes(prop)
        ? true
        : false;
  };
  export const isPrimitive = (value:string) => {
    return value !== "array" && value !== "object";
  };
  /*
   this util is to remove "#/definitions/ResultOptRequest" from the description 
   example : 
   if description is "Out-of-band result delivery preferences in request #/definitions/ResultOptRequest"
   this util will return "Out-of-band result delivery preferences in request"
  */
  export const excludeRefInDescription = (description:string) =>{
      if(description && 
        (description.includes("#/components"))){
          const index = description.indexOf("#/components");
         return  description.substring(0, index);
      }else if(description && description.includes("#/definitions")){
        return description.substring(0, description.indexOf("#/definitions"));
      }
      return description;
  }