// SSOT 1 — State Machine (executable) — Foodbridge Module Retails — v0
// This file must stay in lockstep with state-machine.v0.md.
// Consumed by: development/frontend/src/controllers, development/backend/src/services

import { setup } from "xstate";

export const foodbridgeModuleRetailsMachine = setup({
  types: {} as {
    context: Record<string, unknown>;
    events: { type: "EVENT_NAME"; payload?: Record<string, unknown> };
  },
  actions: {
    actionName: () => {
      // describe side effect
    },
  },
}).createMachine({
  id: "foodbridge-module-retails",
  initial: "idle",
  context: {},
  states: {
    idle: {
      on: {
        EVENT_NAME: {
          target: "next_state",
          actions: "actionName",
        },
      },
    },
    next_state: {
      type: "final",
    },
  },
});
