const app = require('./app');
const config = require('./config');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
