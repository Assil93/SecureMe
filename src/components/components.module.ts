import { NgModule } from '@angular/core';
import { ForgotPasswordStep1Component } from './forgot-password-step1/forgot-password-step1';
import { ForgotPasswordStep2Component } from './forgot-password-step2/forgot-password-step2';
import { RegisterComponent } from './register/register';
@NgModule({
	declarations: [ForgotPasswordStep1Component,
    ForgotPasswordStep2Component,
    RegisterComponent],
	imports: [],
	exports: [ForgotPasswordStep1Component,
    ForgotPasswordStep2Component,
    RegisterComponent]
})
export class ComponentsModule {}
