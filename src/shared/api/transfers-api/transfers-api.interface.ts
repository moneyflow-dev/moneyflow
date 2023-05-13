import { AccountID } from "../accounts-api/dtos";

import {
  CreateTransferDTO,
  TransferDTO,
  TransferID,
  TransfersDTO,
  UpdateTransferDTO,
} from "./dtos";

export interface TransfersAPI {
  getTransfers(): Promise<TransfersDTO>;
  setTransfers(transfers: TransfersDTO): Promise<void>;
  createTransfer(transfer: CreateTransferDTO): Promise<TransferDTO>;
  updateTransfer(
    id: TransferID,
    transfer: UpdateTransferDTO,
  ): Promise<TransferDTO>;
  deleteTransfer(id: TransferID): Promise<void>;
  deleteTransfersByAccounts(accountIds: AccountID[]): Promise<void>;
}
