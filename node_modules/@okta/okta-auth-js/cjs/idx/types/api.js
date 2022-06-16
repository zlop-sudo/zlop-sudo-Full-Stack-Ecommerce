"use strict";

exports.isAuthenticator = isAuthenticator;
exports.IdxFeature = exports.AuthenticatorKey = exports.IdxStatus = void 0;
let IdxStatus;
exports.IdxStatus = IdxStatus;

(function (IdxStatus) {
  IdxStatus["SUCCESS"] = "SUCCESS";
  IdxStatus["PENDING"] = "PENDING";
  IdxStatus["FAILURE"] = "FAILURE";
  IdxStatus["TERMINAL"] = "TERMINAL";
  IdxStatus["CANCELED"] = "CANCELED";
})(IdxStatus || (exports.IdxStatus = IdxStatus = {}));

let AuthenticatorKey;
exports.AuthenticatorKey = AuthenticatorKey;

(function (AuthenticatorKey) {
  AuthenticatorKey["OKTA_PASSWORD"] = "okta_password";
  AuthenticatorKey["OKTA_EMAIL"] = "okta_email";
  AuthenticatorKey["PHONE_NUMBER"] = "phone_number";
  AuthenticatorKey["GOOGLE_AUTHENTICATOR"] = "google_otp";
  AuthenticatorKey["SECURITY_QUESTION"] = "security_question";
  AuthenticatorKey["OKTA_VERIFY"] = "okta_verify";
  AuthenticatorKey["WEBAUTHN"] = "webauthn";
})(AuthenticatorKey || (exports.AuthenticatorKey = AuthenticatorKey = {}));

let IdxFeature;
exports.IdxFeature = IdxFeature;

(function (IdxFeature) {
  IdxFeature["PASSWORD_RECOVERY"] = "recover-password";
  IdxFeature["REGISTRATION"] = "enroll-profile";
  IdxFeature["SOCIAL_IDP"] = "redirect-idp";
  IdxFeature["ACCOUNT_UNLOCK"] = "unlock-account";
})(IdxFeature || (exports.IdxFeature = IdxFeature = {}));

function isAuthenticator(obj) {
  return obj && (obj.key || obj.id);
}
//# sourceMappingURL=api.js.map