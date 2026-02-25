sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("employeemanagement.controller.employee", {
        onInit() {
            this._oInputID = new sap.m.Input({ editable: false });
            this._oInputName = new sap.m.Input();
            this._oInputPrice = new sap.m.Input({ type: "Number" });
            this._oInputDesc = new sap.m.Input();

            this._oEditDialog = new sap.m.Dialog({
                title: "Edit Product",
                content: [
                    new sap.m.Label({ text: "ID" }),
                    this._oInputID,

                    new sap.m.Label({ text: "Name" }),
                    this._oInputName,

                    new sap.m.Label({ text: "age" }),
                    this._oInputPrice,

                    new sap.m.Label({ text: "Department" }),
                    this._oInputDesc
                ],
                beginButton: new sap.m.Button({
                    text: "Save",
                    type: "Accept",
                    press: this._onSave.bind(this)
                }),
                endButton: new sap.m.Button({
                    text: "Cancel",
                    type: "Reject",
                    press: function () { this._oEditDialog.close(); }.bind(this)
                })
            });

            this.getView().addDependent(this._oEditDialog);
        },
        async onDeleteRow(oEvent) {
            const oModel = this.getView().getModel();
            const sPath = oEvent.getSource().getBindingContext().sPath;
            await oModel.delete(sPath, "$auto", false);
            oModel.refresh();
        },
        async onCreateRow(oEvent) {
            let oNewEntry = {
                ID: this.byId('idInput').getValue(),
                Name: this.byId('nameInput').getValue(),
                age: this.byId('ageInput').getValue(),
                Department: this.byId('DepartmentInput').getValue(),
            }

            const oModel = this.getView().getModel();
            const res = oModel.bindList("/Employee").create(oNewEntry);

            try {
                await res.created();
                console.log("data added successfully")
                this.byId('idInput').setValue("");
                this.byId('nameInput').setValue("");
                this.byId('ageInput').setValue("");
                this.byId('DepartmentInput').setValue("");
            } catch (err) {
                console.log("error")
            }

            oModel.refresh();


            // res.created().then(()=>{
            //     console.log("Success");
            //     oModel.refresh();
            //     this.byId('idInput').setValue("");
            //     this.byId('nameInput').setValue("");
            //     this.byId('ageInput').setValue("");
            //     this.byId('DepartmentInput').setValue("");
            // }).catch((e)=>{
            //     console.log(e);
            // });

        },
        onEditRow: function (oEvent) {
            this._oSelectedContext = oEvent.getSource().getBindingContext();
            const oData = this._oSelectedContext.getObject();

            this._oInputID.setValue(oData.ID);
            this._oInputName.setValue(oData.Name);
            this._oInputPrice.setValue(oData.age);
            this._oInputDesc.setValue(oData.Department);

            this._oEditDialog.open();
        },
        _onSave: async function (oEvent) {
            const oModel = this.getView().getModel();
            try {

                const dialogData = {
                    ID: this._oInputID.getValue(),
                    Name: this._oInputName.getValue(),
                    age: Number(this._oInputPrice.getValue()),
                    Department: this._oInputDesc.getValue()
                };

                const sPath = `/Employee('${dialogData.ID}')`

                const oContextBinding = oModel.bindContext(sPath);
                const oContext = oContextBinding.getBoundContext();

                oContext.setProperty("ID", dialogData.ID);
                oContext.setProperty("Name", dialogData.Name);
                oContext.setProperty("age", dialogData.age);
                oContext.setProperty("Department", dialogData.Department);

                oModel.submitBatch("$auto")
                oModel.refresh();

                this._oEditDialog.close();



            } catch (err) {

            }
        },
    });
});