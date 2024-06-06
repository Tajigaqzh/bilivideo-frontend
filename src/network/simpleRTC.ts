import {Ref} from "vue";

export class SimpleWebRTCClass {
    peerConnection?: RTCPeerConnection;

    roomId = '-1';

    /** 最大码率 */
    maxBitrate = -1;

    /** 最大帧率 */
    maxFramerate = -1;
    /** 分辨率 */
    resolutionRatio = -1;

    /**本地流*/
    localStream?: MediaStream | null;

    /**丢包*/
    loss = "-1";

    /**延迟*/
    rtt = "-1";

    /**定时器*/
    loopGetStatsTimer: any = null;

    constructor(data: {
        roomId: string;
        maxBitrate?: number;
        maxFramerate?: number;
        resolutionRatio?: number;
        loss: Ref<string>,
        rtt: Ref<string>
    }) {
        this.roomId = data.roomId;

        if (data.maxBitrate) {
            this.maxBitrate = data.maxBitrate;
        }
        if (data.resolutionRatio) {
            this.resolutionRatio = data.resolutionRatio;
        }
        if (data.maxFramerate) {
            this.maxFramerate = data.maxFramerate;
        }
        this.createPeerConnection();
        this.loopGetStats(data.loss, data.rtt);
    }


    /**
     * 循环获取rtc连接丢包信息
     */

    loopGetStats = (lossRef?: Ref<string>,
                    rttRef?: Ref<string>) => {
        this.loopGetStatsTimer = setInterval(async () => {
            //没有连接，直接返回
            if (!this.peerConnection) return;
            try {
                const res = await this.peerConnection.getStats();
                // 总丢包率（音频丢包和视频丢包）
                let loss = 0;
                let rtt = 0;

                res.forEach((report: RTCInboundRtpStreamStats) => {
                    // @ts-ignore
                    const currentRoundTripTime = report?.currentRoundTripTime;
                    const packetsLost = report?.packetsLost;
                    const packetsReceived = report.packetsReceived;
                    if (currentRoundTripTime !== undefined) {
                        rtt = currentRoundTripTime * 1000;
                    }

                    //音频丢包
                    if (report.type === 'inbound-rtp' && report.kind === 'audio') {
                        if (packetsReceived !== undefined && packetsLost !== undefined) {
                            if (packetsLost === 0 || packetsReceived === 0) {
                                loss += 0;
                            } else {
                                loss += packetsLost / packetsReceived;
                            }
                        }
                    }

                    //视频丢包
                    if (report.type === 'inbound-rtp' && report.kind === 'video') {
                        if (packetsReceived !== undefined && packetsLost !== undefined) {
                            if (packetsLost === 0 || packetsReceived === 0) {
                                loss += 0;
                            } else {
                                loss += packetsLost / packetsReceived;
                            }
                        }
                    }
                })
                this.loss = loss.toString();
                this.rtt = rtt.toString();

                if (lossRef) {
                    lossRef.value = loss.toString();
                }
                if (rttRef) {
                    rttRef.value = rtt.toString();
                }

            } catch (error) {
                console.error('getStats错误');
                console.log(error);
            }
        }, 1000)

    }


    /** 创建对等连接 */
    createPeerConnection = () => {
        if (!window.RTCPeerConnection) {
            console.error('当前环境不支持RTCPeerConnection！');
            alert('当前环境不支持RTCPeerConnection！');
            return;
        }

        if (!this.peerConnection) {
            //如果不是srs，设置turn
            const iceServers = [
                {
                    urls: "turn:nwyzx.com:3478",
                    username: "root",
                    credential: "root",
                },
            ];
            //创建连接
            this.peerConnection = new RTCPeerConnection({
                iceServers,
            });


            this.handleStreamEvent();
            this.handleConnectionEvent();
        }
    }

    /**
     * 连接事件
     */
    handleConnectionEvent = () => {
        if (this.peerConnection) {
            this.peerConnection!.onconnectionstatechange = () => {
                if (this.peerConnection?.iceConnectionState === "connected") {
                    console.log("ICE连接成功");
                } else {

                }
            }
        }
    }
    /**
     * 监听视频流的事件
     */
    handleStreamEvent = () => {
        if (!this.peerConnection) return;

        this.peerConnection.addEventListener('track', (event) => {
            console.log('track事件的stream', event.streams[0]);
            console.log('track事件的视频轨', event.streams[0].getVideoTracks());
            console.log('track事件的音频轨', event.streams[0].getAudioTracks());
            //拿到第一个流
            const stream = event.streams[0];

            stream.onremovetrack = () => {
            };

        })
    }

    /**
     * 添加轨道
     * @param tracks
     */
    addTracks(tracks: MediaStreamTrack[]) {
        tracks.forEach(track => {
            this.peerConnection?.addTrack(track);
        })
    }

    /**
     * 创建offer
     */
    createOffer = async () => {
        if (!this.peerConnection) return;
        console.log("创建offer")
        try {
            return await this.peerConnection.createOffer();
        } catch (error) {
            console.error(error);
        }
    }

    /** 设置本地描述 */
    setLocalDescription = async (sdp: RTCLocalSessionDescriptionInit) => {
        if (!this.peerConnection) return;
        try {
            await this.peerConnection.setLocalDescription(sdp);
        } catch (error) {
            console.error(error);
        }
    };


    /** 创建answer */
    createAnswer = async () => {
        if (!this.peerConnection) return;
        try {
            return await this.peerConnection.createAnswer();
        } catch (error) {
            console.error(error);
        }
    };

    /** 设置远端描述 */
    setRemoteDescription = async (sdp: string) => {
        if (!this.peerConnection) return;
        try {
            await this.peerConnection?.setRemoteDescription(
                new RTCSessionDescription({type: "answer", sdp})
            );
        } catch (error) {
            console.error(error);
        }
    };


    /** 处理candidate */
    addIceCandidate = async (candidate: RTCIceCandidateInit) => {
        try {
            await this.peerConnection?.addIceCandidate(candidate);
        } catch (error) {
            console.error(error);
        }
    };


    /** 设置最大码率
     * @see https://juejin.cn/post/7349002190294892554
     * */
    setMaxBitrate = (maxBitrate: number) => {
        console.log('开始设置最大码率', maxBitrate);
        return new Promise<number>((resolve) => {
            this.peerConnection?.getSenders().forEach((sender) => {
                //拿到视频的sender
                if (sender.track?.kind === 'video') {
                    const parameters = {...sender.getParameters()};
                    if (parameters.encodings[0]) {
                        const val = 1000 * maxBitrate;
                        if (parameters.encodings[0].maxBitrate === val) {
                            console.log('最大码率不变，不设置');
                            resolve(1);
                            return;
                        }
                        parameters.encodings[0].maxBitrate = val;
                        sender
                            .setParameters(parameters)
                            .then(() => {
                                console.log('设置最大码率成功', maxBitrate);
                                this.maxBitrate = val;
                                resolve(1);
                            })
                            .catch((error) => {
                                console.error('设置最大码率失败', maxBitrate, error);
                                resolve(0);
                            });
                    }
                }
            })
        })
    }


}