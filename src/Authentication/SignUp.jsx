import React from "react";
import {
  FaGoogle,
  FaFacebookF,
  FaUser,
  FaEnvelope,
  FaLock,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { Formik, Form, Field, ErrorMessage } from "formik";

const SignUp = () => {
  const navigate = useNavigate();

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("الاسم الأول مطلوب"),
    lastName: Yup.string().required("الاسم الأخير مطلوب"),
    email: Yup.string()
      .email("يرجى إدخال بريد إلكتروني صحيح")
      .required("البريد الإلكتروني مطلوب"),
    password: Yup.string()
      .min(8, "كلمة المرور يجب ألا تقل عن 8 أحرف")
      .required("كلمة المرور مطلوبة"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const auth = getAuth();
  try {
  const userCredential = await createUserWithEmailAndPassword(auth , values.email , values.password);

      await updateProfile(auth.currentUser, {
        displayName: values.firstName + " " + values.lastName,
      });

      await Swal.fire({
        icon: "success",
        title: "تم إنشاء الحساب بنجاح",
        confirmButtonText: "موافق",
      });

      resetForm();
      navigate("/signin");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        Swal.fire({
          icon: "error",
          title: "البريد الإلكتروني مستخدم بالفعل",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "حدث خطأ",
          text: error.message,
        });
      }
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md md:max-w-lg lg:max-w-xl rounded-2xl shadow-xl p-6 md:p-10">
        <div className="text-center mb-4 md:mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Create your account</h2>
          <p className="text-sm text-gray-500 mt-2">
            Already have an account?{" "}
            <Link to="/signin" className="text-purple-600 font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>

      
        <div className="flex items-center gap-2 mb-5">
          <div className="flex-grow h-px bg-gray-300" />
          <span className="text-xs text-gray-400">Or register with email</span>
          <div className="flex-grow h-px bg-gray-300" />
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-3 text-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="relative">
                  <FaUser className="absolute left-3 top-3 text-gray-400" />
                  <Field
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage name="firstName" component="div" className="text-red-500 text-xs mt-1" />
                </div>
                <div className="relative">
                  <FaUser className="absolute left-3 top-3 text-gray-400" />
                  <Field
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage name="lastName" component="div" className="text-red-500 text-xs mt-1" />
                </div>
              </div>

              <div className="relative">
                <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                <Field
                  type="email"
                  name="email"
                  placeholder="Email address"
                  className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              <div className="relative">
                <FaLock className="absolute left-3 top-3 text-gray-400" />
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition mt-2"
              >
                {isSubmitting ? "Creating..." : "Create Account"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignUp;
