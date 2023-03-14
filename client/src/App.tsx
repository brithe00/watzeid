import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Main from './screens/Main';
import Register from './screens/Register';
import Login from './screens/Login';
import Profile from './screens/Profile';
import Followers from './screens/Followers';
import Following from './screens/Following';
import Informations from './screens/Informations';
import Users from './screens/Users';
import Comments from './screens/Comments';
import CreatePost from './screens/CreatePost';

const App = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Layout children={<Main />} />} />
				<Route path="/new" element={<CreatePost />} />
				<Route path="/users" element={<Users />} />
				<Route path="/:username" element={<Profile />} />
				<Route path="/:username/followers" element={<Followers />} />
				<Route path="/:username/following" element={<Following />} />
				<Route path="/profile" element={<Informations />} />
				<Route path="/comments" element={<Comments />} />
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
			</Routes>
		</Router>
	);
};

export default App;
