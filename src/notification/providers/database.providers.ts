import * as mongoose from 'mongoose';
import { DB_URI } from '../../utils';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> => mongoose.connect(DB_URI),
  },
];
