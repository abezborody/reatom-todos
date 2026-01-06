export const homePage = () => `
  <html>
    <head>
      <title>Backend API</title>
      <style>
        body {
          font-family: system-ui, -apple-system, sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          margin: 0;
        }
        .container {
          text-align: center;
        }
        button {
          padding: 12px 24px;
          font-size: 16px;
          cursor: pointer;
          border: none;
          border-radius: 8px;
          background: #000;
          color: white;
        }
        button:hover {
          background: #333;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Hello from Backend</h1>
        <button onclick="window.location.href = '/openapi'">
          View API Documentation
        </button>
      </div>
    </body>
  </html>
`