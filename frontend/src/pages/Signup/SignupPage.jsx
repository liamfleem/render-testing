import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../../services/authentication";
import {passwordValidator, notEmpty} from "../../../../api/utils/fieldValidator";
import '../Signup/Signup.css';

export const SignupPage = () => {
  

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullName] = useState("");  

  const fields = [email, password, fullname]

  // const [lengthValidator, setLengthValidator] = useState(false);

  // const returnValidatedClass = (validator) => {
  //   if (validator === true) {
  //     return 'validator-true';
  //   } else {
  //     return 'validator-false';
  //   }
  // }

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      fields.forEach(field => {
        notEmpty(field);
      })
      passwordValidator(password)
      try {
        await signup(fullname, email, password);
        console.log("redirecting...:");
        navigate("/login");
      } catch (err) {
        console.error(err);
        navigate("/signup");
      }
    } catch (err) {
      alert(err)
      navigate("/signup")
    }

    
  };

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    // setLengthValidator(regexLengthValidator(password));
  };



  return (
    <>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div id="fullname">
          <label htmlFor="fullname">Full Name:</label>
          <input
            id="fullname"
            type="text"
            value={fullname}
            onChange={handleFullNameChange}
          />
        </div>
        <div id="email">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="text"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div id="password">
          <label htmlFor="password">Password:</label>
          <input
            placeholder="Password"
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <p>Must be 8+ characters</p>
          <p>Must contain upper and lowercase</p>
          <p>Must contain at least one number</p>
        </div>
        <div id="submit">
          <input role="submit-button" id="submit" type="submit" value="Submit" />
          </div>
      </form>
    </>
  );
};
