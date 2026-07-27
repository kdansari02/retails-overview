// Repo Contract (outbound port) — Foodbridge Module Retails — v0
// Versioned. The persistence interface the service layer depends on. Derived from
// SSOT-2 (Domain Model). Ratified and mock-backed BEFORE the service or the real
// repo is implemented, so the service builds against it while the persistence
// adapter is still unwritten (SPEC §8 — backend layer contracts). Storage-agnostic.

import type { EntityName } from "@foodbridge-module-retails/ssot/domain-model";

export type EntityNameCreateInput = Omit<EntityName, "id">;

export interface EntityNameRepoContract {
  findAll(): Promise<EntityName[]>;
  findById(id: string): Promise<EntityName | null>;
  create(input: EntityNameCreateInput): Promise<EntityName>;
}
