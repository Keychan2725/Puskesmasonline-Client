import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export default function Login() {
  const [passwordType, setPasswordType] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();

    try {
      const { data, status } = await axios.post(
        "http://localhost:8080/api/login",
        {
          email: email,
          password: password,
        }
      );

      if (data.data.data.codeVer !== "") {
        if (data.data.data.role === "admin") {
          localStorage.setItem("token", data.data.token);
          localStorage.setItem("role", data.data.data.role);
          localStorage.setItem("userId", data.data.data.id);

          if (status === "Diterima") {
            Swal.fire({
              icon: "success",
              title: "Berhasil masuk",
            });
            window.location.href = "/dashboard-admin";
          } else {
            Swal.fire({
              icon: "success",
              title: "Berhasil masuk",
            });
            window.location.href = "/dashboard-admin";
          }
        } else if (data.data.data.role === "user") {
          localStorage.setItem("token", data.data.token);
          localStorage.setItem("role", data.data.data.role);
          localStorage.setItem("userId", data.data.data.id);
          Swal.fire({
            icon: "success",
            title: "Berhasil masuk",
          });
          window.location.href = "/dashboard-user";
        } else if (data.data.data.role === "super_admin") {
          localStorage.setItem("token", data.data.token);
          localStorage.setItem("role", data.data.data.role);
          localStorage.setItem("userId", data.data.data.id);
          Swal.fire({
            icon: "success",
            title: "Berhasil masuk",
          });
          window.location.href = "/dashboard-super-admin";
        } else {
          Swal.fire({
            icon: "error",
            title: "Akun Anda Belum Terdaftar",
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Akun Anda Belum Terverifikasi",
        });
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title:
          "Email atau Password yang Anda masukan salah atau belum dikonfirmasi ",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(error);
    }
  };
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-32 w-auto"
            src={require("../../asset/logo.png")}
            alt="Pusline"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Login Pusline
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="" onSubmit={login}>
            <div>
              <label
                htmlFor="email"
                className="block float-left mb-1 text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="relative mt-2">
                <input
                  id="password"
                  name="password"
                  required
                  type={passwordType === "password" ? "password" : "text"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pr-10" // Menambahkan padding kanan untuk membuat ruang agar ikon mata dapat ditampilkan dengan baik
                />
                <span
                  onClick={togglePassword}
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                >
                  {passwordType === "password" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      className="bi bi-eye-slash"
                    >
                      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      className="bi bi-eye"
                    >
                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                    </svg>
                  )}
                </span>
              </div>
              <div className=" mt-3 mb-3 float-right text-sm">
                <a
                  href="#"
                  className="font-semibold text-rose-600 hover:text-rose-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-rose-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Masuk
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Belum Punya Akun?
            <a
              href="/register-user"
              className="mx-2 font-semibold leading-6 text-rose-600 hover:text-indigo-500"
            >
              Register
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
