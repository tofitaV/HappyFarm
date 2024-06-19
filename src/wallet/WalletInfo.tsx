import {useTonWallet} from '@tonconnect/ui-react';

export const WalletInfo = () => {
    const wallet = useTonWallet();

    if (!wallet) {
        return null;
    }

    return <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
        { "Platform: "+wallet.device.platform }
    </div>
}