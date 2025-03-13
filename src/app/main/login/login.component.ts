import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { NavigationService } from '../../shared/navi/navigation.service';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  /** Injected Services */
  navigationService = inject(NavigationService);
  authService = inject(AuthService);

  /** UI States */
  isPageLoaded: boolean = false;
  isLogoShifted: boolean = false;
  isContentVisible: boolean = false;

  /** Authentication & Input States */
  email: string = '';
  password: string = '';
  isEmailValid: boolean = true;
  isPasswordValid: boolean = true;
  focusedInput: string = '';
  loginAttempted: boolean = false;

  /** Password Visibility */
  passwordVisible: boolean = false;
  passwordFieldActive: boolean = false;
  isVisibility: boolean = true;

  /** Validation Patterns */
  eMailPattern = /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/;
  pwPattern = /(?=.*[A-Z])(?=.*\d)(?=.*[^\w]).{6,20}/;

  /**
   * Angular lifecycle hook that runs after component initialization.
   *
   * This method orchestrates a delayed animation sequence for the login page:
   * - **Step 1**: Sets `isPageLoaded` to `true` after 200ms, making the page visible.
   * - **Step 2**: Moves the logo to its final position after an additional 400ms (total 600ms).
   * - **Step 3**: Displays the login content smoothly after another 400ms (total 1000ms).
   *
   * The staggered timing ensures a visually appealing entrance effect.
   *
   * @returns {void} This method does not return a value.
   */
  ngOnInit(): void {
    setTimeout(() => {
      this.isPageLoaded = true;
    }, 200);

    setTimeout(() => {
      this.isLogoShifted = true;
    }, 600);

    setTimeout(() => {
      this.isContentVisible = true;
    }, 1000);
  }

  /**
   * Focuses the specified input element.
   *
   * This function programmatically sets the focus on a given input field,
   * which is useful for enhancing user experience by allowing elements to be
   * focused via click events on surrounding containers or icons.
   *
   * @param inputElement - The HTML input element to focus.
   */
  focusInput(inputElement: HTMLInputElement) {
    inputElement.focus();
  }

  /**
   * This method is called when an input field receives focus.
   * It sets the focused input field name and toggles the visibility of the password field.
   *
   * @param {string} inputName - The name of the input field that is being focused.
   * It updates the `focusedInput` variable with the given `inputName`,
   * and toggles the `passwordFieldActive` boolean to manage the visual state of the password field.
   *
   * @returns {void} - This method doesn't return any value.
   */
  onFocus(inputName: string) {
    this.focusedInput = inputName;
    this.passwordFieldActive = inputName === 'password';
  }

  /**
   * This method is called when an input field loses focus.
   * It clears the `focusedInput` variable to indicate that no input field is currently focused.
   *
   * @returns {void} - This method doesn't return any value.
   */
  onBlur() {
    this.focusedInput = '';
  }

  /**
   * This method is triggered when the login button is clicked.
   * It checks whether the email and password fields are valid (i.e., not empty).
   * The validity is stored in `isEmailValid` and `isPasswordValid` variables.
   *
   * The method assigns `true` to `isEmailValid` if `email` is not empty, otherwise `false`.
   * Similarly, it assigns `true` to `isPasswordValid` if `password` is not empty, otherwise `false`.
   *
   * @returns {void} - This method doesn't return any value.
   */
  onLoginClick() {
    this.loginAttempted = true;
    this.isEmailValid = !!this.email;
    this.isPasswordValid = !!this.password;

    this.validateInput();
  }

  /**
   * This method toggles the visibility of the password input field.
   * When called, it switches the value of `passwordVisible` and `isVisibility` properties.
   *
   * - If `passwordVisible` is `false`, it will be set to `true` to display the password.
   * - If `passwordVisible` is `true`, it will be set to `false` to hide the password.
   *
   * Similarly, `isVisibility` is toggled to control additional visual elements related to password visibility.
   *
   * @returns {void} - This method doesn't return any value.
   */
  toggleVisibility() {
    this.passwordVisible = !this.passwordVisible;
    this.isVisibility = !this.isVisibility;
  }

  /**
   * Selects an item by its index.
   *
   * This method sets the selected item in the navigation service based on the provided index. It updates the currently
   * selected item to the one corresponding to the given index.
   *
   * @param {number} index - The index of the item to be selected.
   * @returns {void} This method does not return anything.
   */
  selectItem(index: number) {
    this.navigationService.setSelectedItem(index);
  }

  /**
   * Toggles the visibility between the sign-up and login sections in the navigation.
   * This method hides the sign-up section and shows the login section.
   *
   * @function linkSignUp
   */
  linkSignUp() {
    this.navigationService.isSignUpVisible = false;
    this.navigationService.isLoginVisible = true;
  }

  /**
   * Toggles the visibility of content and login sections in the navigation.
   * This method hides the content section and shows the login section.
   *
   * @function linkContent
   */
  linkContent() {
    this.navigationService.isContentVisible = false;
    this.navigationService.isLoginVisible = true;
  }

  /**
   * Validates the user's input (email and password) and attempts to log in.
   * If the email and password match the specified patterns, the method calls
   * the login service and proceeds with additional actions if the login is successful.
   * If the login fails or the input is invalid, it logs an appropriate message to the console.
   *
   * @function validateInput
   * @returns {void}
   */
  validateInput() {
    if (
      this.eMailPattern.test(this.email) &&
      this.pwPattern.test(this.password)
    ) {
      this.loginUser(this.email, this.password);
    }
  }

  /**
   * Attempts to log in a user with the provided email and password.
   * If the login is successful, the `linkContent` method is called,
   * and the email and password fields are cleared.
   * In case of a failed login, an error message is logged.
   *
   * @param {string} email - The email address of the user attempting to log in.
   * @param {string} pw - The password of the user attempting to log in.
   * @returns {void} This method does not return any value.
   */
  loginUser(email: string, pw: string) {
    this.authService.login(email, pw).then((isLoggedIn) => {
      if (isLoggedIn) {
        this.linkContent();
        this.clearLogin();
      }
    });
  }

  /**
   * Clears all login form fields, resetting them to their default values.
   * This ensures that any previously entered login data is removed.
   */
  clearLogin() {
    this.email = '';
    this.password = '';
    this.loginAttempted = false;
  }
}
