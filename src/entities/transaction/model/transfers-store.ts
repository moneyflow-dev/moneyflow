import { DateTime } from "luxon";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { transfersApi } from "@shared/api/transfers-api";

import {
  CreateTransfer,
  Transfer,
  TransferID,
  Transfers,
  UpdateTransfer,
} from "./models";

interface TransfersStoreState {
  transfers: Transfers;
  fetchTransfers(): Promise<void>;
  getTransfer(id: TransferID): Transfer;
  createTransfer(transfer: CreateTransfer): Promise<void>;
  updateTransfer(id: TransferID, transfer: UpdateTransfer): Promise<void>;
  deleteTransfer(id: TransferID): Promise<void>;
  deleteTransfersByAccounts(accountIds: string[]): Promise<void>;
}

export const useTransfersStore = create<TransfersStoreState>()(
  devtools((set, get) => ({
    transfers: {},
    async fetchTransfers() {
      const transfers = await transfersApi.getTransfers();
      const formattedTransfers = Object.fromEntries(
        Object.entries(transfers).map(([transferId, transfer]) => [
          transferId,
          {
            ...transfer,
            datetime: DateTime.fromMillis(transfer.datetime),
            createdAt: DateTime.fromMillis(transfer.createdAt),
          },
        ]),
      );
      set({ transfers: formattedTransfers });
    },
    getTransfer(id) {
      return get().transfers[id];
    },
    async createTransfer(transfer) {
      const createdTransfer = await transfersApi.createTransfer({
        ...transfer,
        datetime: transfer.datetime.toMillis(),
      });
      set((state) => ({
        transfers: {
          ...state.transfers,
          [createdTransfer.id]: {
            ...createdTransfer,
            createdAt: transfer.datetime,
            datetime: transfer.datetime,
          },
        },
      }));
    },
    async updateTransfer(id, transfer) {
      const updatedTransfer = await transfersApi.updateTransfer(id, {
        ...transfer,
        datetime: transfer.datetime.toMillis(),
      });
      set((state) => ({
        transfers: {
          ...state.transfers,
          [id]: {
            ...updatedTransfer,
            datetime: transfer.datetime,
            createdAt: DateTime.fromMillis(updatedTransfer.createdAt),
          },
        },
      }));
    },
    async deleteTransfer(id) {
      await transfersApi.deleteTransfer(id);
      set((state) => ({
        transfers: Object.fromEntries(
          Object.entries(state.transfers).filter(
            ([transferId]) => transferId !== id,
          ),
        ),
      }));
    },
    async deleteTransfersByAccounts(accountIds) {
      await transfersApi.deleteTransfersByAccounts(accountIds);
      set((state) => ({
        transfers: Object.fromEntries(
          Object.entries(state.transfers).filter(
            ([_, transfer]) =>
              !accountIds.includes(transfer.fromAccount.accountId) &&
              !accountIds.includes(transfer.toAccount.accountId),
          ),
        ),
      }));
    },
  })),
);
