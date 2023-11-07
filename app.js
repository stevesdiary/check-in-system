const express = require('express');
const port = process.env.PORT || 5003
const { sequelize } = require('./models');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const signupRoute = require('./routes/Register');
const visitorRoute = require('./routes/Visitor');
const deviceRoute = require('./routes/Device');
const adminRoute = require('./routes/Admin');
const loginRoute = require('./routes/Login');
const registerRoute = require('./routes/Register');
const createVisitorRoute = require('./routes/createVisitor');
const currentVisitorRoute = require('./routes/currentVisitor');
const visitorHistoryRoute = require('./routes/visitorHistory');
const checkOutRoute = require('./routes/checkOut');
const photoRoute = require('./routes/photo');

const bodyParser = require('body-parser');
const resetPasswordRoute = require('./routes/resetPassword');
const forgotPasswordRoute = require('./routes/forgotPassword');
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true, parameterLimit: 10000 }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.set('view engine', 'ejs');

app.on('error', (err)=> console.log('Error:', err))

app.use('/admin', adminRoute);
app.use('/signup', signupRoute);
app.use('/visitor', visitorRoute);
app.use('/device', deviceRoute);
app.use('/login', loginRoute);
app.use('/register', registerRoute);
app.use('/forgotPassword', forgotPasswordRoute);
app.use('/resetPassword', resetPasswordRoute);
app.use('/createvisitor', createVisitorRoute);
app.use('/currentvisitor', currentVisitorRoute);
app.use('/visitorhistory', visitorHistoryRoute);
app.use('/checkOut', checkOutRoute);
app.use('/photo', photoRoute);


app.listen({port}, async() => {
   console.log('Server started on port ' + port);
   await sequelize.authenticate()
   console.log('Database connected!')});
