export class Profile{
    public name: string;
    public age: string;
    public location: string;
    public tagline: string;
    public description: string;
    public gender: string;

    constructor(name: string, age: string, location: string, tagline: string, description: string, gender: string){
        this.name = name;
        this.age = age;
        this.location = location;
        this.tagline = tagline;
        this.description = description;
        this.gender = gender;
    }
}