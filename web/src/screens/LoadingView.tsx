import { LoadingIndicator } from "@/components/application/loading-indicator/loading-indicator";

export const LoadingView = () => {
    return (
      <div className="dark-mode flex items-center justify-center h-screen">
        <LoadingIndicator type="line-simple" size="md" label="Loading..." />
      </div>
    );
}