import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const switchAuthMode = () => {
    setIsLogin((prevState) => !prevState);
  };

  const createUser = async (email, password) => {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong!");
    }

    return data;
  };

  const onSubmit = async (data) => {
    // event.preventDefault();
    console.log("success!");

    if (isLogin) {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (!result.error) {
        // set some auth state
        router.replace("/profile");
      }
    } else {
      try {
        const result = await createUser(data.email, data.password);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Card className="mt-5 col-md-6 offset-md-3 col-lg-4 offset-lg-4">
      <Card.Body className="my-4 text-center">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>User</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="user@mail.com"
                  {...field}
                  required
                />
              </Form.Group>
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  {...field}
                  required
                />
              </Form.Group>
            )}
          />
          <Button type="submit" className="mb-1">
            <span>{isLogin ? "Login" : "Create Account"}</span>
          </Button>
        </Form>
        <Button variant="secondary" type="button" onClick={switchAuthMode}>
          {isLogin ? "Create new account" : "Login with existing account"}
        </Button>
      </Card.Body>
    </Card>
  );
};

export { AuthForm };
