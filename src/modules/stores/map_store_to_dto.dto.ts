import { Store } from './store.entity';
import { StoreDto } from './store.dto';
import { UserEntity } from '../users/user.entity';

export function mapStoreToDto(store: Store, users: UserEntity[]): any {
  return {
    id: store.id,
    name: store.name,
    phone: store.phone,
    email: store.email,
    address: store.address,
    created_at: store.created_at,
    updated_at: store.updated_at,
    users: users.map(user => ({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      phone: user.phone,
      email: user.email,
      store_id: user.store_id,
      rank: user.rank,
      created_at: user.created_at,
      updated_at: user.updated_at,
    })),
  };
}
