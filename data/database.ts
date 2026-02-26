import { open } from '@op-engineering/op-sqlite';

// OP-SQLite will look for this in the user's document directory by default
// For a bundled DB in assets, you would typically use {name: 'ifct2017.db', location: 'Assets'}
// but 'location' prop varies depending on library version. We will rely on default for now,
// or use Expo FileSystem to copy it if needed.
export const db = open({ name: 'ifct2017.db' });
