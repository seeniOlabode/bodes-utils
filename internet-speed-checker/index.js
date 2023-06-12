const defaultConfig = {
    imgLink: "https://firebasestorage.googleapis.com/v0/b/bode-project-a4bc4.appspot.com/o/speed-checker-img-500kb.png?alt=media&token=1a8ae12b-25aa-452b-93bd-e958955f3fa3&_gl=1*lo7hyi*_ga*MTk5MjE1ODQ4Ny4xNjgxNjc2NzE1*_ga_CW55HF8NVT*MTY4NjU1NzEzNi4xNC4xLjE2ODY1NTc0MjQuMC4wLjA.",
    imgSize: 678146,
}

class SpeedChecker {
    constructor(onComplete, config) {
        this.checkerInterval = null;
        this.img = new Image;
        this.imgLink = config?.imgLink || defaultConfig.imgLink;
        this.imgSize = config?.imgSize || defaultConfig.imgSize;
        this.startTime = null;
        this.endTime = null;
        this.lastSpeed = null;
        this.onComplete = onComplete;
        this.modern = navigator.connection;
    }

    auto() {
        if (this.modern) return this.modern;
        this.legacy();
    }

    legacy() {
        this.img.onload = () => {
            this.endTime = (new Date).getTime();
            this.storeResults();
            this.logResults();
            this.onComplete();
        }
        this.startTime = (new Date()).getTime();
        // A Cache Buster to make sure the image always downloads;
        let cachebuster = "?nnn=" + this.startTime;
        window.onload = () => {
            this.img.src = this.imgLink + cachebuster;
        }
    }

    storeResults() {
        let duration = (this.endTime - this.startTime) / 1000;
        let bitsLoaded = this.imgSize * 8;
        let speedBps = (bitsLoaded / duration).toFixed(2);
        let speedKbps = (speedBps / 1024).toFixed(2);
        var speedMbps = (speedKbps / 1024).toFixed(2);
        this.lastSpeed = { speedBps, speedKbps, speedMbps };
    }

    logResults() {
        const speedObjValues = Object.values(this.lastSpeed);
        const speedObjKeys = Object.keys(this.lastSpeed);
        let value;
        let unit;
        let index = speedObjValues.length - 1;
        for (let i = index; i > 0; i--) {
            if ((speedObjValues[i] >= 1)) {
                value = speedObjValues[i];
                unit = speedObjKeys[i];
                break;
            }
        }
        console.log(`Your connnection speed is: `, value + unit.replace('speed',''));
    }

    useInterval(intervalTime) {
        setInterval(this.calculateSpeed.bind(this), intervalTime);
    }
}

const speedCheckerCallback = () => {
    console.log('its done')
}

const speedChecker = new SpeedChecker(speedCheckerCallback)

speedChecker.legacy();