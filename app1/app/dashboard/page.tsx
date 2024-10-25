'use client'
'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ThumbsUp, ThumbsDown, Play, Pause, SkipForward, Share2, RefreshCcw } from "lucide-react"
// import { toast } from "@/components/ui/use-toast"
import { useToast } from "@/components/ui/use-toast"
import axios from 'axios'



const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
    const match = url.match(regExp)
    return (match && match[2].length === 11) ? match[2] : null
}

type Video = {
    id: string
    title: string
    votes: number
}

const REFRESH_INTERVAL_MS = 10 * 1000

export default function Component() {
    const { toast } = useToast()
    const [inputUrl, setInputUrl] = useState('')
    const [queue, setQueue] = useState<Video[]>([
        { id: 'dQw4w9WgXcQ', title: 'Rick Astley - Never Gonna Give You Up', votes: 5 },
        { id: 'L_jWHffIx5E', title: 'Smash Mouth - All Star', votes: 3 },
        { id: 'fJ9rUzIMcZQ', title: 'Queen - Bohemian Rhapsody', votes: 4 },
    ])
    const [currentVideo, setCurrentVideo] = useState<Video | null>(null)
    const [isPlaying, setIsPlaying] = useState(false)

    async function refereshStream() {
        const res = await axios.get(`/api/streams/my`, {
            withCredentials: true
        });
        console.log(res)
    }

    useEffect(() => {
        refereshStream();
        const interval = setInterval(() => {

        }, REFRESH_INTERVAL_MS);
    }, [])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const videoId = getYouTubeId(inputUrl)
        if (videoId) {
            setQueue([...queue, { id: videoId, title: 'New Video', votes: 0 }])
            setInputUrl('')
        }
    }

    const handleVote = (index: number, increment: number) => {
        const newQueue = [...queue]
        newQueue[index].votes += increment
        newQueue.sort((a, b) => b.votes - a.votes)
        setQueue(newQueue)
    }

    const playNext = () => {
        if (queue.length > 0) {
            setCurrentVideo(queue[0])
            setQueue(queue.slice(1))
            setIsPlaying(true)
        }
    }

    const togglePlayPause = () => {
        setIsPlaying(!isPlaying)
    }

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
            toast({
                title: "Link Copied!",
                description: "The page URL has been copied to your clipboard.",
            })
        }).catch(err => {
            console.error('Failed to copy: ', err)
            toast({
                title: "Failed to copy",
                description: "Please try again or copy the URL manually.",
                variant: "destructive",
            })
        })
    }

    useEffect(() => {
        if (currentVideo === null && queue.length > 0) {
            playNext()
        }
    }, [currentVideo, queue])

    return (
        <div className="container mx-auto p-4 max-w-4xl">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Song Voting Queue</h1>
                <Button onClick={handleShare} variant="outline">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                </Button>
            </div>

            <form onSubmit={handleSubmit} className="mb-8">
                <div className="flex gap-2">
                    <Input
                        type="text"
                        value={inputUrl}
                        onChange={(e) => setInputUrl(e.target.value)}
                        placeholder="Enter YouTube URL"
                        className="flex-grow"
                    />
                    <Button type="submit">Add to Queue</Button>
                </div>
                {inputUrl && getYouTubeId(inputUrl) && (
                    <div className="mt-4">
                        <iframe
                            width="560"
                            height="315"
                            src={`https://www.youtube.com/embed/${getYouTubeId(inputUrl)}`}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full aspect-video rounded-lg"
                        ></iframe>
                    </div>
                )}
            </form>

            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Now Playing</h2>
                {currentVideo ? (
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex flex-col md:flex-row items-center gap-4">
                                <div className="w-full md:w-1/2 aspect-video">
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        src={`https://www.youtube.com/embed/${currentVideo.id}?autoplay=1`}
                                        title="YouTube video player"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="rounded-lg"
                                    ></iframe>
                                </div>
                                <div className="flex flex-col items-center md:items-start gap-4 w-full md:w-1/2">
                                    <h3 className="text-lg font-semibold">{currentVideo.title}</h3>
                                    <div className="flex items-center gap-2">
                                        <Button size="icon" variant="outline" onClick={togglePlayPause}>
                                            {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                                        </Button>
                                        <Button size="icon" variant="outline" onClick={playNext}>
                                            <SkipForward className="h-6 w-6" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <p className="text-center text-muted-foreground">No song playing</p>
                )}
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-2">Up Next</h2>
                {queue.map((video, index) => (
                    <Card key={video.id} className="mb-2">
                        <CardContent className="flex items-center justify-between p-4">
                            <div className="flex items-center gap-2">
                                <img
                                    src={`https://img.youtube.com/vi/${video.id}/default.jpg`}
                                    alt={video.title}
                                    className="w-20 h-15 object-cover rounded"
                                />
                                <span className="font-medium">{video.title}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    size="icon"
                                    variant="outline"
                                    onClick={() => handleVote(index, 1)}
                                >
                                    <ThumbsUp className="h-4 w-4" />
                                </Button>
                                <span className="font-bold">{video.votes}</span>
                                <Button
                                    size="icon"
                                    variant="outline"
                                    onClick={() => handleVote(index, -1)}
                                >
                                    <ThumbsDown className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Button onClick={playNext} className="mt-4" disabled={queue.length === 0}>
                <Play className="mr-2 h-4 w-4" /> Play Next
            </Button>
        </div>
    )
}