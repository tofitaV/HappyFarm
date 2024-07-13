import {useTonWallet, useIsConnectionRestored, useTonConnectUI} from "@tonconnect/ui-react";
import {useState} from "react";

export const SendTx = () => {
    const isConnectionRestored = useIsConnectionRestored();
    const wallet = useTonWallet();
    const [tonConnectUI] = useTonConnectUI();
    const [txInProgress, setTxInProgress] = useState(false);


    let content: string;
    switch (true) {
        case !isConnectionRestored:
            content = 'Loading...';
            break;
        case txInProgress:
            content = 'Tx in progress';
            break;
        case !!wallet:
            content = 'Send transaction';
            break;
        default:
        case !wallet:
            content = 'Connect Wallet';
            break;
    }

    const onClick = async () => {
        if (!wallet) {
            tonConnectUI.openModal();
        } else {
            setTxInProgress(true)
            try {
                var res = await tonConnectUI.sendTransaction({
                    validUntil: Math.floor(Date.now() / 1000) + 360,
                    messages: [
                        {
                            amount: '1000000',
                            address: '0:07e85dfff3bbe1513595c74d06393373561628ff0bc981d21cae310c8645e095'
                        }
                    ]
                });
                //send boc to back-end and check the result
                if(true){

                }
            } catch (e) {
                console.log(e);
            }

            setTxInProgress(false)
        }
    }

    return <button style={{ marginBottom: '20px' }} disabled={!isConnectionRestored || txInProgress} onClick={onClick}>
        {content}
    </button>
}