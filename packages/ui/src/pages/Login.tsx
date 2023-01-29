import { FC } from 'react';
import { useLogin } from '@hooks';
import { ErrorMessage, Field, Form, Formik } from 'formik';

interface FormData {
  username: string;
  password: string;
}

export const Login: FC = () => {
  const { isLoading, login } = useLogin();

  const validate = (values: FormData) => {
    const errors: Partial<FormData> = {};
    if (!values.username) {
      errors.username = 'Required';
    }
    if (!values.password) {
      errors.password = 'Required';
    }

    return errors;
  };

  return (
    <section className="h-full gradient-form bg-gray-200 md:h-screen">
      <div className="container py-12 px-6 h-full">
        <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
          <div className="xl:w-5/12">
            <div className="block bg-white shadow-lg rounded-lg">
              <div className="md:p-12 md:mx-6">
                <div className="text-center">
                  <h4 className="text-xl font-semibold mt-1 mb-12 pb-1">
                    Rock my Loadout
                  </h4>
                </div>
                <Formik
                  initialValues={{ username: '', password: '' }}
                  validate={validate}
                  onSubmit={login}
                >
                  {() => (
                    <Form>
                      <p className="mb-4">Please login to your account</p>
                      <div className="mb-4">
                        <Field
                          id="username"
                          name="username"
                          type="text"
                          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          placeholder="Username"
                        />
                        <ErrorMessage name="username" component="div" />
                      </div>
                      <div className="mb-4">
                        <Field
                          id="password"
                          name="password"
                          type="password"
                          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          placeholder="Password"
                        />
                        <ErrorMessage name="password" component="div" />
                      </div>
                      <div className="text-center pt-1 mb-12 pb-1">
                        <button
                          className="inline-block px-6 py-2.5 bg-blue-600 font-medium text-xs leading-tight uppercase rounded shadow-md text-white hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                          type="submit"
                          data-mdb-ripple="true"
                          data-mdb-ripple-color="light"
                          disabled={isLoading}
                        >
                          Log in
                        </button>
                        <a className="text-gray-500" href="#!">
                          Forgot password?
                        </a>
                      </div>
                      <div className="flex items-center justify-between pb-6">
                        <p className="mb-0 mr-2">Don't have an account?</p>
                        <button
                          type="button"
                          className="inline-block px-6 py-2 border-2 border-red-600 text-red-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                          data-mdb-ripple="true"
                          data-mdb-ripple-color="light"
                        >
                          Create an Account
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
