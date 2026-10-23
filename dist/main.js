class User {
    noteBooks;
    Id;
    name;
    email;
    _password;
    phone;
    age;
    constructor(Id, name, email, password, phone, age) {
        if (age < 18 || age > 60) {
            throw new Error("Age must be between 18 and 60");
        }
        this.Id = Id;
        this.name = name;
        this.email = email;
        this._password = password;
        this.phone = phone;
        this.age = age;
        this.noteBooks = [];
    }
    addNoteBook(noteBook) {
        this.noteBooks.push(noteBook);
        return `this noteBook has been added successfully`;
    }
    displayInfo() {
        if (this.name) {
            return `Hi my name is (${this.name}) with ${this.age} years old and my email is "${this.email}" and you can contact with me with my phone number ${this.phone}`;
        }
        return `There is no user`;
    }
}
class Note {
    Id;
    title;
    content;
    author;
    constructor(Id, title, content, author) {
        this.Id = Id;
        this.title = title;
        this.content = content;
        this.author = author;
    }
    preview() {
        return this.content.length > 20
            ? this.content.slice(0, 20) + "..."
            : this.content;
    }
}
class Admin extends User {
    constructor(Id, name, email, password, phone, age) {
        super(Id, name, email, password, phone, age);
    }
    manageNotes(noteBook, noteId) {
        return noteBook.removeNote(noteId);
    }
}
class NoteBook {
    notes;
    constructor() {
        this.notes = [];
    }
    addNote(Id, title, content, author) {
        const note = new Note(Id, title, content, author);
        this.notes.push(note);
        return `this note has been added successfully`;
    }
    removeNote(Id) {
        const existingNote = this.notes.find((note) => note.Id === Id);
        if (existingNote) {
            const filterNotes = this.notes.filter((note) => note.Id != Id);
            this.notes = filterNotes;
            return `this note has been removed successfully`;
        }
        return `this note not exist`;
    }
}
class Storage {
    data = [];
    addItem(value) {
        this.data.push(value);
        return "added";
    }
    removeItem(index) {
        const newItems = this.data.filter((_, i) => i != index);
        this.data = newItems;
        return "removed";
    }
    getAllItems() {
        return this.data;
    }
}
const user = new User(Date.now(), "antonious", "antoniousnasr3@gmail.com", "totos@123", "01285551479", 28);
console.log(user.displayInfo());
const note = new Note(Date.now(), "test", "content content content content", user);
console.log(note.preview());
console.log(note.author.name);
const noteBook = new NoteBook();
console.log(noteBook.addNote(123, "test noteBook", "content content for noteBook", user));
console.log(noteBook.notes);
console.log(noteBook.removeNote(123));
console.log(noteBook.notes);
const noteBookTwo = new NoteBook();
console.log(user.addNoteBook(noteBookTwo));
console.log(user.noteBooks);
const admin = new Admin(Date.now(), "maximous", "maximousnasr3@gmail.com", "mickey@123", "01274342115", 23);
console.log(admin.displayInfo());
noteBookTwo.addNote(456, "admin test", "this note will be removed", user);
console.log(admin.manageNotes(noteBookTwo, 456));
console.log(noteBookTwo.notes);
const storageOne = new Storage();
storageOne.addItem("totos");
storageOne.addItem("tony");
storageOne.addItem("antonious");
console.log(storageOne.getAllItems());
storageOne.removeItem(0);
console.log(storageOne.getAllItems());
const storageTwo = new Storage();
storageTwo.addItem(note);
console.log(storageTwo.getAllItems());
export {};
