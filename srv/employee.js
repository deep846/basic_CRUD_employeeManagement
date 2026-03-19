const cds = require('@sap/cds');

class employeeService extends cds.ApplicationService{

    async init(){
        const {studentss} = this.entities;
        const nw = await cds.connect.to('student');

        this.on("READ",studentss,async function(req){
            return await nw.run(req.query);
        })

        return super.init();
    }
}

module.exports = {employeeService};