import { Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ToggleSwitch } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { userContext } from "../../contexts/user";
import { signMeIn } from "../../services/firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import blankProfilePic from "../../assets/blank.png";

export default function SignIn() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(userContext);
  const [pSwitch, setPSwitch] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  return (
    <>
      <form
        className="flex flex-col max-w-md gap-4 m-auto mt-10"
        onSubmit={handleSubmit((data) => {
          setUser(data.email);
          signMeIn(data.email, data.password)
            .then((userCredential) => {
              setUser({
                username: userCredential.user.displayName,
                token: userCredential.user.accessToken,
                photoURL: userCredential.user.photoURL ?? blankProfilePic,
              });
              localStorage.setItem("username", userCredential.user.displayName);
              localStorage.setItem("token", userCredential.user.accessToken);
              toast.success("Successfully Logged In");
              console.log(user);
              navigate("/");
            })
            .catch((err) => {
              toast.error(err.message);
            });
        })}
      >
        <div>
          <Toaster />
        </div>
        <div>
          <div className="block mb-2">
            <Label htmlFor="email" value="Your email" />
          </div>
          <TextInput
            id="email"
            type="text"
            placeholder="name@domain.com"
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
          <div className="block mb-2">
            <Label htmlFor="password" value="Your password" />
          </div>
          <TextInput
            type={pSwitch ? "text" : "password"}
            id="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
          <ToggleSwitch
            className="mt-5"
            checked={pSwitch}
            label="Show Pasword"
            onChange={setPSwitch}
          />
        </div>
        <Button type="submit">Sign In</Button>
      </form>
    </>
  );
}
