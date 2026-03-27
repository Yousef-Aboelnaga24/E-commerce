import { Offline } from "react-detect-offline";
import offlineImg from "../assets/No connection-bro.svg";

export default function OfflineAlert() {
    return (
        <Offline>
            <div className="flex items-center justify-center gap-4 bg-red-100 text-red-700 px-4 py-3 shadow-md">

                <img
                    src={offlineImg}
                    alt="Offline"
                    className="h-20 md:h-24"
                />

                <span className="text-sm md:text-base font-medium">
                    ⚠️ You are currently offline. Some features may not work.
                </span>

            </div>
        </Offline>
    );
}