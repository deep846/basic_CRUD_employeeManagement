using {deep.emp as emp} from '../db/employeeSchema';
using {student as s} from './external/student';

service employeeService {

 @restrict: [
        {
            grant: '*',
            to   : 'manager'
        },
        {
            grant: 'READ',
            to   : 'user'
        }
    ]

entity Employee as projection on emp.Employee;    
entity studentss as projection on s.student;

}