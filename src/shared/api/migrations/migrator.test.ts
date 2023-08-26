import { describe, expect, it } from "vitest";

import { Migration } from "./migration.interface";
import { Migrator } from "./migrator";

describe("migrations", () => {
  describe("migrations order", () => {
    it("with 4 migrations and current version 2", async () => {
      const order: number[] = [];
      const migrations: Record<number, Migration> = {
        1: {
          async run() {
            order.push(1);
          },
        },
        2: {
          async run() {
            order.push(2);
          },
        },
        3: {
          async run() {
            order.push(3);
          },
        },
        4: {
          async run() {
            order.push(4);
          },
        },
      };
      const migrator = new Migrator(migrations);
      await migrator.migrate(2);

      expect(order).toStrictEqual([3, 4]);
    });

    it("with 4 migrations and current version 0", async () => {
      const order: number[] = [];
      const migrations: Record<number, Migration> = {
        1: {
          async run() {
            order.push(1);
          },
        },
        2: {
          async run() {
            order.push(2);
          },
        },
        3: {
          async run() {
            order.push(3);
          },
        },
        4: {
          async run() {
            order.push(4);
          },
        },
      };
      const migrator = new Migrator(migrations);
      await migrator.migrate(0);

      expect(order).toStrictEqual([1, 2, 3, 4]);
    });

    it("with 4 migrations and current version 1", async () => {
      const order: number[] = [];
      const migrations: Record<number, Migration> = {
        1: {
          async run() {
            order.push(1);
          },
        },
        2: {
          async run() {
            order.push(2);
          },
        },
        3: {
          async run() {
            order.push(3);
          },
        },
        4: {
          async run() {
            order.push(4);
          },
        },
      };
      const migrator = new Migrator(migrations);
      await migrator.migrate(1);

      expect(order).toStrictEqual([2, 3, 4]);
    });

    it("with 4 migrations and current version 4", async () => {
      const order: number[] = [];
      const migrations: Record<number, Migration> = {
        1: {
          async run() {
            order.push(1);
          },
        },
        2: {
          async run() {
            order.push(2);
          },
        },
        3: {
          async run() {
            order.push(3);
          },
        },
        4: {
          async run() {
            order.push(4);
          },
        },
      };
      const migrator = new Migrator(migrations);
      await migrator.migrate(4);

      expect(order).toStrictEqual([]);
    });

    it("with 4 migrations and current version exceeds max version", async () => {
      const order: number[] = [];
      const migrations: Record<number, Migration> = {
        1: {
          async run() {
            order.push(1);
          },
        },
        2: {
          async run() {
            order.push(2);
          },
        },
        3: {
          async run() {
            order.push(3);
          },
        },
        4: {
          async run() {
            order.push(4);
          },
        },
      };
      const migrator = new Migrator(migrations);
      await migrator.migrate(5);

      expect(order).toStrictEqual([]);
    });
  });
});
