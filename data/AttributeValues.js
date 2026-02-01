export class AttributeValues {
  attributeValues = []
  #localStorageKey;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.loadFromLocalStorage();
  }

  saveToLocalStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.attributeValues));
  }

  loadFromLocalStorage() {
    this.attributeValues = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [];
  }

  insertAttributeValue(data) {
    this.attributeValues.push(data);
    this.saveToLocalStorage();
  }

  searchAttributeValue(char) {
    let tempValue = [];
    if(!char)
      return tempValue = this.attributeValues;

    if(char)
      this.attributeValues.forEach((value) => {
        let attributeValue = value.attributeValue.toLowerCase();
        if(attributeValue.includes(char.toLowerCase()))
          tempValue.push(value);
      });  

    return tempValue;
  }

  deleteAttributeValue(attributeId, categoryId){
    let result = false
    if(attributeId){
      this.attributeValues.forEach((value, index) => {
        if(value.id === Number(attributeId)){
          result = true;
          this.attributeValues.splice(index, 1);
        }
      });
    }

    if(categoryId) {
      const originalLength = this.attributeValues.length;
      this.attributeValues = this.attributeValues.filter(value => Number(value.categoryId) !== Number(categoryId));

      result = this.attributeValues != this.originalLength;
    }

    this.saveToLocalStorage();
    return result;
  }

  getMatchingAttribute(categoryId) {
    let tempValue;
    return tempValue = this.attributeValues.filter(values => Number(categoryId) === Number(values.categoryId));
  }

  getAttributeValues(AttributeValuesId) {
    let tempValue;

    this.attributeValues.forEach((value, index) => {
      if(Number(AttributeValuesId) === Number(value.id)){
        tempValue = value;
      }
    });

      return tempValue;
  }
}
