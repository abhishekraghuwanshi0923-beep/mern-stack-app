const express = require('express');
const { exec } = require('child_process');
const app = express();
const swaggerUi = require('swagger-ui-express');
const { swaggerSpec } = require('./swagger');

app.use(express.json());

const routes = require('./routes');

app.use('/api', routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    const url = `http://localhost:${PORT}/api-docs`;
    console.log(`Server running on port ${PORT}`);
    console.log(`Swagger docs available at ${url}`);

    if (process.env.OPEN_API_DOCS === 'true') {
      const command = process.platform === 'win32'
        ? `start "" "${url}"`
        : process.platform === 'darwin'
          ? `open "${url}"`
          : `xdg-open "${url}"`;

      exec(command, err => {
        if (err) console.error('Unable to open browser:', err.message);
      });
    }
  });
}