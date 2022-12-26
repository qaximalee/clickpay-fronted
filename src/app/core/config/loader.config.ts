import { NgxUiLoaderConfig } from "ngx-ui-loader";
export class NgxLoaderCongif {
    //  https://tdev.app/ngx-ui-loader/demo/ (reference)
    public static masterLoaderConfig: NgxUiLoaderConfig = {
        bgsColor: "#00ACC1",
        bgsOpacity: 0.5,
        bgsPosition: "bottom-right",
        bgsSize: 60,
        bgsType: "ball-spin-clockwise",
        blur: 4,
        delay: 0,
        fastFadeOut: false,
        fgsColor: "red",
        fgsPosition: "center-center",
        fgsSize: 50,
        fgsType: "rectangle-bounce",
        gap: 10,
        hasProgressBar: true,
        logoPosition: "center-center",
        logoSize: 90,
        logoUrl: "",
        masterLoaderId: "master",
        maxTime: -1,
        minTime: 300,
        overlayBorderRadius: "0",
        overlayColor: "rgba(40, 40, 40, 0.8)",
        pbColor: "red",
        pbDirection: "ltr",
        pbThickness: 3,
        text: "Loading...",
        textColor: "#FFFFFF",
        textPosition: "center-center",

    }

    public static showForeground() {
        return { showForeground: true }
    }
}