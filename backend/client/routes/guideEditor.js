const express = require("express");
const router = express.Router();

const db = require("../../db/db");
const logger = require("../../logger");
const WSMessage = require("../classes/WSMessage");
const handleMessage = require("../guideEditor/handleMessage");

router.get("/:id", async (req, res) => {
	// Get guide
	const guide = await db.guides.get(req.params.id);
	if (guide == null) {
		return res.sendStatus(404);
	}

	// Render
	res.render("guideEditor", {
		title: `${guide.title} | Studypedia`,
		guide,
		resourceName: "guideEditor",
	});
});

router.ws("/:id", (ws, req) => {
	logger.debug(`User ${req.userId} connected to guide ${req.params.id} via websockets`);

	const pingInterval = setInterval(() => {
		logger.trace("Sending ping");
		ws.send(WSMessage.ping());
	}, 1000 * 60 /* about 1 minute (in milliseconds) */);

	ws.on("message", msg => {
		try {
			msg = JSON.parse(msg);
		} catch (e) {
			ws.send(WSMessage.error("Invalid message format. Message must be JSON.", msg));
			logger.debug("Invalid message format for websocket message:", msg);
		}

		if (msg.type == null) ws.send(WSMessage.error("Message type not specified", msg));

		handleMessage(msg, ws);
	});

	ws.on("close", () => {
		logger.info(`Websocket editor disconnected from guide ${req.params.id}`);

		clearInterval(pingInterval);
	});
});

module.exports = router;
