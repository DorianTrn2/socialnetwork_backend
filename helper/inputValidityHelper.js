const userService = require('../services/userService');
const userRoleService = require('../services/userRoleService');
const eventThemeService = require('../services/eventThemeService');

const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const NAME_REGEX = /^[a-zA-ZâÂàÀçÇéÉêÊèÈëËîÎ\s-]+$/;
const USERNAME_REGEX = /^\w+$/;
const DATE_REGEX = /^(\d{2})\/(\d{2})\/(\d{4})$/;
const DATETIME_REGEX = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})Z$/;

/**
 * Verify that the given email format is valid.
 *
 * @param email the email to verify
 * @returns whether the email has a valid format or not
 */
function emailIsValid(email) {
    return EMAIL_REGEX.test(email);
}

/**
 * Verify that the given name format is valid (no digits / special characters).
 *
 * @param name the name to verify
 * @returns whether the name has a valid format or not
 */
function nameIsValid(name) {
    return NAME_REGEX.test(name);
}

/**
 * Verify that the given username format is valid (no special characters).
 *
 * @param username the username to verify
 * @returns whether the username has a valid format or not
 */
function usernameIsValid(username) {
    return USERNAME_REGEX.test(username);
}

/**
 * Verify that the given date format is valid (mm/dd/yyyy or yyyy-mm-dd or yyyy-mm-ddThh:MM:ssZ).
 *
 * @param date the date to verify
 * @returns whether the date has a valid format or not
 */
function dateIsValid(date) {
    // Force string to prevent using timestamp (time in milliseconds)
    // new Date("x") returns the specific date "Invalid Date"
    return new Date(`${date}`).toString() !== new Date("x").toString();
}

/**
 * Verify that the given price is valid (positive ad not null).
 *
 * @param price the price to verify
 * @returns whether the price is valid or not
 */
function priceIsValid(price) {
    return !isNaN(parseFloat(price)) && parseFloat(price) >= 0
}

/**
 * Verify that the given email and username are not already used.
 *
 * @param email the email to verify
 * @param username the username to verify
 * @returns whether the email and the username are available or not
 */
async function emailOrUsernameAreAlreadyUsed(email, username) {
    const registeredUsers = (await userService.getAllUsers());
    return registeredUsers.some((user) => user.email === email || user.username === username);
}

/**
 * Verify that the given role id exists in the database.
 *
 * @param roleId the role id to verify
 * @returns whether the role id exists in the database or not
 */
async function roleWithThisIdExists(roleId) {
    const userRoles = (await userRoleService.getAllUserRoles());
    return userRoles.some((userRole) => `${userRole.id}` === `${roleId}`);
}

/**
 * Verify that the given event theme code exists in the database.
 *
 * @param eventThemeCode the event theme code to verify
 * @returns whether the event theme code exists in the database or not
 */
async function eventThemeWithThisCodeExists(eventThemeCode) {
    const eventThemes = (await eventThemeService.getAllEventThemes());
    return eventThemes.some((eventTheme) => {
        console.log(eventTheme)
        return `${eventTheme.code}` === `${eventThemeCode}`
    });
}

module.exports = {
    emailIsValid,
    nameIsValid,
    usernameIsValid,
    dateIsValid,
    priceIsValid,
    emailOrUsernameAreAlreadyUsed,
    roleWithThisIdExists,
    eventThemeWithThisCodeExists,
}