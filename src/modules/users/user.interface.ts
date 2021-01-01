import { UserRole } from './user.entity';

export interface User {
  id: string;
  firstName: string;
  role: UserRole;
}
