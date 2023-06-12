class SpeedChecker {
    constructor(onComplete, config) {
        this.checkerInterval = null;
        this.img = new Image;
        this.imgLink = config.imgLink;
        this.imgSize = config.imgSize;
        this.startTime = null;
        this.endTime = null;
        this.lastSpeed = null;
        this.onComplete = onComplete
    }

    calculateSpeed() {
        this.img.onload = () => {
            this.endTime = (new Date).getTime();
            this.logResults();
            this.onComplete();
        }
        this.startTime = (new Date()).getTime();
        // A Cache Buster to make sure the image always downloads;
        let cachebuster = "?nnn=" + this.startTime;
        this.img.src = this.imgLink + cachebuster;
    }

    logResults() {
        let duration = (this.endTime - this.startTime) / 1000;
        let bitsLoaded = this.imgSize * 8;
        let speedBps = (bitsLoaded / duration).toFixed(2);
        let speedKbps = (speedBps / 1024).toFixed(2);
        var speedMbps = (speedKbps / 1024).toFixed(2);
        this.lastSpeed = { speedBps, speedKbps, speedMbps };
        console.log(`Your connnection speed is: `, speedMbps + 'Mbps');
    }

    useInterval(intervalTime) {
        setInterval(this.calculateSpeed.bind(this), intervalTime);
    }
}

const speedCheckerCallback = () => {
    console.log('its done')
}

const speedChecker = new SpeedChecker(speedCheckerCallback,
    {
    imgLink: "https://firebasestorage.googleapis.com/v0/b/bode-project-a4bc4.appspot.com/o/speed-checker-img.jpg?alt=media&token=3300d4bf-e588-45ab-b742-c01f757c2848&_gl=1*193dvjl*_ga*MTk5MjE1ODQ4Ny4xNjgxNjc2NzE1*_ga_CW55HF8NVT*MTY4NjUxNDk0MC4xMS4xLjE2ODY1MTUxNDQuMC4wLjA.",
    imgSize: 4771961
})