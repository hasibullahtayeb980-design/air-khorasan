import commissions from "./commissions.json";
import { CommissionsView } from "./CommissionsView";

export const CommissionsScreen = () => {
    return (
        <CommissionsView
            commissions={commissions}
            commissionsLength={commissions.length}
        />
    );
};