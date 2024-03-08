import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Pool, QueryResult } from 'pg';

dotenv.config();

type Delivery = {
  name: string;
  food: string;
}
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//CONECTION
const pool = new Pool({
  connectionString: process.env.POSTGRES_DATABASE_URL
});

pool.connect()
  .then(() => {
    console.log("PostgreSQL connected!");
  })
  .catch(err => {
    console.error(err.message);
  });

app.get('/all-delivers', async (req: Request, res: Response) => {
  try {
    const result: QueryResult<Delivery> = await pool.query('SELECT * FROM delivers;');
    const deliveries: Delivery[] = result.rows;
    res.json(deliveries);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/add-delivery', async (req: Request<{}, {}, Delivery>, res: Response) => {
  const { name, food } = req.body;

  try {
    await pool.query('INSERT INTO delivers (name, food) VALUES ($1, $2)', [name, food]);
    res.send('Delivery added...');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

const PORT: number = parseInt(process.env.PORT || '5000', 10);
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
