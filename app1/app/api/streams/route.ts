import { prismaClient } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
//@ts-ignore 
import youtubesearchapi from "youtube-search-api";
const YT_REGEX = /^(?:(?:https?:)?\/\/)?(?:www\.)?(?:m\.)?(?:youtu(?:be)?\.com\/(?:v\/|embed\/|watch(?:\/|\?v=))|youtu\.be\/)((?:\w|-){11})(?:\S+)?$/;

const createStreamSchema = z.object({
    createrId: z.string(),
    url: z.string()
})

export async function POST(req: NextRequest) {

    try {

        const parseResult = createStreamSchema.safeParse(await req.json());
        if (!parseResult.success) {
            return NextResponse.json(
                { message: "Invalid input" },
                { status: 400 }
            );
        }
        const data = parseResult.data;
        const isYt = data.url.match(YT_REGEX)
        if (!isYt) {
            return NextResponse.json({
                message: 'Wrong Url Format'
            }, {
                status: 411
            })

        }
        const extractedId = data.url.split("?v=")[1];
        const response = await youtubesearchapi.GetVideoDetails(extractedId);
        console.log(response.title)
        console.log(response.thumbnail.thumbnails)
        const thumbnails = response.thumbnail.thumbnails
        thumbnails.sort((a: { width: number }, b: { width: number }) => a.width < b.width ? -1 : 1)

        const stream = await prismaClient.stream.create({
            data: {


                userId: data.createrId,
                url: data.url,
                extractedId,
                type: "Youtube",
                title: response.title ?? "Cant find video",
                smallImg: (thumbnails.length > 1 ? thumbnails[thumbnails.length - 2].url : thumbnails[thumbnails.length - 1].url) ?? "https://cdn.pixabay.com/photo/2024/02/28/07/42/european-shorthair-8601492_640.jpg",
                bigImg: thumbnails[thumbnails.length - 1].url ?? "https://cdn.pixabay.com/photo/2024/02/28/07/42/european-shorthair-8601492_640.jpg"
            },

        });

        return NextResponse.json({
            message: "Added stream",
            id: stream.id
        })
    } catch (e) {
        return NextResponse.json({
            message: 'error while adding a stream'
        }, {
            status: 411
        })
    }

}

export async function GET(req: NextRequest) {
    const createrId = req.nextUrl.searchParams.get("createrId");
    const streams = await prismaClient.stream.findMany({
        where: {
            userId: createrId ?? ""
        }
    })

    return NextResponse.json({
        streams
    })
}