"use client"

export default function Error(error: Error) {
    return <p>Could not fetch the list of notes. {error.message}</p>
}