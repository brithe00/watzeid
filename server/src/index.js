import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import { protect } from './middleware/auth.js';
import { login, register } from './handlers/user.js';
import router from './router/router.js';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.status(200);
	res.json({ message: 'watzeid - API v1' });
});

app.use('/api', protect, router);
app.post('/register', register);
app.post('/login', login);

app.listen(process.env.PORT, () => {
	console.log(`server on http://localhost:${process.env.PORT}`);
});

// app.use((err, req, res, next) => {
// 	if (err.type === 'auth') {
// 		res.status(401).json({ message: 'Not authorized!' });
// 	} else if (err.type === 'input') {
// 		res.status(400).json({ message: 'Invalid informations!' });
// 	} else {
// 		res
// 			.status(500)
// 			.json({ message: 'Our fault, the server is probably burning ! :/' });
// 	}
// });

export default app;
