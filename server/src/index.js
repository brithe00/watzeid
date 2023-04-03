import * as dotenv from 'dotenv';
dotenv.config();
import path from 'path';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import { protect } from './middleware/auth.js';
import router from './router/router.js';
import authRouter from './router/authRouter.js';

import { notFound, errorHandler } from '../src/middleware/error.js';

const app = express();

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRouter);
app.use('/api', protect, router);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '/client/build')));

	app.get('*', (req, res) =>
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	);
} else {
	app.get('/', (req, res) => {
		res.send('watzeid - API v1');
	});
}

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

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 8000;

app.listen(
	PORT,
	console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}.`)
);

export default app;
