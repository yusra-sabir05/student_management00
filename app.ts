#! /usr/bin/env node
import inquirer from "inquirer"

class Student{
    static counter=100;
    id:number;
    name:string;
    courses:string[]
    balance:number

    constructor(name:string){
        this.name=name;
        this.id=Student.counter++;
        this.courses=[]
        this.balance=10000

    }
    // enroll course
    enroll_course(course:string){
        this.courses.push(course)

    }
    // vowe student balance
    view_balance(){
        console.log(`balance for ${this.name} : ${this.balance}`);
        
    }
    // tuition fees
    pay_fees(amount:number){
        this.balance-=amount
        console.log(`$${amount} fees paid successfully for ${this.name}`);
    }
    // show status
    show_status(){
        console.log(`Name:${this.name}`);
        console.log(`ID:${this.id}`);
        console.log(`Courses:${this.courses}`);
        console.log(`Balance:$${this.balance}`);   
    }

}
// a class to manage students
class Student_manager{
    students:Student[]
    constructor(){
        this.students=[]
    }
    // method to add a new student
    add_student(name:string){
        let student = new Student(name)
        this.students.push(student)
        console.log(`student:${name} added successfully. student ID:${student.id}`);
        
    }
    // method to enroll student
    enroll_student(student_id:number,course:string){
        let student=this.find_student(student_id)
        if(student){
            student.enroll_course(course)
            console.log(`${student.name} enrolled in ${course} successfully`);
            }
        

    }
    // method to view student balance
    view_student_balance(student_id:number){
        let student=this.find_student(student_id)
        if(student){
            student.view_balance()
        }else{
            console.log("student don't found.please enter correct  student ID");
            
        }

    }
    // method to pay fees
    pay_fees(student_id:number,amount:number){
        let student=this.find_student(student_id)
        if(student){
            student.pay_fees(amount)

            // console.log(`$${amount} pay successfully. current balance $${student.balance}`)
        }else{
            console.log("student don't found.please enter correct  student ID");
        }
    }
    // method to display student status 
    display_student_status(student_id:number){
        let student=this.find_student(student_id)
        if(student){
            student.show_status()
        }
    }

    // method to find student id by syudent id 
    find_student(student_id:number){
        return this.students.find(std=>std.id=== student_id)
    }


    
}
// main function to run the program
async function main() {
    console.log("welcome to the codeofyusra - student management system ");
    console.log("-".repeat(10));
    let student_manager=new Student_manager()
    // while loop to keep program running
    while(true){
        let choice =await inquirer.prompt([
            {
                type:'list',
                name:'choice',
                message:'select an option',
                choices:['Add student',
                'Enroll student',
                'View student balance',
                'Pay fees',
                'Show status',
                'Exit']
            }
                    

        ]);
        // using switch case
        switch(choice.choice){
            case 'Add student':
            let name_input = await inquirer.prompt([
                {
                    type:'input',
                    name:'name',
                    message:'Enter student name'
                }
            ]);
            student_manager.add_student(name_input.name);
            break;
            case 'Enroll student':
                let course_input = await inquirer.prompt([
                    {
                        type:'number',
                        name:'student_id',
                        message:'Enter student id'
                    },
                    {
                        type:'input',
                        name:'course',
                        message:'Enter course name'
                    }

                ]);
                student_manager.enroll_student(course_input.student_id,course_input.course);
                break;
                case 'View student balance':
                    let balance_input = await inquirer.prompt([
                        {
                            type:'number',
                            name:'student_id',
                            message:'Enter student id'
                        }
                    ]);
                    student_manager.view_student_balance(balance_input.student_id);
                    break;
                    case 'Pay fees':
                        let fees_input = await inquirer.prompt([
                            {
                                type:'number',
                                name:'student_id',
                                message:'Enter student id'
                            },
                            {
                                type:'number',
                                name:'amount',
                                message:'Enter fees amount'
                            }
                        ]);
                        student_manager.pay_fees(fees_input.student_id,fees_input.amount);
                        break;
                        case 'Show status':
                            let status_input = await inquirer.prompt([
                                {
                                    type:'number',
                                    name:'student_id',
                                    message:'Enter student id'
                                }
                            ]);
                            student_manager.display_student_status(status_input.student_id);
                            break;
                            case 'Exit':
                                console.log('Exiting...')
                                process.exit()
        }
                
            }
    }
    main()
    
    
    

    
