import tap from "tap";
import { GAME_ENDED, GAME_STAGE_ENTERED, GAME_STARTED } from "./game-progress";
import validateGameFlow from "./validate-game-flow";

tap.test("validate game flow", async (outerTest) => {
  outerTest.context.gameConcept = {
    gameFlow: [],
    phases: [],
  };

  outerTest.test(
    "should not allow duplicated GAME_STARTED event",
    async (innerTest) => {
      validateGameFlow(
        innerTest.context.gameConcept,
        [{ gameId: "", playerId: "", teamId: "", eventType: GAME_STARTED }],
        [],
        { gameId: "", playerId: "", teamId: "", eventType: GAME_STARTED },
        (message) => {
          innerTest.equal(message, "Duplicated GAME_STARTED event");
        }
      );

      innerTest.end();
    }
  );

  outerTest.test(
    'should not allow "GAME_STAGE_ENTERED" event before "GAME_STARTED"',
    async (innerTest) => {
      validateGameFlow(
        innerTest.context.gameConcept,
        [],
        [],
        {
          gameId: "",
          playerId: "",
          teamId: "",
          step: "",
          stage: "",
          eventType: GAME_STAGE_ENTERED,
        },
        (message) => {
          innerTest.equal(message, "GAME_STARTED event is missing");
        }
      );

      validateGameFlow(
        innerTest.context.gameConcept,
        [],
        [],
        {
          gameId: "",
          playerId: "",
          teamId: "",
          cleared: false,
          eventType: GAME_ENDED,
        },
        (message) => {
          innerTest.equal(message, "GAME_STARTED event is missing");
        }
      );

      innerTest.end();
    }
  );

  outerTest.test("should not allow events out of order", async (innerTest) => {
    validateGameFlow(
      innerTest.context.gameConcept,
      [{ gameId: "", playerId: "", teamId: "", eventType: GAME_STARTED }],
      [
        { step: "step1", stage: "stage1" },
        { step: "step2", stage: "stage1" },
      ],
      {
        gameId: "",
        playerId: "",
        teamId: "",
        step: "step2",
        stage: "stage1",
        eventType: GAME_STAGE_ENTERED,
      },
      (message) => {
        innerTest.equal(
          message,
          "Events out of order: expected step1/stage1, got step2/stage1"
        );
      }
    );

    innerTest.end();
  });

  outerTest.test("should not allow events out of order", async (innerTest) => {
    validateGameFlow(
      innerTest.context.gameConcept,
      [
        { gameId: "", playerId: "", teamId: "", eventType: GAME_STARTED },
        {
          gameId: "",
          playerId: "",
          teamId: "",
          step: "step1",
          stage: "stage1",
          eventType: GAME_STAGE_ENTERED,
        },
      ],
      [
        { step: "step1", stage: "stage1" },
        { step: "step1", stage: "stage2" },
        { step: "step2", stage: "stage1" },
      ],
      {
        gameId: "",
        playerId: "",
        teamId: "",
        step: "step2",
        stage: "stage1",
        eventType: GAME_STAGE_ENTERED,
      },
      (message) => {
        innerTest.equal(
          message,
          "Events out of order: expected step1/stage2, got step2/stage1"
        );
      }
    );

    innerTest.end();
  });

  outerTest.test(
    "should not allow duplicated GAME_ENDED event",
    async (innerTest) => {
      validateGameFlow(
        innerTest.context.gameConcept,
        [
          { gameId: "", playerId: "", teamId: "", eventType: GAME_STARTED },
          {
            gameId: "",
            playerId: "",
            teamId: "",
            step: "step1",
            stage: "stage1",
            eventType: GAME_STAGE_ENTERED,
          },
          {
            gameId: "",
            playerId: "",
            teamId: "",
            eventType: GAME_ENDED,
            cleared: false,
          },
        ],
        [
          { step: "step1", stage: "stage1" },
          { step: "step1", stage: "stage2" },
          { step: "step2", stage: "stage1" },
        ],
        {
          gameId: "",
          playerId: "",
          teamId: "",
          eventType: GAME_ENDED,
          cleared: false,
        },
        (message) => {
          innerTest.equal(message, "Duplicated GAME_ENDED event");
        }
      );

      innerTest.end();
    }
  );

  outerTest.test(
    "should not allow GAME_ENDED (cleared: true) event if game flow is not completed",
    async (innerTest) => {
      validateGameFlow(
        innerTest.context.gameConcept,
        [
          { gameId: "", playerId: "", teamId: "", eventType: GAME_STARTED },
          {
            gameId: "",
            playerId: "",
            teamId: "",
            step: "step1",
            stage: "stage1",
            eventType: GAME_STAGE_ENTERED,
          },
        ],
        [
          { step: "step1", stage: "stage1" },
          { step: "step1", stage: "stage2" },
          { step: "step2", stage: "stage1" },
        ],
        {
          gameId: "",
          playerId: "",
          teamId: "",
          eventType: GAME_ENDED,
          cleared: true,
        },
        (message) => {
          innerTest.equal(
            message,
            "Missing event: GAME_STAGE_ENTERED with step: step1 and stage: stage2!"
          );
        }
      );

      innerTest.end();
    }
  );

  outerTest.end();
});
