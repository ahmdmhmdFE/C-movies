"use client";

import { Button } from "flowbite-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FloatingLabel } from "flowbite-react";
import { useContext, useState } from "react";
import { ToggleSwitch } from "flowbite-react";
import { updateProfile } from "firebase/auth";
import { auth } from "../../services/firebase/config";
import { userContext } from "../../contexts/user";
import { signMeUp } from "../../services/firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import blankProfilePic from "../../assets/blank.png";
import { FileInput, Label } from "flowbite-react";

export default function SignIn() {
  const navigate = useNavigate();
  const [pSwitch, setPSwitch] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const { user, setUser } = useContext(userContext);

  const {
    register,
    handleSubmit,
    getValues,
    getFieldState,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  const getColor = (inp) => {
    if (getFieldState(inp).isTouched) {
      if (errors[inp]) {
        return "error";
      } else {
        return "success";
      }
    } else {
      return "default";
    }
  };

  return (
    <>
      <div>
        <Toaster />
      </div>
      <form
        className="flex flex-col max-w-md gap-4 m-auto mt-10"
        onSubmit={handleSubmit((data) => {
          setUser(data.email);
          signMeUp(data.email, data.password)
            .then((userCredential) => {
              updateProfile(auth.currentUser, {
                displayName: data.name,
              })
                .then(() => {
                  setUser({
                    username: userCredential.user.displayName,
                    token: userCredential.user.accessToken,
                    photoURL: userCredential.user.photoURL ?? blankProfilePic,
                  });
                  localStorage.setItem(
                    "username",
                    userCredential.user.displayName
                  );
                  localStorage.setItem(
                    "token",
                    userCredential.user.accessToken
                  );
                })
                .catch((error) => {
                  toast.error(error.message);
                });
              toast.success("Successfully Signed Up");
              navigate("/");
            })
            .catch((err) => {
              toast.error(err.message);
            });
        })}
      >
        <div>
          <FloatingLabel
            variant="filled"
            label="Name"
            color={getColor("name")}
            id="name"
            type="text"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters",
              },
            })}
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
        <div>
          <FloatingLabel
            variant="filled"
            label="Email Address"
            color={getColor("email")}
            id="email"
            type="text"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.com$/i,
                message: "Invalid email pattern",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div>
          <FloatingLabel
            variant="filled"
            label="User Name"
            color={getColor("userName")}
            id="userName"
            type="text"
            {...register("userName", {
              required: "User Name is required",
              pattern: {
                value: /^\S+$/i,
                message: "No whitespace characters",
              },
            })}
          />
          {errors.userName && (
            <p className="text-red-500">{errors.userName.message}</p>
          )}
        </div>
        <div>
          <FloatingLabel
            variant="filled"
            label="Password"
            color={getColor("password")}
            id="password"
            type={pSwitch ? "text" : "password"}
            {...register("password", {
              required: "password is required",
              pattern: {
                value: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$*@#%])/,
                message:
                  "Password must contian at least one lowercase, one uppercase, one digit, and one special character [ $ * @ # % ]",
              },
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>
        <div>
          <FloatingLabel
            variant="filled"
            label="Repeat Password"
            color={getColor("repeatPassword")}
            id="repeatPassword"
            type={pSwitch ? "text" : "password"}
            {...register("repeatPassword", {
              required: "Please repeat your password",
              validate: (value) =>
                value == getValues("password") || "Passwords do not match",
            })}
          />
          {errors.repeatPassword && (
            <p className="text-red-500">{errors.repeatPassword.message}</p>
          )}
          <div>
            <div>
              <Label htmlFor="file-upload-helper-text" value="Upload file" />
            </div>
            <FileInput
              id="file-upload-helper-text"
              helperText="SVG, PNG, JPG or GIF (MAX. 800x400px)."
              {...register("pic")}
            />
          </div>
        </div>
        <ToggleSwitch
          className="mt-5"
          checked={pSwitch}
          label="Show Pasword"
          onChange={setPSwitch}
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </>
  );
}
