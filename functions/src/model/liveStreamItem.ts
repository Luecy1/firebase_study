export class LiveStreamItem {
    videoId: string
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnailDefault: string;
    thumbnailMedium: string;
    thumbnailHigh: string;
    liveBroadcastContent: string;
    publishTime: string;
    actualStartTime: string;
    actualEndTime: string;
    scheduledStartTime: string;

    constructor(videoId: string, publishedAt: string, channelId: string, title: string, description: string, thumbnailDefault: string, thumbnailMedium: string, thumbnailHigh: string, liveBroadcastContent: string, publishTime: string, actualStartTime: string, actualEndTime: string, scheduledStartTime: string) {
        this.videoId = videoId;
        this.publishedAt = publishedAt;
        this.channelId = channelId;
        this.title = title;
        this.description = description;
        this.thumbnailDefault = thumbnailDefault;
        this.thumbnailMedium = thumbnailMedium;
        this.thumbnailHigh = thumbnailHigh;
        this.liveBroadcastContent = liveBroadcastContent;
        this.publishTime = publishTime;
        this.actualStartTime = actualStartTime;
        this.actualEndTime = actualEndTime;
        this.scheduledStartTime = scheduledStartTime;
    }
}