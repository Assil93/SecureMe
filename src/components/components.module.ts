import { NgModule } from '@angular/core';
import { ForgotPasswordStep1Component } from './forgot-password-step1/forgot-password-step1';
import { ForgotPasswordStep2Component } from './forgot-password-step2/forgot-password-step2';
import { RegisterComponent } from './register/register';
import { ConfirmRegistrationComponent } from './confirm-registration/confirm-registration';
import { ResendCodeComponent } from './resend-code/resend-code';
@NgModule({
	declarations: [ForgotPasswordStep1Component,
    ForgotPasswordStep2Component,
    RegisterComponent,
    ConfirmRegistrationComponent,
    ResendCodeComponent],
	imports: [],
	exports: [ForgotPasswordStep1Component,
    ForgotPasswordStep2Component,
    RegisterComponent,
    ConfirmRegistrationComponent,
    ResendCodeComponent]
})
export class ComponentsModule {}
