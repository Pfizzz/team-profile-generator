class Employee {
    constructor(name, id, email, officeNumber){
        this.name = name;
        this.id = id;
        this.email = email;
        this.officeNumber = officeNumber;
        this.title = "Employee";
    }

getName() {
 return this.name;
}

getEmail() {
    return this.email;
}

getId() {
    return this.id;
}

getOffice() {
    return this.officeNumber;
}
getRole() {
    return "Employee";
}

}

module.exports= Employee;