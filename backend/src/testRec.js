function modifyField(match, str, newVal) {

  // form param 'str'
  const fieldList = (
    str.replace(/\[/g, '>[')       // replace `[` with `>[`
       .replace(/\]/g, '>')        // replace `]` with `>`
       .replace(/\s+/g, '')        // remove all whitespace
       .replace(/>>+/g, '>')       // replace multiple `>>` with a single `>`
       .replace(/^[>\[\]]+|[>\[\]]+$/g, '')  // cleanup
  ).split('>');                              // split into array 

    return obj?.map((item, index) => {
      
      //found matching element of the array
      if (Number(match) == index || (Object.values(item))?.find(value => value == match)) {
      
        // recursive function to set the field
        const setField = (parentField, i) => {
          
          const childField = fieldList[i];
          
          if (i == fieldList.length-1) {
           if (childField.charAt(0) == '[') {
            return parentField.map((oldVal, j) => (Number(childField.substring(1)) == j) ? newVal : oldVal)
           } else {
            return ({...parentField, [childField]: newVal })
           }
          }
          
          if (childField.charAt(0) == '[') {
            
            return parentField.map((oldVal, j) => (Number(childField.substring(1)) == j) ? setField(parentField[childField.substring(1)], i+1) : oldVal);
          } else {
            return ({...parentField, [childField]: setField(parentField[childField], i+1)});
          }
        }
        return setField(item, 0);
      } else {
        return item
      }
    }) 
}



const test1 = modifyField(1, 'profs[1]', 'bob');
console.log(test1[1]);

const test2 = modifyField('EECS2021', 'sections[1] > term', 'f')
console.log(test2[2]);