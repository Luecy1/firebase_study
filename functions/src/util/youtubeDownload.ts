import querystring from "querystring";
import {get} from "./http";
import {Activity, Search} from "../model/activity";
import {LiveStreamingDetail} from "../model/liveStream";
import * as functions from 'firebase-functions';

const api = functions.config().youtube.apikey;

export async function getActivities(channelId: string): Promise<Activity[]> {

    const activity_url = "https://www.googleapis.com/youtube/v3/activities";

    const query = {
        key: api,
        channelId: channelId,
        part: "id,snippet,contentDetails",
        maxResults: 25
    }

    const url = activity_url + "?" + querystring.encode(query);

    const data = await get(url);

    let resData = JSON.parse(data)

    const activities: Activity[] = [];

    for (let itemKey in resData.items) {

        if (!resData.items.hasOwnProperty(itemKey)) {
            continue;
        }

        const item = resData.items[itemKey];
        const snippet = item.snippet;

        try {
            const activity = new Activity(
                item.etag,
                item.id,
                snippet.title,
                snippet.publishedAt,
                snippet.channelId,
                snippet.description,
                snippet.thumbnails.default.url,
                snippet.thumbnails.medium.url,
                snippet.thumbnails.high.url,
                snippet.thumbnails.standard.url,
                snippet.thumbnails.maxres.url,
                item.contentDetails.upload.videoId
            );

            activities.push(activity);
        } catch (e) {
            console.warn("item read error", item);
            console.warn(e);
        }
    }

    return activities;
}

export async function getSearchList(channelId: string): Promise<Search[]> {

    const searchUrl = "https://www.googleapis.com/youtube/v3/search";

    const query = {
        key: api,
        channelId: channelId,
        part: "id,snippet",
        order: "date",
        maxResults: 20,
        type: "video",
    }

    const url = searchUrl + "?" + querystring.encode(query);

    const data = await get(url);

    const resData = JSON.parse(data)

    const searches: Search[] = [];

    for (let itemKey in resData.items) {

        if (!resData.items.hasOwnProperty(itemKey)) {
            continue;
        }

        const item = resData.items[itemKey];

        try {
            const search = new Search(
                item.id.videoId,
                item.snippet.publishedAt,
                item.snippet.channelId,
                item.snippet.title,
                item.snippet.description,
                item.snippet.thumbnails.default.url,
                item.snippet.thumbnails.medium.url,
                item.snippet.thumbnails.high.url,
                item.snippet.liveBroadcastContent,
                item.snippet.publishTime
            );

            searches.push(search);
        } catch (e) {
            console.warn("item read error", item);
            console.warn(e);
        }

    }
    return searches;
}

export async function getVideosList(videoIds: string[]): Promise<LiveStreamingDetail[]> {

    const searchUrl = "https://www.googleapis.com/youtube/v3/videos";

    const query = {
        key: api,
        part: "id,snippet,liveStreamingDetails",
        id: videoIds.join(",")
    }

    const url = searchUrl + "?" + querystring.encode(query);

    const data = await get(url);

    const resData = JSON.parse(data)

    const liveStreamingDetails: LiveStreamingDetail[] = [];

    for (let itemKey in resData.items) {

        if (!resData.items.hasOwnProperty(itemKey)) {
            continue;
        }

        const item = resData.items[itemKey];

        try {

            if (item.hasOwnProperty("liveStreamingDetails")) {

                const liveItem = new LiveStreamingDetail(
                    item.id,
                    item.liveStreamingDetails.actualStartTime ?? "",
                    item.liveStreamingDetails.actualEndTime ?? "",
                    item.liveStreamingDetails.scheduledStartTime,
                );
                liveStreamingDetails.push(liveItem);
            }

        } catch (e) {
            console.warn(item);
            console.warn(e);
        }
    }

    return liveStreamingDetails;
}