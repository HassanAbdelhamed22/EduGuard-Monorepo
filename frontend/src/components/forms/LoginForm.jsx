import React from "react";
import { Formik, Form } from "formik";
import { Eye, EyeOff } from "lucide-react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { Link } from "react-router";

const LoginForm = ({
  initialValues,
  validationSchema,
  onSubmit,
  isLoading,
  showPassword,
  setShowPassword,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, isSubmitting, getFieldProps }) => (
        <Form className="space-y-6">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                error={!!(errors.email && touched.email)}
                {...getFieldProps("email")}
              />
              {errors.email && touched.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  error={!!(errors.password && touched.password)}
                  {...getFieldProps("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <Eye className="h-5 w-5 text-gray-400" />
                    ) : (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                      )}
                </button>
              </div>
              {errors.password && touched.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="rememberMe"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                {...getFieldProps("rememberMe")}
              />
              <label
                htmlFor="rememberMe"
                className="ml-2 block text-sm text-gray-700"
              >
                Remember Me
              </label>
            </div>
            <Link
              to="/reset-password"
              className="text-sm text-indigo-600 hover:text-indigo-500"
            >
              Forgot Password?
            </Link>
          </div>

          <Button type="submit" fullWidth isLoading={isSubmitting || isLoading}>
            {isSubmitting || isLoading ? "Signing in..." : "Login"}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
