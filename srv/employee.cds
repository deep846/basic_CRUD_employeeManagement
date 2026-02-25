using {deep.emp as emp} from '../db/employeeSchema';

service employeeService {


entity Employee as projection on emp.Employee;    

}