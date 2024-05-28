#!/usr/bin/env node

import inquirer from "inquirer";

class students {
  name: string;
  id: number;
  courses: string[];
  fees: number;

  constructor(name: string, id: number, courses: string[], fees: number) {
    this.name = name;
    this.id = id;
    this.courses = courses;
    this.fees = fees;
  }
}

let continueEnrollment = true;

let studentEnrollment: students[] = [];
console.log("WELLCOME TO ZAHID IT INITIATIVE PROGRAM");

while (continueEnrollment) {
  let answer = await inquirer.prompt({
    name: "select",
    type: "list",
    message: "select option",
    choices: ["Enroll Student", "Show Status", "Exit"],
  });
  if (answer.select === "Enroll Student") {
    let enroll = await inquirer.prompt({
      name: "student",
      type: "input",
      message: "Enter your name: ",
      validate: (value) => {
        if (value.trim() === "") {
          return "PLEASE FILL OUT THIS FIELD";
        }
        return true;
      },
    });
    console.log(`\n WELLCOME ${enroll.student} `)

    let selectCourse = await inquirer.prompt({
      name: "courses",
      type: "list",
      message: "select course to enroll",
      choices: [
        "frontend development",
        "backend development",
        "fullstack development",
      ],
    });
    console.log(`${selectCourse.courses} course fee is `);
    let coursefee = 0;
    switch (selectCourse.courses) {
      case "frontend development":
        coursefee = 10000;
        break;
      case "backend development":
        coursefee = 20000;
        break;
      case "fullstack development":
        coursefee = 25000;
    }
    console.log(coursefee);

    let continueEnrollment = await inquirer.prompt({
      name: "chose",
      type: "confirm",
      message: "Do you want to continue enrollment process?",
      default: false,
    });
    if (continueEnrollment.chose === true) {
      let payment = await inquirer.prompt([
        {
          name: "amount",
          type: "list",
          message: "select payment method to pay fee: ",
          choices: ["easy paisa", "jazz cash", "bank tranfer"],
        },

        {
           name: "submit",
           type: "number",
           message: "Enter amount: " 
        },
      ]);
      
      let myBalance = payment.submit;
      console.log(`your current balance is ${myBalance}`);

      if (payment.submit === coursefee) {
        let id = Math.floor(Math.random() * 100000);
        let studentData = new students(
          enroll.student,
          id,
          selectCourse.courses,
          coursefee
        ); //create new student ()
        studentEnrollment.push(studentData);
        console.log(
          enroll.student + " is enrolled successfully. Your student ID is " + id
        );
      } else {
        console.log(`process expired!!! your exact fee is ${coursefee}`);
      }
    }
  } else if (answer.select === "Show Status") {
    let Enter = await inquirer.prompt({
      name: "id",
      type: "number",
      message: "Enter your id to check status:",
    });
    let student = studentEnrollment.find((student) => student.id === Enter.id);
    if (student) {
      console.log("showing status..........");
      console.log(studentEnrollment);
    } else {
      console.log("id not found");
    }
  } else if (answer.select === "Exit") {
    continueEnrollment = false;
    console.log(" EXITING....! THANKS FOR USING OUR PROGRAM");
  }
}
