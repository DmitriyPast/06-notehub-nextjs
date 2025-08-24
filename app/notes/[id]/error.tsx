"use client"

export default function Error(error: Error) {
    return <p>Could not fetch note details. {error.message}</p>
}