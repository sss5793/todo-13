class CardRepository {
  constructor(cardDTO, db) {
    this.cardDTO = cardDTO;
    this.db = db;
  }

  async findAllCards() {
    // TODO edit query
    const [rows] = await this.db.query(
      "SELECT Cards.id, Users.username AS author,\
       Cards.last_updated, Cards.content, column_name AS category\
      FROM Cards \
      JOIN Users ON Cards.user_id = Users.id\
      JOIN Columns ON Cards.column_id = Columns.id");
      
    const cards = rows.map((row) => {
      return new this.cardDTO(row)
    });
    return cards;
  }

  async findCardById(id) {
    const query = "SELECT Cards.id, Users.username AS author,\
      Cards.last_updated, Cards.content, column_name AS category\
      FROM Cards \
      JOIN Users ON Cards.user_id = Users.id\
      JOIN Columns ON Cards.column_id = Columns.id WHERE Cards.id=? ";

    const [rows] = await this.db.query(query, [id]);
    const row = rows[0];
    const card = new this.cardDTO(row);

    return card;
  }

  async createCard(cardDTO) {
    const query =
    `INSERT INTO todo.Cards (user_id, content, column_id)\
    VALUES (\
      (SELECT id FROM Users WHERE username="${cardDTO.author}")\
      , ?, (SELECT id FROM Columns WHERE column_name="${cardDTO.category}"))`;

    try {
      await this.db.query(query, [cardDTO.content]);
    } catch (err) {
      throw err;
    }
  }

  async updateCardById(id, cardDTO) {
    // TODO: query update needed since db design is renewed
    const query =
      "UPDATE todo.Cards\
      SET\
        author= ?,\
        content= ?,\
        category= ?\
      WHERE id=? ;";

    const { author, content, category } = cardDTO;

    try {
      await this.db.query(query, [author, content, category, id]);
    } catch (err) {
      throw err;
    }
  }

  async removeCardById(id) {
    // TODO: query update needed since db design is renewed
    const query = "DELETE FROM todo.Cards WHERE id=? ";

    try {
      await this.db.query(query, [id]);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = CardRepository;