const CardService = require("../services/card-service");
const Card = require("../domain/card");
const CardRepository = require("../repository/card-repository");
const Activity = require("../domain/activity");
const ActivityRepository = require("../repository/activity-repository");
const db = require("../db");

async function getAllCards(req, res, next) {
  try {
    const cardRepositoryInstance = new CardRepository(Card, db);
    const cardServiceInstance = new CardService(cardRepositoryInstance);

    const fetchedCards = await cardServiceInstance.fetchAllCards();

    res.status(200).send(fetchedCards);
  } catch (err) {
    next(err);
  }
}

async function getOneCard(req, res, next) {
  try {
    const cardRepositoryInstance = new CardRepository(Card, db);
    const cardServiceInstance = new CardService(cardRepositoryInstance);

    const fetchedCard = await cardServiceInstance.fetchOneCard(req.params.id);

    res.status(200).send(fetchedCard);
  } catch (err) {
    next(err);
  }
}

async function getLatestCardId(req, res, next) {
  try {
    const cardRepositoryInstance = new CardRepository(Card, db);
    const cardServiceInstance = new CardService(cardRepositoryInstance);

    const latestId = await cardServiceInstance.getLatestId();
    res.status(200).json({ latestId: latestId });
  } catch (err) {
    next(err);
  }
}

async function createCard(req, res, next) {
  try {
    const card = new Card(req.body);
    const cardRepositoryInstance = new CardRepository(Card, db);
    const activityRepositoryInstance = new ActivityRepository(Activity, db);
    const cardServiceInstance = new CardService(
      cardRepositoryInstance,
      activityRepositoryInstance
    );

    await cardServiceInstance.createCard(card);

    res.status(201).json({ message: "succefully created new card" });
  } catch (err) {
    next(err);
  }
}

async function updateCard(req, res, next) {
  try {
    const cardRepositoryInstance = new CardRepository(Card, db);
    const activityRepositoryInstance = new ActivityRepository(Activity, db);
    const cardServiceInstance = new CardService(
      cardRepositoryInstance,
      activityRepositoryInstance
    );

    if (!req.body.content) {
      next(new Error("Bad request"));
      return;
    }

    const card = new Card(req.body);
    await cardServiceInstance.updateCardContent(req.params.id, card);

    res.status(200).json({ message: "succefully update card" });
  } catch (err) {
    next(err);
  }
}

async function deleteOneCard(req, res, next) {
  try {
    const cardRepositoryInstance = new CardRepository(Card, db);
    const activityRepositoryInstance = new ActivityRepository(Activity, db);
    const cardServiceInstance = new CardService(
      cardRepositoryInstance,
      activityRepositoryInstance
    );

    await cardServiceInstance.removeCard(req.params.id);

    res.status(200).json({ message: "succefully deleted card" });
  } catch (err) {
    next(err);
  }
}

async function moveCard(req, res, next) {
  try {
    const cardRepositoryInstance = new CardRepository(Card, db);
    const activityRepositoryInstance = new ActivityRepository(Activity, db);
    const cardServiceInstance = new CardService(
      cardRepositoryInstance,
      activityRepositoryInstance
    );

    if (!req.body.data) {
      next(new Error("Bad request"));
      return;
    }

    await cardServiceInstance.moveCard(req.params.id, req.body.data);

    res.status(203).json({ message: "card moved!" });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllCards,
  createCard,
  getOneCard,
  getLatestCardId,
  updateCard,
  deleteOneCard,
  moveCard,
};
