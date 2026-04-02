import visaProcessingData from "./visa-processing-data.json";
import { VisaProcessingView } from "./VisaProcessingView";

export const VisaProcessingScreen = () => {
    return (
        <VisaProcessingView
            visaProcessingData={visaProcessingData}
            visaProcessingDataLength={visaProcessingData.length}
        />
    );
}