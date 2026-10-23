/*
* Assignment 14
TypeScript OOP Assignment – Class Diagram
Part A - System: Simple Notes Management System (7 Marks)
*/

/*
1. Base Class – User (1 Mark)
Create a class called User.
The class should contain the following properties:
• Id (number)
• name (String)
• email (String)
• Password (String)
• Phone (String)
• age (Number ) (Must be between 18 and 60)
Requirements:
 Use appropriate access modifiers (public, private, protected).
 Create a method called displayInfo() that prints the user's information.
*/

/*
5. Aggregation – User and Notebook (1 Mark)
Create a relationship between:
 User
 NoteBook
Requirements:
 A user can own multiple notebooks.
 This relationship should represent Aggregation.
*/

/*
6.Association – Note and User (1 Mark)
Create a relationship between:
 User
 Note
Requirements:
 Each Note must have an author (the user who created it).
 This relationship should represent Association.
*/
class User {
  public noteBooks: NoteBook[];

  public Id: number;
  public name: string;
  public email: string;
  private _password: string;
  protected phone: string;
  public age: number;

  constructor(
    Id: number,
    name: string,
    email: string,
    password: string,
    phone: string,
    age: number,
  ) {
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

  public addNoteBook(noteBook: NoteBook) {
    this.noteBooks.push(noteBook);
    return `this noteBook has been added successfully`;
  }

  public displayInfo() {
    if (this.name) {
      return `Hi my name is (${this.name}) with ${this.age} years old and my email is "${this.email}" and you can contact with me with my phone number ${this.phone}`;
    }
    return `There is no user`;
  }
}

/*
3. Class - Note (1 Mark)
Create a class called Note
• Id (number)
• tittle(String)
• content(String)
• userId(reference to User)
Requirements:
 Create a method called preview() that returns a short preview of the note content.
*/

class Note {
  public Id: number;
  public title: string;
  public content: string;
  public author: User;

  constructor(Id: number, title: string, content: string, author: User) {
    this.Id = Id;
    this.title = title;
    this.content = content;
    this.author = author;
  }

  public preview() {
    return this.content.length > 20
      ? this.content.slice(0, 20) + "..."
      : this.content;
  }
}

/*
2. Inheritance – Admin User (1 Mark)
Create a class called Admin that extends the User class.
Requirements:
 The Admin class should include a method that allows the admin to manage notes.
 Apply the concept of inheritance.
*/

class Admin extends User {
  constructor(
    Id: number,
    name: string,
    email: string,
    password: string,
    phone: string,
    age: number,
  ) {
    super(Id, name, email, password, phone, age);
  }

  public manageNotes(noteBook: NoteBook, noteId: number) {
    return noteBook.removeNote(noteId);
  }
}

/*
4. Composition– NoteBook and Notes (1 Mark)
Create a class called NoteBook
Requirements:
 The NoteBook class should contain a collection of Notes objects .
 Implement methods such as : addNote() , removeNote()
 The relationship between Notebook and Note must represent Composition .
*/

class NoteBook {
  public notes: Note[];

  constructor() {
    this.notes = [];
  }

  public addNote(Id: number, title: string, content: string, author: User) {
    const note = new Note(Id, title, content, author);
    this.notes.push(note);
    return `this note has been added successfully`;
  }

  public removeNote(Id: number) {
    const existingNote = this.notes.find((note) => note.Id === Id);

    if (existingNote) {
      const filterNotes = this.notes.filter((note) => note.Id != Id);
      this.notes = filterNotes;
      return `this note has been removed successfully`;
    }

    return `this note not exist`;
  }
}

/*
7. Generics– Data Storage(1 Mark)
Create a Generic Class called :
 Storage
Requirements:
 The class should be able to store any type of data .
Example operations may include :
1. addItem ()
2. removeItem() .
3. getAllItems() .
*/

class Storage<T> {
  data: T[] = [];
  public addItem(value: T) {
    this.data.push(value);
    return "added";
  }
  public removeItem(index: number) {
    const newItems = this.data.filter((_, i) => i != index);
    this.data = newItems;
    return "removed";
  }

  public getAllItems() {
    return this.data;
  }
}

// ==================== Testing ====================

// User
const user = new User(
  Date.now(),
  "antonious",
  "antoniousnasr3@gmail.com",
  "totos@123",
  "01285551479",
  28,
);
console.log(user.displayInfo());

// Age validation
// const failedAgeUser = new User(
//   1,
//   "maximous",
//   "maximousnasr3@gmail.com",
//   "123",
//   "0100",
//   70,
// );
// console.log(failedAgeUser.displayInfo());

// Note (Association)
const note = new Note(
  Date.now(),
  "test",
  "content content content content",
  user,
);
console.log(note.preview());
console.log(note.author.name);

// NoteBook (Composition)
const noteBook = new NoteBook();
console.log(
  noteBook.addNote(123, "test noteBook", "content content for noteBook", user),
);
console.log(noteBook.notes);
console.log(noteBook.removeNote(123));
console.log(noteBook.notes);

// User and NoteBook (Aggregation)
const noteBookTwo = new NoteBook();
console.log(user.addNoteBook(noteBookTwo));
console.log(user.noteBooks);

// Admin (Inheritance)
const admin = new Admin(
  Date.now(),
  "maximous",
  "maximousnasr3@gmail.com",
  "mickey@123",
  "01274342115",
  23,
);
console.log(admin.displayInfo());
noteBookTwo.addNote(456, "admin test", "this note will be removed", user);
console.log(admin.manageNotes(noteBookTwo, 456));
console.log(noteBookTwo.notes);

// Storage (Generics)
const storageOne = new Storage<string>();
storageOne.addItem("totos");
storageOne.addItem("tony");
storageOne.addItem("antonious");
console.log(storageOne.getAllItems());
storageOne.removeItem(0);
console.log(storageOne.getAllItems());

const storageTwo = new Storage<Note>();
storageTwo.addItem(note);
console.log(storageTwo.getAllItems());
