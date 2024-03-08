import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

//conection
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

dotenv.config();

type Delivery = {
  name: string;
  food: string;
}
const app = express();
app.use(cors());  
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/all-delivers', async (req: Request, res: Response) => {
  try {
    const allDelivers = await prisma.delivers.findMany();
    res.json(allDelivers);
    
  } catch (error) {
    console.error('Error fetching all delivers:', error);
    res.status(500).send('Internal Server Error');
  }
});


app.post('/add-delivery', async (req: Request<{}, {}, Delivery>, res: Response) => {
  const { name, food } = req.body;

  try {
    const newDelivery = await prisma.delivers.create({
      data: {
        name,
        food,
      },
    });

    res.send('Delivery added :)');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

const PORT: number = parseInt(process.env.PORT || '5000', 10);
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
