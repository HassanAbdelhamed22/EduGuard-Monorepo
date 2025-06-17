import { Field, Form, Formik } from "formik";
import React from "react";
import { roleValidationSchema } from "../../utils/validation";
import Button from "../ui/Button";

const AssignRoleForm = ({ onSubmit, onCancel, initialRole }) => {
  return (
    <Formik
      initialValues={{ role: initialRole || "" }}
      validationSchema={roleValidationSchema}
      onSubmit={(values) => onSubmit(values.role)}
    >
      {({}) => (
        <Form>
          <div className="space-y-4">
            <label className="flex items-center gap-2">
              <Field type="radio" name="role" value="admin" />
              Admin
            </label>
            <label className="flex items-center gap-2">
              <Field type="radio" name="role" value="user" />
              User
            </label>
            <label className="flex items-center gap-2">
              <Field type="radio" name="role" value="professor" />
              Professor
            </label>
          </div>
          <div className="flex justify-end gap-2 mt-5">
            <Button variant="cancel" type="button" onClick={onCancel}>
                Cancel
            </Button>
            <Button variant="default" type="submit">
              Assign Role
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AssignRoleForm;
