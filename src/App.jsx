import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Verify from './components/Verify'
import SignIn from './components/SignIn'
import SetupInformation from './components/SetupInformation'
import AvtAndInformation from './components/avtAndInformation'
import PostInProfile from './components/postInProfile'
import CreatePost from  './components/createPost'
import QnA from './components/QnA'
import WriteComment from './components/writeComment'
import Footer from './components/Footer'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { publicRoutes } from './RoutesFE'

function App() {  
  return (
    <Router>
      <Routes>
        {publicRoutes.map((route, index) => {
          const Page = route.component
          return <Route key={index} path={route.path} element={<Page />} />;
        })}
      </Routes>
    </Router>
  );
}


export default App
    






// writeComment run test
// const App = () => {
//   const handleSubmit = (comment) => {
//     console.log('Dữ liệu gửi:', comment);
//     alert(`Bình luận của bạn: ${comment}`);
//   };

//   return (
//     <div>
//       <h1>Viết bình luận</h1>
//       <WriteComment
//         placeholder="Nhập bình luận của bạn..."
//         onSubmit={handleSubmit}
//         avatarUrl="img_profile/avt.png" // Đường dẫn ảnh avatar
//       />
//     </div>
//   );
// };
// export default App;