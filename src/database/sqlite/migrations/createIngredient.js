
const createIngredient= `
CREATE TABLE IF NOT EXISTS ingredients (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  plate_id INTEGER REFERENCES plates(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id),
  name TEXT
);
`;

module.exports = createIngredient;