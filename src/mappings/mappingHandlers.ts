import {SubstrateExtrinsic,SubstrateEvent,SubstrateBlock} from "@subql/types";
import {Transfer} from "../types";
import {Balance, AccountId} from "@polkadot/types/interfaces";


export async function handleTransfer(event: SubstrateEvent): Promise<void> {

    const record = new Transfer(`${event.block.block.header.number.toString()}-${event.idx}`)

    const {event: {data: [fromAccount, toAccount, amount]}} = event;

    record.from = (fromAccount as AccountId).toString();
    record.to = (toAccount as AccountId).toString();
    record.amount= (amount as Balance).toBigInt();

    await record.save();
}


