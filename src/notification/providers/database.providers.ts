import * as mongoose from 'mongoose';
import { DB_URI } from 'src/utils';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> => mongoose.connect(DB_URI),
  },
];
