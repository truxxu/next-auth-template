import React from "react";
import { useForm, Controller } from "react-hook-form";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const AuthForm = ({ loginReq, clearError, isLoading }) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = () => {
    console.log("success!");
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
          <Button type="submit">
            <span>Action!</span>
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export { AuthForm };
