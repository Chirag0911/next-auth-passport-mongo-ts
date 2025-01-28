export function isBlank(str: string) {
  return !str || /^\s*$/.test(str);
}

export const isEmailValid = (email: string) => {
  const emailMatchRegEx =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return emailMatchRegEx.test(email);
};

export const isPasswordValid = (password: string) => {
  const passwordMatchRegEx =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;
  return passwordMatchRegEx.test(password);
};
