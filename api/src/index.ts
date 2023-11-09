import express from "express";

const app = express();

app.use(express.json());

const PORT = Number(process.env.PORT) || 4000;

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen({ port: PORT }, () => {
  console.log(`🚀 Server ready at http://localhost:4000`);
});


