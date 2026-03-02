using {deep.emp as emp} from '../db/employeeSchema';

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

}