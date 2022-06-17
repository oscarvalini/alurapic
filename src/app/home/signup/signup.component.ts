import { PlatformDetectorService } from "./../../core/plataform-detector/platform-detector.service";
import { SignupService } from "./signup.service";
import { NewUser } from "./new-user";
import { usernameNotTakenValidatorService } from "./username-not-taken.validator.service";
import { lowercaseValidator } from "src/app/shared/validators/lowercase-validator";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
  providers: [ usernameNotTakenValidatorService ]
})
export class SignupComponent implements OnInit, AfterViewInit {
  @ViewChild("emailInput") emailInput: ElementRef<HTMLInputElement>;

  signupForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private usernameNotTakenValidatorService: usernameNotTakenValidatorService,
    private service: SignupService,
    private router: Router,
    private platformDetectorService: PlatformDetectorService
  ) {}

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      fullName: [
        "",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(40),
        ],
      ],
      userName: [
        "",
        [
          Validators.required,
          lowercaseValidator,
          Validators.minLength(2),
          Validators.maxLength(30),
        ],
        [this.usernameNotTakenValidatorService.checkUsernameTaken()],
      ],
      password: [
        "",
        [
          Validators.required,
          Validators.pattern(/^[a-z0-9_\-]+$/),
          Validators.minLength(6),
          Validators.maxLength(14),
        ],
      ],
    });
  }

  ngAfterViewInit(): void {
    this.platformDetectorService.isPlatformBrowser &&
    this.emailInput.nativeElement.focus();
  }

  signup() {
    const newUser = this.signupForm.getRawValue() as NewUser;
    this.service.signup(newUser).subscribe(
      () => this.router.navigate([""]),
      (err) => console.log(err)
    );
  }
}
