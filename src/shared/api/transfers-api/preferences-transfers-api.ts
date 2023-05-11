import { Preferences } from "@capacitor/preferences";
import { v4 as uuidv4 } from "uuid";

import { CreateTransferDTO, TransferDTO, TransfersDTO } from "./dtos";
import { TransfersAPI } from "./transfers-api.interface";

export class PreferencesTransfersAPI implements TransfersAPI {
  private async getState(): Promise<TransfersDTO> {
    const { value } = await Preferences.get({ key: "transfers" });
    if (value === null) {
      const state: TransfersDTO = {};
      await this.setState(state);
      return state;
    }
    return JSON.parse(value);
  }

  private async setState(state: TransfersDTO) {
    await Preferences.set({
      key: "transfers",
      value: JSON.stringify(state),
    });
  }

  async getTransfers() {
    return await this.getState();
  }

  async createTransfer(transfer: CreateTransferDTO) {
    const transfers = await this.getState();

    const id = uuidv4();
    const createdTransfer: TransferDTO = {
      ...transfer,
      id,
      createdAt: Date.now(),
    };

    transfers[id] = createdTransfer;

    await this.setState(transfers);
    return createdTransfer;
  }

  async updateTransfer(id: string, transfer: CreateTransferDTO) {
    const transfers = await this.getState();

    transfers[id] = { ...transfers[id], ...transfer, id };

    await this.setState(transfers);
    return transfers[id];
  }

  async deleteTransfer(id: string): Promise<void> {
    const transfers = await this.getState();

    delete transfers[id];

    await this.setState(transfers);
  }

  async deleteTransfersByAccounts(accountIds: string[]) {
    const transfers = await this.getState();

    await this.setState(
      Object.fromEntries(
        Object.entries(transfers).filter(
          ([_, transfer]) =>
            !accountIds.includes(transfer.fromAccount.accountId) &&
            !accountIds.includes(transfer.toAccount.accountId),
        ),
      ),
    );
  }
}
