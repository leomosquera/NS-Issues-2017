"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var forms_1 = require("nativescript-angular/forms");
var modal_dialog_1 = require("nativescript-angular/modal-dialog");
var medication_component_1 = require("./medication.component");
var ViewPrescriptionModal_component_1 = require("./ViewPrescriptionModal/ViewPrescriptionModal.component");
var shared_module_1 = require("../../shared/shared.module");
var medication_service_1 = require("./medication.service");
var nativescript_locate_address_1 = require("nativescript-locate-address");
exports.routerConfig = [
    {
        path: "",
        component: medication_component_1.MedicationComponent
    }
];
var MedicationModule = (function () {
    function MedicationModule() {
    }
    return MedicationModule;
}());
MedicationModule = __decorate([
    core_1.NgModule({
        schemas: [core_1.NO_ERRORS_SCHEMA],
        imports: [
            nativescript_module_1.NativeScriptModule,
            router_1.NativeScriptRouterModule,
            forms_1.NativeScriptFormsModule,
            router_1.NativeScriptRouterModule.forChild(exports.routerConfig),
            shared_module_1.SharedModule
        ],
        declarations: [medication_component_1.MedicationComponent, ViewPrescriptionModal_component_1.ViewPrescriptionModalComponent],
        providers: [modal_dialog_1.ModalDialogService, medication_service_1.MedicationService, nativescript_locate_address_1.LocateAddress],
        entryComponents: [ViewPrescriptionModal_component_1.ViewPrescriptionModalComponent],
    }),
    __metadata("design:paramtypes", [])
], MedicationModule);
exports.MedicationModule = MedicationModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWNhdGlvbi5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtZWRpY2F0aW9uLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyRDtBQUMzRCxzREFBdUU7QUFDdkUsZ0ZBQThFO0FBQzlFLG9EQUFxRTtBQUNyRSxrRUFBdUU7QUFDdkUsK0RBQTZEO0FBQzdELDJHQUF5RztBQUN6Ryw0REFBMEQ7QUFDMUQsMkRBQXlEO0FBQ3pELDJFQUE0RDtBQUUvQyxRQUFBLFlBQVksR0FBRztJQUN4QjtRQUNJLElBQUksRUFBRSxFQUFFO1FBQ1IsU0FBUyxFQUFFLDBDQUFtQjtLQUNqQztDQUNKLENBQUM7QUFnQkYsSUFBYSxnQkFBZ0I7SUFDekI7SUFBZ0IsQ0FBQztJQUNyQix1QkFBQztBQUFELENBQUMsQUFGRCxJQUVDO0FBRlksZ0JBQWdCO0lBZDVCLGVBQVEsQ0FBQztRQUNOLE9BQU8sRUFBRSxDQUFDLHVCQUFnQixDQUFDO1FBQzNCLE9BQU8sRUFBRTtZQUNMLHdDQUFrQjtZQUNsQixpQ0FBd0I7WUFDeEIsK0JBQXVCO1lBQ3ZCLGlDQUF3QixDQUFDLFFBQVEsQ0FBQyxvQkFBWSxDQUFDO1lBQy9DLDRCQUFZO1NBQ2Y7UUFDRCxZQUFZLEVBQUUsQ0FBQywwQ0FBbUIsRUFBRSxnRUFBOEIsQ0FBQztRQUNuRSxTQUFTLEVBQUUsQ0FBQyxpQ0FBa0IsRUFBRSxzQ0FBaUIsRUFBRSwyQ0FBYSxDQUFDO1FBQ2pFLGVBQWUsRUFBRSxDQUFDLGdFQUE4QixDQUFDO0tBQ3BELENBQUM7O0dBRVcsZ0JBQWdCLENBRTVCO0FBRlksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9uYXRpdmVzY3JpcHQubW9kdWxlXCI7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2Zvcm1zXCI7XHJcbmltcG9ydCB7IE1vZGFsRGlhbG9nU2VydmljZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9tb2RhbC1kaWFsb2dcIjtcclxuaW1wb3J0IHsgTWVkaWNhdGlvbkNvbXBvbmVudCB9IGZyb20gXCIuL21lZGljYXRpb24uY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFZpZXdQcmVzY3JpcHRpb25Nb2RhbENvbXBvbmVudCB9IGZyb20gXCIuL1ZpZXdQcmVzY3JpcHRpb25Nb2RhbC9WaWV3UHJlc2NyaXB0aW9uTW9kYWwuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFNoYXJlZE1vZHVsZSB9IGZyb20gXCIuLi8uLi9zaGFyZWQvc2hhcmVkLm1vZHVsZVwiO1xyXG5pbXBvcnQgeyBNZWRpY2F0aW9uU2VydmljZSB9IGZyb20gXCIuL21lZGljYXRpb24uc2VydmljZVwiO1xyXG5pbXBvcnQgeyBMb2NhdGVBZGRyZXNzIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1sb2NhdGUtYWRkcmVzc1wiO1xyXG5cclxuZXhwb3J0IGNvbnN0IHJvdXRlckNvbmZpZyA9IFtcclxuICAgIHtcclxuICAgICAgICBwYXRoOiBcIlwiLFxyXG4gICAgICAgIGNvbXBvbmVudDogTWVkaWNhdGlvbkNvbXBvbmVudFxyXG4gICAgfVxyXG5dO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIHNjaGVtYXM6IFtOT19FUlJPUlNfU0NIRU1BXSxcclxuICAgIGltcG9ydHM6IFtcclxuICAgICAgICBOYXRpdmVTY3JpcHRNb2R1bGUsXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlLFxyXG4gICAgICAgIE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlLFxyXG4gICAgICAgIE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZS5mb3JDaGlsZChyb3V0ZXJDb25maWcpLFxyXG4gICAgICAgIFNoYXJlZE1vZHVsZVxyXG4gICAgXSxcclxuICAgIGRlY2xhcmF0aW9uczogW01lZGljYXRpb25Db21wb25lbnQsIFZpZXdQcmVzY3JpcHRpb25Nb2RhbENvbXBvbmVudF0sXHJcbiAgICBwcm92aWRlcnM6IFtNb2RhbERpYWxvZ1NlcnZpY2UsIE1lZGljYXRpb25TZXJ2aWNlLCBMb2NhdGVBZGRyZXNzXSxcclxuICAgIGVudHJ5Q29tcG9uZW50czogW1ZpZXdQcmVzY3JpcHRpb25Nb2RhbENvbXBvbmVudF0sXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgTWVkaWNhdGlvbk1vZHVsZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHsgfVxyXG59XHJcbiJdfQ==