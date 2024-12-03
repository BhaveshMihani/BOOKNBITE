// import React, { useEffect, useState } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const AdminLogin = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const win = window.sessionStorage;

//   const handleLogin = (e) => {
//     e.preventDefault();
//     win.clear()
//     setUsername('')
//     setPassword('')
//     if (username === "Admin" && password === "Admin") {
//       toast.success("Login Successfull", {
//         position: "top-center",
//         autoClose: 3000,
//       });
//     } else {
//       toast.error("Invalid Username or Password", {
//         position: "top-center",
//         autoClose: 3000,
//       });
//     }
//   };

//   useEffect(()=>{
//     if(win.getItem('username'))
//         setUsername(win.getItem('username'))
//     if(win.getItem('password'))
//         setUsername(win.getItem('password'))
//   },[])

//   useEffect(()=>{
//     win.setItem('username',username)
//     win.setItem('password',password)
//   },[username,password])

//   return (
//     <>
//       <div className="login-container">
//         <div className="login-box">
//           <form onSubmit={handleLogin}>
//             <h2>Login</h2>
//             <input
//               type="text"
//               placeholder="Username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <button type="submit">Login</button>
//           </form>
//         </div>
//         <ToastContainer />
//       </div>
//     </>
//   );
// };

// export default AdminLogin;
